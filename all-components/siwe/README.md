# Sign-In with Ethereum (SIWE)

Authentication via wallet signature.

## What it does
- Sign message with wallet (no gas fees)
- Create server-side session (iron-session)
- Secure authentication without passwords
- Session persistence across page reloads

## Setup
Requires both frontend and API routes:
- Frontend: `hooks/useSiwe.ts` handles signing
- Backend: `app/api/auth/route.ts` verifies signature

No smart contract needed.

Uses `siwe` + `iron-session` packages.
