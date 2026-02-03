# Ultimate dApp Scaffold

> Generate production-ready Web3 projects in seconds, not hours.

A web-based generator for fullstack dApp boilerplates with smart contracts, frontend, and cross-chain support.

## Features

**Template Types**
- ERC-20 Token
- NFT Collection (ERC-721/1155)
- Staking Platform
- DAO Governance

**Cross-Chain (Unique)**
- LayerZero V2 OFT - Omnichain tokens
- Chainlink CCIP - Cross-chain messaging
- Wormhole - EVM to Solana bridge

**Tooling Options**
- Foundry or Hardhat
- OpenZeppelin / Solady
- Upgradeable (Proxy) support

**Frontend Stack**
- Next.js 14 + TypeScript
- Wagmi v2 + Viem + RainbowKit
- GlassUI - Custom design system (Black/Purple + Liquid Glass)

**AI-Powered**
- Auto-generated README
- "Explain Code" feature

## Quick Start

```bash
# Clone
git clone https://github.com/your-username/ultimate-dapp-scaffold.git
cd ultimate-dapp-scaffold

# Install
pnpm install

# Dev
pnpm dev
```

## Generated Project Structure

```
my-dapp/
├── contracts/           # Solidity + Foundry/Hardhat
│   ├── src/
│   ├── test/
│   └── script/
├── frontend/            # Next.js + GlassUI
│   ├── src/
│   │   ├── app/
│   │   ├── components/ui/
│   │   └── hooks/
│   └── package.json
└── README.md
```

## Tech Stack

| Layer | Technology |
|-------|------------|
| Contracts | Solidity 0.8.x, Foundry, OpenZeppelin |
| Frontend | Next.js 14, TypeScript, Tailwind CSS |
| Web3 | Wagmi v2, Viem, RainbowKit |
| Cross-Chain | LayerZero, Chainlink CCIP, Wormhole |
| Design | GlassUI (custom) |

## Roadmap

- [x] Project specification
- [ ] Basic ERC-20 template
- [ ] NFT template
- [ ] Staking template
- [ ] Cross-chain templates
- [ ] GlassUI design system
- [ ] AI integration
- [ ] GitHub repo generation

## Why This?

| Problem | Solution |
|---------|----------|
| Setting up Web3 stack takes hours | One-click generation |
| Cross-chain is hard to configure | Pre-configured templates |
| Generic ugly UIs | GlassUI design system |
| No docs for generated code | AI-powered documentation |

## License

MIT
