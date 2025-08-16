// Deployment script for Hardhat
// Run with: npx hardhat run contracts/deploy.js --network base

const hre = require("hardhat");

async function main() {
  console.log("Deploying PredictionMarket to Base...");

  const PredictionMarket = await hre.ethers.getContractFactory("PredictionMarket");
  const predictionMarket = await PredictionMarket.deploy();

  await predictionMarket.deployed();

  console.log("PredictionMarket deployed to:", predictionMarket.address);
  
  // Verify contract on Basescan
  if (hre.network.name !== "hardhat" && hre.network.name !== "localhost") {
    console.log("Waiting for block confirmations...");
    await predictionMarket.deployTransaction.wait(6);
    
    console.log("Verifying contract...");
    try {
      await hre.run("verify:verify", {
        address: predictionMarket.address,
        constructorArguments: [],
      });
    } catch (e) {
      console.log("Verification failed:", e.message);
    }
  }

  return predictionMarket.address;
}

main()
  .then((address) => {
    console.log("\n🎉 Deployment successful!");
    console.log("Contract Address:", address);
    console.log("Base Mainnet Explorer:", `https://basescan.org/address/${address}`);
    console.log("Add this address to your .env file:");
    console.log(`NEXT_PUBLIC_PREDICTION_MARKET_ADDRESS=${address}`);
    process.exit(0);
  })
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });