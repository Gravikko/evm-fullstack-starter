export interface Token {
    symbol: string;
    name: string;
    decimals: number;
    address?: string;
    isNative: boolean;
}
                                                                                
  export const MAINNET_TOKENS: Token[] = [                                              
    {                                                                                   
      symbol: "ETH",                                                                    
      name: "Ethereum",                                                                 
      decimals: 18,                                                                     
      isNative: true,                                                                   
    },                                                                                  
    {                                                                                   
      symbol: "USDC",                                                                   
      name: "USD Coin",                                                                 
      decimals: 6,                                                                      
      address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48", // Mainnet USDC            
      isNative: false,                                                                  
    },                                                                                  
    {                                                                                   
      symbol: "USDT",                                                                   
      name: "Tether",                                                                   
      decimals: 6,                                                                      
      address: "0xdAC17F958D2ee523a2206206994597C13D831ec7", // Mainnet USDT            
      isNative: false,                                                                  
    },                                                                                  
  ];  

                                                                           
  export const SEPOLIA_TOKENS: Token[] = [                                              
    {                                                                                   
      symbol: "ETH",                                                                    
      name: "Sepolia ETH",                                                              
      decimals: 18,                                                                     
      isNative: true,                                                                   
    },                                                                                  
  ];

export function getTokensByChainId(chainId: number): Token[] {                        
    if (chainId === 1) return MAINNET_TOKENS;                                           
    if (chainId === 11155111) return SEPOLIA_TOKENS;                                    
    return [{ symbol: "ETH", name: "Ethereum", decimals: 18, isNative: true }];         
  }                                                                                     
         
         