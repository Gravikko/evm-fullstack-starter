# Token Transfer Form

Send ETH and ERC20 tokens with form validation.

## What it does
- Transfer ETH (native) or ERC20 tokens
- Address validation
- Balance checks
- "Max" button for full balance
- Transaction status feedback

## Usage
Hook: `useTokenTransfer()` handles ETH (`useSendTransaction`) and ERC20 (`useWriteContract`)

Token list in `lib/tokens.ts` — add your tokens there.
