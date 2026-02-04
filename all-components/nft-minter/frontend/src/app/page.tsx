'use client'

import { useNftMinter} from "@/hooks/useNftMinter";
import { useAccount} from "wagmi";

export default function Home() {
  const {address} = useAccount();
  const {mint, isPending, isConfirming, isSuccess, hash} = useNftMinter();

  return (
    <main style={{ padding: "2rem", maxWidth: "600px", margin: "0 auto" }}>
      <h1>NFT Minter</h1>

      {!address ? (
        <p>Connect wallet first</p>
      ) : (
        <div>
          <button
            onClick={mint}
            disabled={isPending || isConfirming}
          >
            {isPending ? "Confirm in wallet..." :
             isConfirming ? "Minting..." :
             "Mint NFT"}
          </button>

          {isSuccess && (
            <div style={{ marginTop: "1rem", color: "green" }}>
              <p>NFT Minted Successfully!</p>
              <p style={{ fontSize: "14px", wordBreak: "break-all" }}>Tx: {hash}</p>
            </div>
          )}
        </div>
      )}
    </main>
  )
}