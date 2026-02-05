'use client'

import { useAccount } from "wagmi";
import { useSiwe } from "@/hooks/useSiwe";

export default function Home() {
  const { isConnected } = useAccount();
  const { address, isLoading, error, signIn, signOut } = useSiwe();

  return (
    <main>
      <h1>Sign-In with Ethereum</h1>

      {isConnected && !address && (
          <button onClick={signIn} disabled={isLoading}>
              {isLoading ? "Signing..." : "Sign In with Ethereum"}
          </button>
      )}                                                         
                                                                 
      {address && (                                              
          <div>                                                  
              <p>Logged in as: {address}</p>                     
              <button onClick={signOut}>Sign Out</button>        
          </div>                                                 
      )}                                                         
                                                                 
      {error && <p style={{color: "red"}}>{error}</p>}           
  </main>   
  )
}