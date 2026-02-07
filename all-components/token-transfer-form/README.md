# Component Template

Minimal template for web3 components (LayerZero, Chainlink, NFTs, Bridges, etc.)

## Quick Start

```bash
# 1. Copy template
cp -r component-template/ my-component/
cd my-component/

# 2. Delete what you don't need
rm -rf contracts/   # if no smart contracts needed
rm -rf frontend/    # if no frontend needed

# 3. Run the frontend
cd frontend/
npm install
npm run dev
```

## Structure

```
my-component/
├── component.json      # Metadata
├── .env.example        # Environment variables
├── frontend/           # Next.js app (standalone)
│   ├── src/
│   │   ├── app/        # Pages
│   │   ├── hooks/      # Your logic here
│   │   └── lib/        # Contracts, utils
│   └── package.json
└── contracts/          # Foundry (standalone)
    ├── src/            # Solidity contracts
    ├── script/         # Deploy scripts
    ├── test/           # Tests
    └── foundry.toml
```

## Contracts

```bash
cd contracts/
forge build
forge test
source ../.env
forge script script/Deploy.s.sol --rpc-url $RPC_URL --broadcast
```

## Integration

Copy hooks and components into your main project:

```bash
cp -r my-component/frontend/src/hooks/ your-project/src/
cp -r my-component/frontend/src/lib/ your-project/src/
```

Or use as a standalone demo app.
