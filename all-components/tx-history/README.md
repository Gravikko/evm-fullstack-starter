# Transaction History

Display wallet transaction history via Etherscan API.

## What it does
- Fetch past transactions for connected wallet
- Show hash, from, to, value, timestamp
- Real-time updates when wallet changes
- Supports Mainnet and Sepolia

## Setup
Get Etherscan API key: https://etherscan.io/apis

Add to `.env.local`:
```
ETHERSCAN_API_KEY=your_key_here
```

Hook: `useTxHistory()` calls `/api/transactions` route (server-side proxy).

No smart contract needed.
