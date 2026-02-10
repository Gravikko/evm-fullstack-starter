'use client';

import {NFT} from "@/lib/alchemy";

export function NFTCard({nft} : {nft: NFT}) {
    return (
          <div style={{
              border: '1px solid #eee',
              borderRadius: '8px',
              overflow: 'hidden',
              width: '100%',
          }}>
              <img
                  src={nft.image}
                  alt={nft.name}
                  style={{ width: '100%', height: '200px', objectFit: 'cover' }}
                  onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
              />
              <div style={{ padding: '0.75rem' }}>
                  <p style={{ fontWeight: 'bold', margin: 0 }}>
                      {nft.name || `#${nft.tokenId}`}
                  </p>
                  <p style={{ fontSize: '0.85rem', color: '#666', margin: '0.25rem 0 0' }}>
                      {nft.collection}
                  </p>
              </div>
          </div>
      );
}