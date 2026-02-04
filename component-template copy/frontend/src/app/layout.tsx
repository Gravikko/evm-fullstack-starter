import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Component Demo",
  description: "Web3 component template",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
