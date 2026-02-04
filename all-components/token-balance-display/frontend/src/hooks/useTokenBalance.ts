import { useAccount, useBalance} from "wagmi"


interface TokenBalanceResult {
  address: string | undefined;
  balance: string | undefined;
  symbol: string;
  isLoading: boolean;
}


export function useTokenBalance() {
  const { address} = useAccount();

  const {data: balanceData, isLoading} = useBalance({
    address: address
  }); 

  const res: TokenBalanceResult = {
    address: address,
    balance: balanceData?.formatted,
    symbol: balanceData?.symbol || 'ETH',
    isLoading: isLoading
  };

  return res;
}