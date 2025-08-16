# 🚀 Smart Contract Deployment Guide

## Prerequisites

1. **Node.js & npm** installed
2. **Private key** of wallet with Base ETH
3. **Basescan API key** (for verification)

## Setup

1. **Create a new directory for contracts:**
```bash
mkdir predict-earn-contracts && cd predict-earn-contracts
npm init -y
```

2. **Install dependencies:**
```bash
npm install --save-dev hardhat @nomicfoundation/hardhat-toolbox
npm install @openzeppelin/contracts dotenv
```

3. **Copy contract files:**
- Copy `contracts/PredictionMarket.sol`
- Copy `contracts/deploy.js` 
- Copy `contracts/hardhat.config.js`

4. **Create `.env` file:**
```env
PRIVATE_KEY=your_private_key_here
BASESCAN_API_KEY=your_basescan_api_key
```

## Deployment Steps

### 1. Base Sepolia (Testnet)
```bash
npx hardhat run contracts/deploy.js --network base-sepolia
```

### 2. Base Mainnet (Production)
```bash
npx hardhat run contracts/deploy.js --network base
```

## Post-Deployment

1. **Copy the contract address** from deployment output
2. **Update the frontend** by replacing addresses in `src/lib/web3.ts`:
```typescript
export const PREDICTION_MARKET_ADDRESS = {
  mainnet: "0xYOUR_MAINNET_ADDRESS", 
  testnet: "0xYOUR_TESTNET_ADDRESS",
}
```

3. **Verify contract** on Basescan (automatic in deploy script)

## Security Notes

- ✅ **ReentrancyGuard** protects against reentrancy attacks
- ✅ **Access control** for admin functions (market resolution)
- ✅ **Input validation** for all parameters
- ✅ **Minimum stake** prevents spam
- ✅ **Platform fees** for sustainability (2.5%)

## Gas Estimates

- **Create Market:** ~200,000 gas
- **Make Prediction:** ~100,000 gas  
- **Claim Rewards:** ~80,000 gas
- **Resolve Market:** ~50,000 gas

## Contract Features

- ✅ Create prediction markets with custom questions
- ✅ Make Yes/No predictions with ETH stakes
- ✅ Automatic reward distribution to winners
- ✅ Platform fee collection for sustainability
- ✅ Gas-optimized for Base network
- ✅ Open source and verifiable

## Next Steps

After deployment, you can:
1. Integrate with your React frontend
2. Add wallet connection (Coinbase Wallet/WalletConnect)
3. Implement Farcaster Mini App functionality
4. Add Base Build tracking for Onchain Summer

🎯 **Your contract will be live on Base network and ready for the Onchain Summer Awards!**