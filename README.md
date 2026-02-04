# Web3 Component Bundle

Generated Web3 components ready to use.

## What's Inside

Depending on your selection, this bundle may include:

- `wallet-connect/` - RainbowKit wallet integration
- `component-template/` - Generic web3 component template
- `my-app/` - Main application

## Quick Start

### 1. Wallet Connect Component

```bash
cd wallet-connect/
npm install
npm run dev
```

**Setup:** Add WalletConnect Project ID to `lib/config.ts` (get from https://cloud.walletconnect.com)

**Features:** RainbowKit + Wagmi, fixed header with connect button

---

### 2. Component Template

```bash
cd component-template/

# Delete what you don't need
rm -rf contracts/   # if no smart contracts
rm -rf frontend/    # if no frontend

# Run frontend
cd frontend/
npm install
npm run dev

# OR run contracts
cd contracts/
forge build
forge test
```

**Structure:**
- `frontend/` - Next.js standalone app
- `contracts/` - Foundry standalone contracts

---

### 3. Main App

```bash
cd my-app/
npm install
npm run dev
```

## Integration

Copy components into your main project:

```bash
# Example: Add wallet-connect to main app
cp -r wallet-connect/app/providers.tsx my-app/src/
cp -r wallet-connect/lib/config.ts my-app/src/lib/
```

Or use standalone.

## Tech Stack

- Next.js 15 + React 19 + TypeScript
- Wagmi v2 + Viem + RainbowKit
- Foundry (contracts)
- Tailwind CSS
