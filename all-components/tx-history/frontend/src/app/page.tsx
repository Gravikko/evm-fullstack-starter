"use client";

import { useTxHistory } from "@/hooks/useTxHistory";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export default function Home() {
  const { transactions, isLoading, error } = useTxHistory();

  return (
    <main style={{ padding: "2rem", maxWidth: "1200px", margin: "0 auto" }}>
      <h1>Transaction History</h1>

      <div style={{ marginBottom: "2rem" }}>
        <ConnectButton />
      </div>

      {isLoading && <p>Loading transactions...</p>}

      {error && <p style={{ color: "red" }}>Error: {error}</p>}

      {!isLoading && transactions.length === 0 && <p>No transactions found</p>}

      {transactions.length > 0 && (
        <div style={{ display: "grid", gap: "1rem" }}>
          {transactions.map((tx) => (
            <div
              key={tx.hash}
              style={{
                border: "1px solid #ddd",
                padding: "1rem",
                borderRadius: "8px",
              }}
            >
              <div>
                <strong>Hash:</strong> {tx.hash.slice(0, 20)}...
              </div>
              <div>
                <strong>From:</strong> {tx.from.slice(0, 10)}...
              </div>
              <div>
                <strong>To:</strong> {tx.to.slice(0, 10)}...
              </div>
              <div>
                <strong>Value:</strong> {(parseInt(tx.value) / 1e18).toFixed(4)}{" "}
                ETH
              </div>
              <div>
                <strong>Time:</strong>{" "}
                {new Date(parseInt(tx.timeStamp) * 1000).toLocaleString()}
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
