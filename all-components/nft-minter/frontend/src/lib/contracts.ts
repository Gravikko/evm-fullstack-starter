// STEP 1: Deploy your NFT contract
// Use: forge script script/Deploy.s.sol --rpc-url YOUR_RPC --private-key YOUR_KEY --broadcast
// Copy the deployed contract address and paste it below

export const NFT_CONTRACT_ADDRESS = "CONTRACT_ADDRESS" as const;

// STEP 2: Update ABI to match your contract
// This is a minimal ABI for the mint() function
// If your contract has different functions, update this accordingly

export const NFT_ABI = [
  {
    name: "mint",
    type: "function",
    stateMutability: "nonpayable",
    inputs: [],
    outputs: [],
  },
  {
    name: "totalSupply",
    type: "function",
    stateMutability: "view",
    inputs: [],
    outputs: [{ type: "uint256" }],
  },
] as const;
