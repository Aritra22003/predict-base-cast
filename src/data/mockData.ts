// Mock data for the prediction markets demo

export interface Market {
  id: string;
  title: string;
  description: string;
  endTime: string;
  totalStaked: string;
  yesPercentage: number;
  noPercentage: number;
  participants: number;
  status: "active" | "ended" | "resolving";
  userPosition: "yes" | "no" | null;
}

export const mockMarkets: Market[] = [
  {
    id: "1",
    title: "Will ETH reach $3500 by September 1st, 2024?",
    description: "Ethereum's price prediction based on current market trends and upcoming developments.",
    endTime: "Sep 1",
    totalStaked: "12.5 ETH",
    yesPercentage: 67,
    noPercentage: 33,
    participants: 234,
    status: "active",
    userPosition: "yes",
  },
  {
    id: "2", 
    title: "Will Base TVL exceed $5B by end of 2024?",
    description: "Total Value Locked prediction for Base ecosystem growth.",
    endTime: "Dec 31",
    totalStaked: "8.3 ETH",
    yesPercentage: 78,
    noPercentage: 22,
    participants: 156,
    status: "active",
    userPosition: null,
  },
  {
    id: "3",
    title: "Will BTC hit new ATH in Q4 2024?",
    description: "Bitcoin all-time high prediction for the final quarter of 2024.",
    endTime: "Dec 31", 
    totalStaked: "25.7 ETH",
    yesPercentage: 45,
    noPercentage: 55,
    participants: 891,
    status: "active",
    userPosition: "no",
  },
  {
    id: "4",
    title: "Will Coinbase stock close above $300 in August?",
    description: "Traditional market prediction for Coinbase stock performance.",
    endTime: "Ended",
    totalStaked: "6.1 ETH",
    yesPercentage: 34,
    noPercentage: 66,
    participants: 123,
    status: "ended",
    userPosition: "no",
  },
  {
    id: "5",
    title: "Will Farcaster reach 1M users by November?",
    description: "Social protocol growth prediction for active user milestones.",
    endTime: "Nov 30",
    totalStaked: "4.2 ETH", 
    yesPercentage: 82,
    noPercentage: 18,
    participants: 67,
    status: "active",
    userPosition: null,
  },
];

export const mockLeaderboard = [
  {
    rank: 1,
    fid: "12345",
    username: "CryptoProphet",
    totalEarnings: "23.4 ETH",
    winRate: 78,
    totalPredictions: 89,
    streak: 12,
    isCurrentUser: false,
  },
  {
    rank: 2,
    fid: "67890", 
    username: "DeFiWizard",
    totalEarnings: "19.8 ETH",
    winRate: 72,
    totalPredictions: 156,
    streak: 8,
    isCurrentUser: false,
  },
  {
    rank: 3,
    fid: "54321",
    username: "BaseBuilder",
    totalEarnings: "15.2 ETH",
    winRate: 69,
    totalPredictions: 234,
    streak: 5,
    isCurrentUser: false,
  },
  {
    rank: 4,
    fid: "11111",
    username: "You",
    totalEarnings: "3.7 ETH",
    winRate: 65,
    totalPredictions: 34,
    streak: 3,
    isCurrentUser: true,
  },
  {
    rank: 5,
    fid: "98765",
    username: "PredictionKing",
    totalEarnings: "12.1 ETH", 
    winRate: 71,
    totalPredictions: 198,
    streak: 0,
    isCurrentUser: false,
  },
  {
    rank: 6,
    fid: "13579",
    username: "ChainAnalyst",
    totalEarnings: "9.4 ETH",
    winRate: 63,
    totalPredictions: 156,
    streak: 2,
    isCurrentUser: false,
  },
  {
    rank: 7,
    fid: "24680", 
    username: "MarketMover",
    totalEarnings: "7.8 ETH",
    winRate: 59,
    totalPredictions: 87,
    streak: 1,
    isCurrentUser: false,
  },
  {
    rank: 8,
    fid: "11223",
    username: "OnchainOracle",
    totalEarnings: "6.2 ETH",
    winRate: 67,
    totalPredictions: 73,
    streak: 4,
    isCurrentUser: false,
  },
];

export const mockUserProfile = {
  fid: "11111",
  username: "You",
  joinedDate: "March 2024",
  totalEarnings: "3.7 ETH",
  totalStaked: "5.2 ETH",
  winRate: 65,
  totalPredictions: 34,
  correctPredictions: 22,
  currentStreak: 3,
  longestStreak: 7,
  favoriteCategory: "DeFi",
  achievements: [
    { name: "First Prediction", description: "Made your first prediction", unlocked: true },
    { name: "Lucky Streak", description: "5 correct predictions in a row", unlocked: true },
    { name: "High Roller", description: "Staked over 1 ETH in a single market", unlocked: false },
    { name: "Market Maker", description: "Created your first prediction market", unlocked: false },
    { name: "Crystal Ball", description: "10 correct predictions in a row", unlocked: false },
  ],
};