import {useState, useEffect} from "react";

import {useSendTransaction, useWriteContract, useWaitForTransactionReceipt} from "wagmi";

import {parseUnits} from "viem";
import type {Token} from "@/lib/tokens";

export function useTokenTransfer(){
    const [isPending, setIsPending] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const {sendTransaction, data: ethTxHash, error: ethError}  = useSendTransaction();

    const {writeContract, data: tokenTxHash, error: tokenError} = useWriteContract();

    const {isSuccess} = useWaitForTransactionReceipt({
        hash: ethTxHash || tokenTxHash,
    });

    useEffect(() => {
        if (isSuccess) {
            setIsPending(false);
            setError(null);
        }
    }, [isSuccess]);

    useEffect(() => {
        if (ethError || tokenError) {
            setError(ethError?.message || tokenError?.message || "Unknown error");
            setIsPending(false);
        }
    }, [ethError, tokenError]);

    async function transfer(
        token: Token,
        to: string,
        amount: string
    ) {
        setIsPending(true);
        setError(null);

        try {
            const value = parseUnits(amount, token.decimals);

            if (token.isNative) {
                sendTransaction({
                    to: to as `0x${string}`,
                    value
                });
            } else {
                writeContract({
                    address: token.address as `0x${string}`,
                    abi: ERC20_ABI,
                    functionName: "transfer",
                    args: [to as `0x${string}`, value],
                });
            }
        } catch (err) {
            const message = err instanceof Error ? err.message : "Unknown error";
            setError(message);
            setIsPending(false);
        }
    }

    return { transfer, isPending, isSuccess, txHash: ethTxHash || tokenTxHash, error };
}

const ERC20_ABI = [
    {
        inputs: [
            {name: "to", type: "address"},
            {name: "amount", type: "uint256"},

        ],
        name: "transfer",
        outputs: [{name: "",type:"bool"}],
        stateMutability: "nonpayable",
        type: "function",
    },

] as const;


