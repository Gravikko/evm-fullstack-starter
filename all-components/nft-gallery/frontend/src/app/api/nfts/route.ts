import { NextRequest, NextResponse } from "next/server";
import {NFT, formatIpfsUrl} from "@/lib/alchemy";
export async function GET(request: NextRequest) {
  const address = new URL(request.url).searchParams.get("address");

  if (!address) {
    return NextResponse.json({ error: "Address required" }, { status: 400 });
  }

  const ALCHEMY_API_KEY = process.env.ALCHEMY_API_KEY;

  if (!ALCHEMY_API_KEY) {
    return NextResponse.json({ error: "API key missing" }, { status: 500 });
  }

  try {
    const url = `https://eth-mainnet.g.alchemy.com/nft/v3/${ALCHEMY_API_KEY}/getNFTsForOwner?owner=${address}&withMetadata=true&pageSize=20`;

    const res = await fetch(url);
    const data = await res.json();

    if (data.status === "0") {
      return NextResponse.json(
        { error: data.result || data.message },
        { status: 400 },
      );
    }

    const nfts: NFT[] = (data.ownedNfts || []).map((nft: any) => ({
        tokenId: nft.tokenId,
        name: nft.name || "",
        description: nft.description || "",
        image: formatIpfsUrl(nft.image?.cachedUrl || nft.image?.thumbnailUrl || nft.image?.originalUrl || ""),
        collection: nft.contract?.name || "",
        contractAddress: nft.contract?.address || "",
    }));

    return NextResponse.json({nfts});

    

    

  } catch (error) {
    return NextResponse.json({ error: "Fetch failed" }, { status: 500 });
  }
}
