'use client';

                   
  import { useEffect, useRef } from "react";                                 
  import toast from "react-hot-toast";                                       
  import { useWaitForTransactionReceipt } from "wagmi";    

  export function useTxToast(hash: `0x${string}` | undefined) {
                           
  const toastIdRef = useRef<string | null>(null);     
    const {isLoading, isSuccess, isError} = useWaitForTransactionReceipt({
      hash,
    })

    useEffect(() => {
      if (hash && isLoading && !toastIdRef.current) {
        toastIdRef.current = toast.loading("Transaction pending...");
      }

      if (isSuccess && toastIdRef.current) {
        toast.success("Transaction confirmed!", { id: toastIdRef.current });
        toastIdRef.current = null;
      }

      if (isError && toastIdRef.current) {
        toast.error("Transaction failed", { id: toastIdRef.current});
        toastIdRef.current = null;
      }
    }, [hash, isLoading, isSuccess, isError]);

    return {isLoading, isSuccess, isError};

  }