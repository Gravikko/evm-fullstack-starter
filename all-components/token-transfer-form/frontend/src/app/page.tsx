'use client';

import { useState, useEffect } from "react";
import { useAccount, useBalance, useChainId } from "wagmi";
import { useTokenTransfer } from "@/hooks/useTokenTransfer";
import { getTokensByChainId, type Token } from "@/lib/tokens";
import { formatUnits, isAddress } from "viem";

export default function TokenTransferPage() {
  const { address, isConnected } = useAccount();
  const chainId = useChainId();
  const tokens = getTokensByChainId(chainId);

  const [selectedToken, setSelectedToken] = useState<Token>(tokens[0]);
  const [recipient, setRecipient] = useState("");
  const [amount, setAmount] = useState("");

  const { transfer, isPending, isSuccess, txHash, error } = useTokenTransfer();

  useEffect(() => {
    if (isSuccess) {
      setRecipient("");
      setAmount("");
    }
  }, [isSuccess]);

  const { data: balance, refetch } = useBalance({
    address,
    token: selectedToken.isNative ? undefined : (selectedToken.address as `0x${string}`),
  });

  useEffect(() => {
    if (isSuccess) {
      refetch();
    }
  }, [isSuccess, refetch]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!isAddress(recipient)) {
      alert("Invalid address");
      return;
    }

    if (!amount || parseFloat(amount) <= 0) {
      alert("Invalid amount");
      return;
    }

    transfer(selectedToken, recipient, amount);
  };

  const handleMaxClick = () => {
    if (balance) {
      setAmount(formatUnits(balance.value, selectedToken.decimals));
    }
  };

  return (
    <main style={{ padding: "2rem", maxWidth: "500px", margin: "0 auto" }}>
      {isConnected && (
        <form onSubmit={handleSubmit} style={{ marginTop: "2rem" }}>
          {/* Token Selector */}
          <div style={{ marginBottom: "1rem" }}>
            <label>Token:</label>
            <select
              value={selectedToken.symbol}
              onChange={(e) => {
                const token = tokens.find((t) => t.symbol === e.target.value);
                if (token) setSelectedToken(token);
              }}
              style={{ width: "100%", padding: "0.5rem" }}
            >
              {tokens.map((token) => (
                <option key={token.symbol} value={token.symbol}>
                  {token.symbol} - {token.name}
                </option>
              ))}
            </select>
          </div>

          {/* Recipient Address */}
          <div style={{ marginBottom: "1rem" }}>
            <label>To Address:</label>
            <input
              type="text"
              placeholder="0x..."
              value={recipient}
              onChange={(e) => setRecipient(e.target.value)}
              style={{ width: "100%", padding: "0.5rem" }}
            />
          </div>

          {/* Amount */}
          <div style={{ marginBottom: "1rem" }}>
            <label>Amount:</label>
            <div style={{ display: "flex", gap: "0.5rem" }}>
              <input
                type="number"
                step="any"
                placeholder="0.0"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                style={{ flex: 1, padding: "0.5rem" }}
              />
              <button type="button" onClick={handleMaxClick}>
                Max
              </button>
            </div>
            {balance && (
              <small>
                Balance: {formatUnits(balance.value, selectedToken.decimals)}{" "}
                {selectedToken.symbol}
              </small>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={isPending}
            style={{ width: "100%", padding: "0.75rem" }}
          >
            {isPending ? "Sending..." : "Send"}
          </button>

          {/* Error */}
          {error && (
            <p style={{ color: "red", marginTop: "1rem" }}>
              Error: {error}
            </p>
          )}

          {/* Success */}
          {isSuccess && txHash && (
            <p style={{ color: "green", marginTop: "1rem" }}>
              Success! Tx: {txHash.slice(0, 10)}...
            </p>
          )}
        </form>
      )}
    </main>
  );
}
