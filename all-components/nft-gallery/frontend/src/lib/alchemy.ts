export interface NFT {
    tokenId: string,
    name: string,
    description: string,
    image: string,
    collection: string,
    contractAddress: string
};

export function formatIpfsUrl(url: string) {
    if (url.startsWith("ipfs://")) {
        return url.replace("ipfs://", "https://ipfs.io/ipfs/");
    }
    return url;
}
