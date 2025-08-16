// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/security/ReentrancyGuard.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract PredictionMarket is ReentrancyGuard, Ownable {
    uint256 private marketCounter;
    uint256 public constant MIN_STAKE = 0.001 ether;
    uint256 public constant PLATFORM_FEE = 250; // 2.5%
    uint256 public constant FEE_DENOMINATOR = 10000;
    
    enum MarketStatus { Active, Resolved, Cancelled }
    enum Outcome { Pending, Yes, No }
    
    struct Market {
        uint256 id;
        string question;
        string description;
        address creator;
        uint256 endTime;
        uint256 resolutionTime;
        MarketStatus status;
        Outcome outcome;
        uint256 totalYesStake;
        uint256 totalNoStake;
        uint256 participantCount;
        bool feesWithdrawn;
    }
    
    struct Prediction {
        uint256 marketId;
        address user;
        Outcome prediction;
        uint256 amount;
        bool claimed;
    }
    
    mapping(uint256 => Market) public markets;
    mapping(uint256 => mapping(address => Prediction)) public userPredictions;
    mapping(uint256 => address[]) public marketParticipants;
    mapping(address => uint256[]) public userMarkets;
    
    event MarketCreated(
        uint256 indexed marketId,
        address indexed creator,
        string question,
        uint256 endTime
    );
    
    event PredictionMade(
        uint256 indexed marketId,
        address indexed user,
        Outcome prediction,
        uint256 amount
    );
    
    event MarketResolved(
        uint256 indexed marketId,
        Outcome outcome,
        uint256 totalPool
    );
    
    event RewardsClaimed(
        uint256 indexed marketId,
        address indexed user,
        uint256 amount
    );
    
    constructor() {}
    
    function createMarket(
        string memory _question,
        string memory _description,
        uint256 _duration
    ) external returns (uint256) {
        require(bytes(_question).length > 0, "Question cannot be empty");
        require(_duration >= 1 hours && _duration <= 30 days, "Invalid duration");
        
        uint256 marketId = ++marketCounter;
        uint256 endTime = block.timestamp + _duration;
        
        markets[marketId] = Market({
            id: marketId,
            question: _question,
            description: _description,
            creator: msg.sender,
            endTime: endTime,
            resolutionTime: endTime + 1 hours, // 1 hour to resolve after end
            status: MarketStatus.Active,
            outcome: Outcome.Pending,
            totalYesStake: 0,
            totalNoStake: 0,
            participantCount: 0,
            feesWithdrawn: false
        });
        
        emit MarketCreated(marketId, msg.sender, _question, endTime);
        return marketId;
    }
    
    function makePrediction(uint256 _marketId, Outcome _prediction) 
        external 
        payable 
        nonReentrant 
    {
        require(_prediction == Outcome.Yes || _prediction == Outcome.No, "Invalid prediction");
        require(msg.value >= MIN_STAKE, "Stake too low");
        
        Market storage market = markets[_marketId];
        require(market.id != 0, "Market does not exist");
        require(market.status == MarketStatus.Active, "Market not active");
        require(block.timestamp < market.endTime, "Market ended");
        
        Prediction storage existingPrediction = userPredictions[_marketId][msg.sender];
        require(existingPrediction.amount == 0, "Already predicted");
        
        userPredictions[_marketId][msg.sender] = Prediction({
            marketId: _marketId,
            user: msg.sender,
            prediction: _prediction,
            amount: msg.value,
            claimed: false
        });
        
        if (_prediction == Outcome.Yes) {
            market.totalYesStake += msg.value;
        } else {
            market.totalNoStake += msg.value;
        }
        
        marketParticipants[_marketId].push(msg.sender);
        userMarkets[msg.sender].push(_marketId);
        market.participantCount++;
        
        emit PredictionMade(_marketId, msg.sender, _prediction, msg.value);
    }
    
    function resolveMarket(uint256 _marketId, Outcome _outcome) 
        external 
        onlyOwner 
    {
        require(_outcome == Outcome.Yes || _outcome == Outcome.No, "Invalid outcome");
        
        Market storage market = markets[_marketId];
        require(market.id != 0, "Market does not exist");
        require(market.status == MarketStatus.Active, "Market not active");
        require(block.timestamp >= market.endTime, "Market still active");
        
        market.status = MarketStatus.Resolved;
        market.outcome = _outcome;
        
        uint256 totalPool = market.totalYesStake + market.totalNoStake;
        emit MarketResolved(_marketId, _outcome, totalPool);
    }
    
    function claimRewards(uint256 _marketId) external nonReentrant {
        Market storage market = markets[_marketId];
        require(market.status == MarketStatus.Resolved, "Market not resolved");
        
        Prediction storage prediction = userPredictions[_marketId][msg.sender];
        require(prediction.amount > 0, "No prediction found");
        require(!prediction.claimed, "Already claimed");
        require(prediction.prediction == market.outcome, "Incorrect prediction");
        
        prediction.claimed = true;
        
        uint256 totalPool = market.totalYesStake + market.totalNoStake;
        uint256 winningPool = market.outcome == Outcome.Yes ? 
            market.totalYesStake : market.totalNoStake;
        
        // Calculate platform fee
        uint256 platformFee = (totalPool * PLATFORM_FEE) / FEE_DENOMINATOR;
        uint256 netPool = totalPool - platformFee;
        
        // Calculate user reward proportional to their stake
        uint256 userReward = (prediction.amount * netPool) / winningPool;
        
        require(userReward > 0, "No rewards to claim");
        
        (bool success, ) = payable(msg.sender).call{value: userReward}("");
        require(success, "Transfer failed");
        
        emit RewardsClaimed(_marketId, msg.sender, userReward);
    }
    
    function withdrawPlatformFees(uint256 _marketId) external onlyOwner {
        Market storage market = markets[_marketId];
        require(market.status == MarketStatus.Resolved, "Market not resolved");
        require(!market.feesWithdrawn, "Fees already withdrawn");
        
        market.feesWithdrawn = true;
        
        uint256 totalPool = market.totalYesStake + market.totalNoStake;
        uint256 platformFee = (totalPool * PLATFORM_FEE) / FEE_DENOMINATOR;
        
        (bool success, ) = payable(owner()).call{value: platformFee}("");
        require(success, "Transfer failed");
    }
    
    function getMarket(uint256 _marketId) external view returns (Market memory) {
        return markets[_marketId];
    }
    
    function getUserPrediction(uint256 _marketId, address _user) 
        external 
        view 
        returns (Prediction memory) 
    {
        return userPredictions[_marketId][_user];
    }
    
    function getMarketParticipants(uint256 _marketId) 
        external 
        view 
        returns (address[] memory) 
    {
        return marketParticipants[_marketId];
    }
    
    function getUserMarkets(address _user) 
        external 
        view 
        returns (uint256[] memory) 
    {
        return userMarkets[_user];
    }
    
    function getActiveMarkets() external view returns (uint256[] memory) {
        uint256[] memory activeMarkets = new uint256[](marketCounter);
        uint256 count = 0;
        
        for (uint256 i = 1; i <= marketCounter; i++) {
            if (markets[i].status == MarketStatus.Active && 
                block.timestamp < markets[i].endTime) {
                activeMarkets[count] = i;
                count++;
            }
        }
        
        // Resize array to actual count
        uint256[] memory result = new uint256[](count);
        for (uint256 i = 0; i < count; i++) {
            result[i] = activeMarkets[i];
        }
        
        return result;
    }
    
    receive() external payable {
        revert("Direct payments not accepted");
    }
}