import { SessionOptions } from "iron-session";

export interface IronSessionData {
    nonce?: string;
    address?: string;
}


export const sessionOptions: SessionOptions = {
 
        cookieName: "siwe-session",
        password: process.env.SESSION_SECRET!,
        cookieOption: {
            secure:  process.env.NODE_ENV === "production"
        }
        
}