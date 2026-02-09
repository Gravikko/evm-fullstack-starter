import { useState, useEffect } from "react";
import { Abi, AbiFunction } from "viem";

export function useAbiParser(abi: Abi | null) {
  const [writeFunctions, setWriteFunctions] = useState<AbiFunction[]>([]);

  useEffect(() => {
    if (!abi) {
      setWriteFunctions([]);
      return;
    }
    const functions = abi.filter(
      (item): item is AbiFunction =>
        item.type === "function" &&
        item.stateMutability !== "view" &&
        item.stateMutability !== "pure",
    );

    setWriteFunctions(functions);
  }, [abi]);

  return { writeFunctions };
}
