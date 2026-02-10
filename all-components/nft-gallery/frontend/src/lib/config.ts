import { getDefaultConfig } from "@rainbow-me/rainbowkit";
import { mainnet, sepolia } from "wagmi/chains";
import { http } from "wagmi";

// STEP 1: Get your WalletConnect Project ID
// Go to https://cloud.walletconnect.com and create a project
// Replace "YOUR_PROJECT_ID" with your actual project ID
const WALLETCONNECT_PROJECT_ID = "YOUR_PROJECT_ID";

// STEP 2: Configure RPC endpoints (optional but recommended)
// You can use public RPCs or get your own from:
// - Alchemy: https://www.alchemy.com
// - Infura: https://www.infura.io
// - Ankr: https://www.ankr.com

// STEP 3: Replace with your RPC URL
const MAINNET_RPC = "https://eth-mainnet.g.alchemy.com/v2/YOUR_ALCHEMY_KEY";

export const config = getDefaultConfig({
  appName: "NFT Gallery",
  projectId: WALLETCONNECT_PROJECT_ID,
  chains: [mainnet, sepolia],
  transports: {
    [mainnet.id]: http(MAINNET_RPC),
    [sepolia.id]: http(),
  },
  ssr: true,
});
