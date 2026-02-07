import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const address = searchParams.get("address");
  const chainId = searchParams.get("chainId") || "1"; 

  if (!address) {
    return NextResponse.json({ error: "Address required" }, { status: 400 });
  }

  const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY;

  if (!ETHERSCAN_API_KEY) {
    return NextResponse.json({ error: "API key missing" }, { status: 500 });
  }

  try {
    const url = `https://api.etherscan.io/v2/api?chainid=${chainId}&module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&page=1&offset=10&sort=desc&apikey=${ETHERSCAN_API_KEY}`; 

    const res = await fetch(url);
    const data = await res.json();

    if (data.status === "0") {
      if (data.message === "No transactions found") {
        return NextResponse.json({ transactions: [] });
      }
      return NextResponse.json(
        { error: data.result || data.message },
        { status: 400 },
      );
    }

    return NextResponse.json({
      transactions: Array.isArray(data.result) ? data.result : [],
    });
  } catch (error) {
    return NextResponse.json({ error: "Fetch failed" }, { status: 500 });
  }
}
