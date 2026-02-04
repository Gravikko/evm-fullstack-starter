"use client";

import { useTxToast } from "@/hooks/useTxToast";
import { useSendTransaction, useAccount } from "wagmi";
import { parseEther } from "viem";

export default function Home() {
  const { address } = useAccount();
  const { sendTransaction, data: hash } = useSendTransaction();
  useTxToast(hash);

  const handleSend = () => {
    if (!address) return;

    sendTransaction({
      to: address,
      value: parseEther("0"),
    });
  };

  return (
    <main style={{ padding: "2rem" }}>
      <h1>Transaction Notifications Demo</h1>

      {!address ? (
        <p>Connect wallet first</p>
      ) : (
        <button onClick={handleSend}>Send Test Transaction</button>
      )}
    </main>
  );
}
