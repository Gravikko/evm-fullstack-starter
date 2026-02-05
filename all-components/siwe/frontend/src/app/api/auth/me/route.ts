import { NextResponse } from "next/server";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { sessionOptions, IronSessionData } from "@/lib/session";

export async function GET() {
  const session = await getIronSession<IronSessionData>(await cookies(), sessionOptions);

  return NextResponse.json({ address: session.address || null });
}
