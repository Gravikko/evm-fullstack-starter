import { getDefaultConfig} from "@rainbow-me/rainbowkit";
import { mainnet, sepolia } from "wagmi/chains";

export const config = getDefaultConfig({
    appName: "PLACEHOLDER",
    projectId: "YOUR_PROJECT_ID",
    chains: [mainnet, sepolia],
    ssr: true,
});