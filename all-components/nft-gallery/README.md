# NFT Gallery

Display all NFTs owned by connected wallet.

## What it does
- Fetch NFTs from Alchemy API
- Display images in grid layout
- Show name, collection, tokenId
- Works with ANY NFT (not just minted ones)
- IPFS image support

## Setup
Get Alchemy API key: https://www.alchemy.com

Add to `.env.local`:
```
ALCHEMY_API_KEY=your_key_here
```

Hook: `useNFTs()` calls `/api/nfts` route (server-side proxy).

No smart contract needed.
