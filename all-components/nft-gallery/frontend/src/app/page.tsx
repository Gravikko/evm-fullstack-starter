"use client";

import { useAccount } from "wagmi";
import { useNFTs } from "@/hooks/useNFTs";

import { NFTCard } from "@/components/NFTCard";

export default function Home() {
  const { address } = useAccount();
  const { nfts, isLoading, error } = useNFTs();
  return (
    <main style={{ padding: "2rem", maxWidth: "1000px", margin: "0 auto" }}>
      <h2>My NFTs</h2>

      {!address && <p>Connect wallet first</p>}
      {isLoading && <p>Loading NFTs...</p>}
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      {!isLoading && !error && nfts.length === 0 && address && (
        <p>No NFTs found</p>
      )}

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))",
          gap: "1rem",
          marginTop: "1rem",
        }}
      >
        {nfts.map((nft) => (
          <NFTCard key={nft.contractAddress + nft.tokenId} nft={nft} />
        ))}
      </div>
    </main>
  );
}
