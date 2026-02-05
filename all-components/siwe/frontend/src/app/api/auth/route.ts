import { NextRequest, NextResponse } from "next/server";
                 
  import { SiweMessage, generateNonce } from "siwe";    
import {getIronSession} from "iron-session";
import { cookies } from "next/headers";
import {sessionOptions, IronSessionData} from "@/lib/session"; 


export async function GET(){

    const session = await getIronSession<IronSessionData>(await cookies(), sessionOptions)
    const nonce = generateNonce();
    session.nonce = nonce;
    await session.save()
    return NextResponse.json({nonce});
}

export async function POST(request: NextRequest) {
    const session = await getIronSession<IronSessionData>(await cookies(), sessionOptions)
    const {message, signature}  = await request.json();
    const siweMessage = new SiweMessage(message);

    const {success} = await siweMessage.verify({signature, nonce: session.nonce})

    if (success) {
        session.address = siweMessage.address
        await session.save();
    }

    return NextResponse.json({address: session.address});
}

export async function DELETE() {
    const session = await getIronSession<IronSessionData>(await cookies(), sessionOptions);

    session.destroy();

    return NextResponse.json({ok: true});
}