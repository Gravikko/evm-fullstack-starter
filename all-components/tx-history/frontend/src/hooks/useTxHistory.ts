import  {useState, useEffect} from "react";
import {useAccount} from "wagmi";
 

interface Transaction {
    hash: string;
    from: string;
    to: string;
    value: string;
    timeStamp: string;
}


export function useTxHistory() {
    const { address } = useAccount(); 

    const [transactions, setTransactions] = useState<Transaction[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (!address) return;

        setIsLoading(true);

        fetch(`/api/transactions?address=${address}`)
        .then((res) => res.json())
        .then((data) => setTransactions(data.transactions))
        .catch((err) => {
            setError(err.message);
        })
        .finally(() => {
            setIsLoading(false);
        });
    }, [address])

    return {transactions, isLoading, error};

}