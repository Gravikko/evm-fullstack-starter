"use client";

import { useTxHistory } from "@/hooks/useTxHistory";

import { useAccount } from "wagmi";

export default function Home() {
  const { address, isConnected } = useAccount();
  const { transactions, isLoading, error } = useTxHistory();

  return (
    <main>
      <h1>Transaction History</h1>

      {isConnected && address && (
        <div>
          {/* Добавляем проверку Array.isArray */}
          {Array.isArray(transactions) ? (
            transactions.map((tx) => (
              <div key={tx.hash}>{tx.hash}</div> // Не забудьте отобразить данные
            ))
          ) : (
            <p>No transactions found or loading...</p>
          )}
        </div>
      )}
    </main>
  );
}
