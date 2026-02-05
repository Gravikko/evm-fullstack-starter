'use client'

import { useAccount } from "wagmi";

export default function Home() {
  const { address, isConnected } = useAccount();

  return (
    <main>
      <h1>Transaction History</h1>

      {isConnected && address && (
        <div>
          <p>Wallet: {address}</p>
          {/* TX History will be here */}
        </div>
      )}
    </main>
  )
}
