import { useAccount, useSignMessage } from "wagmi";
import { SiweMessage } from "siwe";
import { useState, useEffect } from "react";

export function useSiwe() {
  const [address, setAddress] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  const { address: walletAddress, chainId } = useAccount();
  const { signMessageAsync } = useSignMessage();

  // Check session on mount
  useEffect(() => {
    fetch("/api/auth/me")
      .then((res) => res.json())
      .then((data) => setAddress(data.address))
      .finally(() => setIsLoading(false));
  }, []);

  async function signIn() {
    setIsLoading(true);

    const res = await fetch("/api/auth");
    const { nonce } = await res.json();

    const siweMessage = new SiweMessage({
      domain: window.location.host,
      address: walletAddress,
      statement: "Sign in with Ethereum",
      uri: window.location.origin,
      version: "1",
      chainId: chainId,
      nonce: nonce,
    });

    const signature = await signMessageAsync({
      message: siweMessage.prepareMessage(),
    });

    const message = siweMessage.prepareMessage();
    const verifyRes = await fetch("/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message, signature }),
    });

    const { address: verifiedAddress } = await verifyRes.json();
    setAddress(verifiedAddress);
    setIsLoading(false);    
  }

  async function signOut() {
    await fetch("/api/auth", { method: "DELETE" });
    setAddress(null);
  }

  return { address, isLoading, error, signIn, signOut };
}
