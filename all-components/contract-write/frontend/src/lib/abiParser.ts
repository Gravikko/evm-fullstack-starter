import { AbiFunction } from "viem";

export interface InputField {
  name: string;
  type: string;
}

export function parseAbiFunction(abiItem: AbiFunction): InputField[] {
  if (abiItem.type !== "function") return [];
  if (abiItem.stateMutability == "view" || abiItem.stateMutability === "pure") {
    return [];
  }

  return abiItem.inputs.map((input) => ({
    name: input.name || "unnamed",
    type: input.type,
  }));
}

export function parseFunctionSignature(abiItem: AbiFunction): string {
  const params = abiItem.inputs.map((i) => i.type).join(",");
  return `${abiItem.name}(${params})`;
}
