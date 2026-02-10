# Contract Write Form

Call ANY smart contract function via ABI.

## What it does
- Universal interface for calling write functions
- User pastes contract address + ABI
- Auto-generates form fields from ABI
- Executes transaction with parameters

## Usage
Hook: `useContractWrite()` wraps `useWriteContract()`
ABI parser: `useAbiParser()` extracts write functions

For developers/power users — not end-user facing.

No smart contract needed (works with any deployed contract).
