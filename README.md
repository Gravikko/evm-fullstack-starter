# EVM Fullstack Starter

Copy-paste Web3 components for building dApps fast. Each component is a standalone Next.js app — grab what you need, drop it in, and ship.

## Components

| Component | Description |
|-----------|-------------|
| **Wallet Connect** | RainbowKit wallet connection with multi-wallet support |
| **Tx Notifications** | Toast notifications for transaction lifecycle (react-hot-toast) |
| **Token Balance** | Display native ETH balance for connected wallet |
| **SIWE Auth** | Sign-In with Ethereum + server-side sessions (iron-session) |
| **NFT Minter** | Mint NFTs via smart contract with tx tracking |
| **Token Transfer** | Send ETH and ERC-20 tokens with form validation |
| **Contract Write** | Call any contract's write functions by pasting ABI |
| **Tx History** | Fetch and display transactions via Etherscan API |
| **NFT Gallery** | Display all NFTs owned by wallet via Alchemy API |

## Quick Start

Each component runs independently:

```bash
cd all-components/wallet-connect/frontend
npm install
npm run dev
```

Some components require API keys — check `.env.example` in the component folder.

## Tech Stack

- **Next.js** (App Router) + **React 19** + **TypeScript**
- **Wagmi v2** + **Viem** — Web3 hooks and Ethereum interaction
- **RainbowKit** — Wallet connection UI
- **TanStack React Query** — Data fetching
- **Foundry** + **Solidity 0.8.x** — Smart contracts (optional per component)

## Project Structure

```
all-components/
├── wallet-connect/
├── tx-notifications/
├── token-balance-display/
├── siwe/
├── nft-minter/
├── token-transfer-form/
├── contract-write/
├── tx-history/
└── nft-gallery/
```

Each component follows the same structure:

```
component-name/
├── frontend/          # Next.js app
│   ├── src/
│   │   ├── app/       # Pages, layout, providers, API routes
│   │   ├── hooks/     # Custom hooks (business logic)
│   │   └── lib/       # Config, contracts, utilities
│   └── package.json
└── contracts/         # Foundry smart contracts (optional)
```

## License

MIT
