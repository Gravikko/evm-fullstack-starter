import { useState, useEffect } from "react";
import { useWriteContract, useWaitForTransactionReceipt } from "wagmi";
import { Abi } from "viem";

export function useContractWrite() {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const { writeContract, data: txHash, error: writeError } = useWriteContract();

  const { isSuccess } = useWaitForTransactionReceipt({
    hash: txHash,
  });

  useEffect(() => {
    if (isSuccess) {
      setIsPending(false);
      setError(null);
    }
  }, [isSuccess]);

  useEffect(() => {
    if (writeError) {
      setError(writeError.message);
      setIsPending(false);
    }
  }, [writeError]);
  const executeFunction = async (
    contractAddress: string,
    abi: Abi,
    functionName: string,
    args: any[],
  ) => {
    try {
      setIsPending(true);
      setError(null);

      writeContract({
        address: contractAddress as `0x${string}`,
        abi: abi,
        functionName: functionName,
        args: args,
      });
    } catch (err: any) {
      setError(err.message);
      setIsPending(false);
    }
  };

  return {
    executeFunction,
    txHash,
    isPending,
    error,
    isSuccess,
  };
}
