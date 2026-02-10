import { Wallet, Zap, Box, Shield, Hammer, Send, Code, History, Image as ImageIcon, type LucideIcon } from 'lucide-react';

export interface Component {
  id: number;
  name: string;
  title: string;
  description: string;
  features: string[];
  dependencies: string[];
  chains: string[];
  icon: LucideIcon;
  codeSnippet: string;
}

export const components: Component[] = [
  {
    id: 1,
    name: "wallet-connect",
    title: "Wallet Connect",
    description: "RainbowKit wallet connection template with a ready-to-use ConnectButton in the header. Drop it in as a starting point for any dApp.",
    features: ["Multi-wallet support", "RainbowKit modal", "Account display", "Auto-reconnect"],
    dependencies: ["wagmi", "viem", "@rainbow-me/rainbowkit"],
    chains: ["ethereum", "sepolia"],
    icon: Wallet,
    codeSnippet: `export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <WagmiProvider config={config}>
      <QueryClientProvider client={queryClient}>
        <RainbowKitProvider>
          {children}
        </RainbowKitProvider>
      </QueryClientProvider>
    </WagmiProvider>
  );
}`
  },
  {
    id: 2,
    name: "tx-notifications",
    title: "Tx Notifications",
    description: "Toast notifications for the full transaction lifecycle using react-hot-toast. Shows pending, confirmed, and failed states automatically.",
    features: ["Pending state toast", "Success/Error feedback", "Auto-dismiss", "Custom useTxToast hook"],
    dependencies: ["react-hot-toast", "wagmi", "viem"],
    chains: ["ethereum", "sepolia"],
    icon: Zap,
    codeSnippet: `useEffect(() => {
  if (hash && isLoading && !toastIdRef.current) {
    toastIdRef.current = toast.loading("Transaction pending...");
  }
  if (isSuccess && toastIdRef.current) {
    toast.success("Transaction confirmed!", { id: toastIdRef.current });
    toastIdRef.current = null;
  }
  if (isError && toastIdRef.current) {
    toast.error("Transaction failed", { id: toastIdRef.current });
    toastIdRef.current = null;
  }
}, [hash, isLoading, isSuccess, isError]);`
  },
  {
    id: 3,
    name: "token-balance",
    title: "Token Balance",
    description: "Displays native ETH balance for the connected wallet. Uses wagmi's useBalance hook with automatic formatting.",
    features: ["Native ETH balance", "Auto-formatting", "Loading state", "Wallet-aware display"],
    dependencies: ["wagmi", "viem"],
    chains: ["ethereum", "sepolia"],
    icon: Box,
    codeSnippet: `export function useTokenBalance() {
  const { address } = useAccount();
  const { data: balanceData, isLoading } = useBalance({
    address: address
  });

  return {
    address,
    balance: balanceData?.formatted,
    symbol: balanceData?.symbol || 'ETH',
    isLoading
  };
}`
  },
  {
    id: 4,
    name: "siwe-auth",
    title: "SIWE Auth",
    description: "Sign-In with Ethereum authentication with server-side session management. Users sign a message to prove wallet ownership.",
    features: ["SIWE message signing", "Nonce verification", "Cookie-based sessions", "Sign in / Sign out UI"],
    dependencies: ["siwe", "iron-session", "wagmi"],
    chains: ["ethereum", "sepolia"],
    icon: Shield,
    codeSnippet: `async function signIn() {
  const { nonce } = await fetch("/api/auth").then(r => r.json());

  const message = new SiweMessage({
    domain: window.location.host,
    address: walletAddress,
    statement: "Sign in with Ethereum",
    uri: window.location.origin,
    version: "1",
    chainId,
    nonce,
  });

  const signature = await signMessageAsync({
    message: message.prepareMessage(),
  });

  await fetch("/api/auth", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ message, signature }),
  });
}`
  },
  {
    id: 5,
    name: "nft-minter",
    title: "NFT Minter",
    description: "Simple NFT minting interface that calls a mint() function on a deployed smart contract. Tracks transaction state from confirmation to success.",
    features: ["Smart contract mint call", "Transaction status tracking", "Success with tx hash", "Wallet connection check"],
    dependencies: ["wagmi", "viem"],
    chains: ["ethereum", "sepolia"],
    icon: Hammer,
    codeSnippet: `export function useNftMinter() {
  const { writeContract, data: hash, isPending } = useWriteContract();
  const { isLoading: isConfirming, isSuccess } =
    useWaitForTransactionReceipt({ hash });

  const mint = () => {
    writeContract({
      address: NFT_CONTRACT_ADDRESS,
      abi: NFT_ABI,
      functionName: "mint",
    });
  };

  return { mint, isPending, isConfirming, isSuccess, hash };
}`
  },
  {
    id: 6,
    name: "token-transfer",
    title: "Token Transfer",
    description: "Send ETH and ERC-20 tokens (USDC, USDT) with form validation, real-time balance display, and a Max button to auto-fill amount.",
    features: ["ETH & ERC-20 transfers", "Address validation", "Balance display with Max button", "Transaction confirmation"],
    dependencies: ["wagmi", "viem"],
    chains: ["ethereum", "sepolia"],
    icon: Send,
    codeSnippet: `async function transfer(token: Token, to: string, amount: string) {
  const value = parseUnits(amount, token.decimals);

  if (token.isNative) {
    sendTransaction({ to: to as \`0x\${string}\`, value });
  } else {
    writeContract({
      address: token.address as \`0x\${string}\`,
      abi: ERC20_ABI,
      functionName: "transfer",
      args: [to as \`0x\${string}\`, value],
    });
  }
}`
  },
  {
    id: 7,
    name: "contract-write",
    title: "Contract Write",
    description: "Paste any contract address and ABI to call its write functions. Parses the ABI, filters writable methods, and builds a dynamic form.",
    features: ["ABI parsing & filtering", "Dynamic function selector", "Parameter input fields", "Transaction receipt tracking"],
    dependencies: ["wagmi", "viem"],
    chains: ["ethereum", "sepolia"],
    icon: Code,
    codeSnippet: `const executeFunction = async (
  contractAddress: string,
  abi: Abi,
  functionName: string,
  args: any[],
) => {
  writeContract({
    address: contractAddress as \`0x\${string}\`,
    abi,
    functionName,
    args,
  });
};`
  },
  {
    id: 8,
    name: "tx-history",
    title: "Transaction History",
    description: "Fetches the last 10 transactions for the connected wallet via Etherscan API and displays them as cards with hash, addresses, value, and date.",
    features: ["Etherscan API proxy", "Transaction cards", "ETH value formatting", "Date/time display"],
    dependencies: ["wagmi", "viem"],
    chains: ["ethereum", "sepolia"],
    icon: History,
    codeSnippet: `useEffect(() => {
  if (!address) return;
  setIsLoading(true);

  fetch(\`/api/transactions?address=\${address}&chainId=\${chainId}\`)
    .then((res) => res.json())
    .then((data) => setTransactions(data.transactions || []))
    .catch((err) => setError(err.message))
    .finally(() => setIsLoading(false));
}, [address, chainId]);`
  },
  {
    id: 9,
    name: "nft-gallery",
    title: "NFT Gallery",
    description: "Displays all NFTs owned by the connected wallet using Alchemy's getNFTsForOwner API. Shows images, names, and collection info in a responsive grid.",
    features: ["Alchemy NFT API", "Responsive image grid", "Collection names", "IPFS gateway support"],
    dependencies: ["wagmi", "viem"],
    chains: ["ethereum"],
    icon: ImageIcon,
    codeSnippet: `useEffect(() => {
  if (!address) return;
  setIsLoading(true);
  setError(null);

  fetch(\`/api/nfts?address=\${address}\`)
    .then((res) => res.json())
    .then((data) => setNfts(data.nfts || []))
    .catch((err) => setError(err.message))
    .finally(() => setIsLoading(false));
}, [address]);`
  }
];
