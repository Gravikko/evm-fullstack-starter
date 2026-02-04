'use client'

import {useWriteContract, useWaitForTransactionReceipt} from "wagmi";
import { NFT_CONTRACT_ADDRESS, NFT_ABI } from "@/lib/contracts";

export function useNftMinter() {
    const {writeContract, data: hash, isPending} = useWriteContract();

    const {isLoading: isConfirming, isSuccess} = useWaitForTransactionReceipt({hash});

    const mint = () => {
        writeContract({
            address: NFT_CONTRACT_ADDRESS,
            abi: NFT_ABI,
            functionName: "mint",
        });
    };

    return {
        mint,
        isPending,
        isConfirming,
        isSuccess,
        hash,
    };
}