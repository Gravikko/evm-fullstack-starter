import type { Metadata } from "next";
import '@rainbow-me/rainbowkit/styles.css';
import { Providers } from "./providers";
import { ConnectButton } from "@rainbow-me/rainbowkit";

export const metadata: Metadata = {
  title: "SIWE",
  description: "Sign-In with Ethereum",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Providers>
          <header style={{ position: 'fixed', top: 0, left: 0, right: 0, height: '60px', background: '#fff', borderBottom: '1px solid #eee', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 1.5rem', zIndex: 1000 }}>
            <h1 style={{ fontSize: '1.2rem', fontWeight: 'bold' }}>SIWE</h1>
            <ConnectButton />
          </header>
          <main style={{ paddingTop: '60px' }}>
            {children}
          </main>
        </Providers>
      </body>
    </html>
  );
}
