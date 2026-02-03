#!/bin/bash

# Deploy contracts
cd contracts
forge script script/Deploy.s.sol --rpc-url $RPC_URL --broadcast --verify

# Update frontend with contract address
# TODO: Add logic to update frontend/src/lib/contracts.ts
