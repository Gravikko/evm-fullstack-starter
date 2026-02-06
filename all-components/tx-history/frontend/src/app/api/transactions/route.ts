import { NextRequest, NextResponse } from "next/server";

export async function GET(request: NextRequest) {
  const { searchParams } = new URL(request.url);
  const address = searchParams.get("address");

  if (!address) {
    return NextResponse.json({  error: "Address is required"  }, { status: 400 });
  }

  const ETHERSCAN_API_KEY = process.env.ETHERSCAN_API_KEY;

  const url = `https://api.etherscan.io/api?module=account&action=txlist&address=${address}&startblock=0&endblock=99999999&page=1&offset=10&sort=desc&apikey=${ETHERSCAN_API_KEY}`;
  const res = await fetch(url);
  const data = await res.json();

  return NextResponse.json({ transactions: data.result });
}
