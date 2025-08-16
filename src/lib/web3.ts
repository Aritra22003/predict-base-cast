import { createPublicClient, createWalletClient, custom, http, parseEther, formatEther } from 'viem'
import { base, baseSepolia } from 'viem/chains'
import { predictionMarketABI } from './abis/PredictionMarket'

// Contract addresses (you'll get these after deployment)
export const PREDICTION_MARKET_ADDRESS = {
  mainnet: "0x0000000000000000000000000000000000000000", // Replace with actual deployed address
  testnet: "0x0000000000000000000000000000000000000000", // Replace with testnet address
} as const

const isDev = process.env.NODE_ENV === 'development'
const chain = isDev ? baseSepolia : base
const contractAddress = isDev ? PREDICTION_MARKET_ADDRESS.testnet : PREDICTION_MARKET_ADDRESS.mainnet

export const publicClient = createPublicClient({
  chain,
  transport: http()
})

declare global {
  interface Window {
    ethereum?: any;
  }
}

export const getWalletClient = () => {
  if (typeof window !== 'undefined' && window.ethereum) {
    return createWalletClient({
      chain,
      transport: custom(window.ethereum)
    })
  }
  return null
}

// Contract interaction functions
export const predictionMarketContract = {
  address: contractAddress as `0x${string}`,
  abi: predictionMarketABI,
}

export class PredictionMarketService {
  private publicClient = publicClient
  private walletClient = getWalletClient()

  async createMarket(question: string, description: string, durationHours: number, account: `0x${string}`) {
    if (!this.walletClient) throw new Error('Wallet not connected')
    
    const duration = BigInt(durationHours * 3600) // Convert hours to seconds
    
    const { request } = await this.publicClient.simulateContract({
      address: contractAddress as `0x${string}`,
      abi: predictionMarketABI,
      functionName: 'createMarket',
      args: [question, description, duration],
      account,
    })
    
    return await this.walletClient.writeContract(request)
  }

  async makePrediction(marketId: bigint, prediction: 'yes' | 'no', amount: string, account: `0x${string}`) {
    if (!this.walletClient) throw new Error('Wallet not connected')
    
    const predictionValue = prediction === 'yes' ? 1 : 2 // Outcome.Yes = 1, Outcome.No = 2
    const value = parseEther(amount)
    
    const { request } = await this.publicClient.simulateContract({
      address: contractAddress as `0x${string}`,
      abi: predictionMarketABI,
      functionName: 'makePrediction',
      args: [marketId, predictionValue],
      value,
      account,
    })
    
    return await this.walletClient.writeContract(request)
  }

  async claimRewards(marketId: bigint, account: `0x${string}`) {
    if (!this.walletClient) throw new Error('Wallet not connected')
    
    const { request } = await this.publicClient.simulateContract({
      address: contractAddress as `0x${string}`,
      abi: predictionMarketABI,
      functionName: 'claimRewards',
      args: [marketId],
      account,
    })
    
    return await this.walletClient.writeContract(request)
  }

  async getMarket(marketId: bigint) {
    return await this.publicClient.readContract({
      address: contractAddress as `0x${string}`,
      abi: predictionMarketABI,
      functionName: 'getMarket',
      args: [marketId],
    })
  }

  async getUserPrediction(marketId: bigint, userAddress: `0x${string}`) {
    return await this.publicClient.readContract({
      address: contractAddress as `0x${string}`,
      abi: predictionMarketABI,
      functionName: 'getUserPrediction',
      args: [marketId, userAddress],
    })
  }

  async getActiveMarkets() {
    return await this.publicClient.readContract({
      address: contractAddress as `0x${string}`,
      abi: predictionMarketABI,
      functionName: 'getActiveMarkets',
    })
  }

  // Utility functions
  formatEther(value: bigint) {
    return formatEther(value)
  }

  parseEther(value: string) {
    return parseEther(value)
  }
}

export const predictionMarketService = new PredictionMarketService()

// React hook for Web3 integration
export const useWeb3 = () => {
  // This would integrate with your wallet connection logic
  // For now, returning mock data since this is a demo
  return {
    account: null,
    isConnected: false,
    connect: async () => {},
    disconnect: () => {},
    predictionMarketService,
  }
}