import {useState, useEffect} from "react";

import {useAccount} from "wagmi";

import {NFT} from "@/lib/alchemy";

export function useNFTs() {
    const [nfts, setNfts] = useState<NFT[]>([]);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const {address} = useAccount();

    useEffect(() => {
        if (!address) return;

        setIsLoading(true);
        setError(null);
        fetch(`/api/nfts?address=${address}`).then(res => res.json()).then(data => setNfts(data.nfts || [])).catch(err => setError(err.message)).finally(() => setIsLoading(false))

    }, [address])

    return {nfts, isLoading, error}


}