# Component Template

Minimal template for web3 components (LayerZero, Chainlink, NFTs, Bridges, etc.)

## Quick Start

```bash
# 1. Copy template
cp -r component-template/ my-component/
cd my-component/

# 2. Run setup
bash scripts/setup.sh my-component

# 3. Install and run
cd frontend/
npm install
npm run dev
```

## Structure

```
my-component/
├── component.json      # Metadata
├── frontend/           # Next.js app
│   ├── src/
│   │   ├── app/       # Pages
│   │   ├── hooks/     # Your logic here
│   │   └── lib/       # Contracts, utils
│   └── package.json
├── contracts/          # Foundry
│   ├── src/           # Solidity contracts
│   ├── script/        # Deploy scripts
│   ├── test/          # Tests
│   └── foundry.toml
└── scripts/
    ├── setup.sh       # Initial setup
    └── deploy.sh      # Deploy contracts
```

## Foundry Commands

```bash
cd contracts/

# Build
forge build

# Test
forge test

# Deploy
source ../.env
forge script script/Deploy.s.sol --rpc-url $RPC_URL --broadcast
```

## Delete What You Don't Need

**No contracts?** (e.g., wallet-connect only)
```bash
rm -rf contracts/ scripts/deploy.sh
```

## Integration

Copy hooks and components to your main project:

```bash
cp -r hooks/ components/ /your-project/src/
```

Or use as standalone demo app.

## Examples

**LayerZero Bridge:**
- Update `component.json` dependencies: `@layerzerolabs/scan-client`
- Build logic in `hooks/useComponent.ts`
- Add contracts in `contracts/src/`

**Wallet Connect:**
- No contracts needed (skip contracts folder)
- Use `wagmi` hooks in `hooks/useComponent.ts`
- Pure frontend component
