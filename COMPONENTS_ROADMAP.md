# Components Roadmap - Detailed Architecture

## 6. Token Transfer Form

### What it does:
- Universal form for sending ETH or ERC20 tokens
- User inputs: recipient address, amount, token selection (ETH/USDC/USDT/etc)
- Shows balance, validates inputs, estimates gas
- Executes transfer transaction

### NOT just a button:
- Full form with address validation (ENS support optional)
- Token selector dropdown (ETH + popular ERC20s)
- Amount input with "Max" button
- Real-time balance check
- Gas estimation before send
- Transaction status feedback

### Architecture:
```
token-transfer/
├── app/
│   └── page.tsx              # Form UI (address, amount, token selector)
├── hooks/
│   ├── useTokenTransfer.ts   # useSendTransaction + useWriteContract
│   └── useTokenList.ts       # List of supported tokens (ETH, USDC, etc)
├── lib/
│   ├── config.ts             # Wagmi config
│   └── tokens.ts             # Token addresses + ABIs (Mainnet/Sepolia)
```

### Integration:
```tsx
// Standalone usage
import TokenTransferForm from '@/token-transfer'

// DeFi integration
<TokenTransferForm
  defaultToken="USDC"
  defaultRecipient={poolAddress}
  onSuccess={(hash) => console.log('Sent!', hash)}
/>
```

### Key hooks:
- `useSendTransaction()` - for ETH transfers
- `useWriteContract()` - for ERC20 transfers
- `useBalance()` - show user balance
- `useEstimateGas()` - gas estimation

---

## 7. Contract Write Form

### What it does:
- Universal interface for calling ANY smart contract function
- User inputs: contract address, function selector, parameters
- Dynamically renders form based on ABI
- Used for testing, admin panels, advanced users

### Example use cases:
- Call `mint()` on NFT contract
- Call `approve()` on token contract
- Call `stake()` on staking contract
- ANY write function on ANY contract

### Architecture:
```
contract-write/
├── app/
│   └── page.tsx              # Dynamic form
├── hooks/
│   ├── useContractWrite.ts   # useWriteContract wrapper
│   └── useAbiParser.ts       # Parse ABI → generate form fields
├── lib/
│   └── abiParser.ts          # Convert ABI to input fields
```

### How it works:
1. User pastes contract address
2. User pastes ABI or selects verified contract (Etherscan API)
3. UI renders dropdown of available write functions
4. User selects function → form auto-generates input fields
5. User fills params → click "Execute"
6. Transaction sent via `useWriteContract()`

### Integration:
```tsx
// Standalone
<ContractWriteForm />

// Pre-filled for specific contract
<ContractWriteForm
  contractAddress="0x..."
  abi={MyContractABI}
  defaultFunction="mint"
/>
```

### Who needs this:
- Developers testing contracts
- Power users interacting with custom contracts
- Admin panels
- NOT for regular users (too technical)

---

## 8. NFT Gallery

### What it does:
- Displays ALL NFTs owned by connected wallet
- Fetches from blockchain APIs (Alchemy/Moralis/Reservoir)
- Shows image, name, collection, metadata
- Works across ALL collections (not just minted ones)

### NOT from Metamask:
- Metamask doesn't expose NFT data
- We fetch from **Alchemy NFT API** or **Moralis**
- These APIs index ALL NFTs on-chain (including spam/scam)

### How it gets NFTs:
```
User connects wallet (0x123...)
  ↓
Frontend calls Alchemy API:
  GET /getNFTs?owner=0x123...
  ↓
API returns ALL NFTs:
  - Legit NFTs (Bored Ape, etc)
  - User's minted NFTs
  - Spam/scam NFTs (can filter later)
  ↓
Display in grid with images
```

### Architecture:
```
nft-gallery/
├── app/
│   └── page.tsx              # NFT grid display
├── hooks/
│   └── useNFTs.ts            # Fetch NFTs from Alchemy API
├── lib/
│   └── alchemy.ts            # Alchemy SDK config
├── components/
│   └── NFTCard.tsx           # Single NFT display
```

### API Integration:
```ts
// useNFTs.ts
import { Alchemy, Network } from "alchemy-sdk";

const alchemy = new Alchemy({
  apiKey: process.env.ALCHEMY_API_KEY,
  network: Network.ETH_MAINNET,
});

export function useNFTs() {
  const { address } = useAccount();

  useEffect(() => {
    if (!address) return;

    alchemy.nft.getNftsForOwner(address).then((nfts) => {
      setNfts(nfts.ownedNfts);
    });
  }, [address]);
}
```

### Features:
- Grid layout with images
- Filter by collection
- Filter spam NFTs (checkbox)
- Click NFT → show metadata modal
- Optional: "Send NFT" button (uses `safeTransferFrom`)

### Integration:
```tsx
// Standalone gallery
<NFTGallery />

// With filters
<NFTGallery
  filterSpam={true}
  collections={['0xBC4CA0...']} // only show Bored Apes
/>

// With actions
<NFTGallery
  onNFTClick={(nft) => console.log('Selected:', nft)}
  showSendButton={true}
/>
```

### Wallet compatibility:
- Works with ALL wallets (Metamask, WalletConnect, Coinbase Wallet)
- We only need wallet ADDRESS
- API fetches NFTs by address (not from wallet itself)
- Same data regardless of wallet used

### Spam NFT handling:
- Alchemy API returns `spam: true` flag
- Filter option: "Hide spam" checkbox
- User can still see spam if unchecks filter

---

## Summary Table

| Component | Complexity | API Required | Use Case |
|-----------|-----------|--------------|----------|
| Token Transfer | Medium | No | Send ETH/tokens |
| Contract Write | Medium | Optional (Etherscan) | Call any contract |
| NFT Gallery | Medium | Yes (Alchemy) | Show user's NFTs |

---

## When to stop:

**Minimum viable (recommended):**
- Token Transfer Form ✅
- STOP HERE → You have complete basic dApp toolkit

**Extended (if needed):**
- Add Contract Write → For power users/devs
- Add NFT Gallery → If your dApp involves NFTs

**Advanced (niche):**
- Token Swap (DEX integration)
- Staking Interface
- Cross-chain bridge

---

## Next Steps:

1. **Token Transfer Form** - Start here (most useful)
2. **NFT Gallery** - If you care about NFTs
3. **Contract Write** - Only if needed for advanced users

After Token Transfer, you can integrate existing components into real projects.
