# NFT Minter

Mint NFTs via smart contract interaction.

## What it does
- Call `mint()` function on deployed NFT contract
- Transaction confirmation
- Pending/success states
- Works with any ERC721 contract

## Setup
1. Deploy `contracts/src/SimpleNFT.sol` to testnet/mainnet
2. Update contract address in `frontend/src/lib/contracts.ts`
3. Update ABI if using custom contract

Hook: `useNftMinter()` wraps `useWriteContract()`.
