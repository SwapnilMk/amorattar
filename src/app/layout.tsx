import type { Metadata, Viewport } from "next";
import "@/styles/globals.css";
import { satoshi } from "@/styles/fonts";
import Providers from "./(user)/providers";

export const metadata: Metadata = {
  title: "amorattar",
  description: "Premium attar and perfume shop",
};

export const viewport: Viewport = {
  themeColor: "#000000",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={satoshi.className}>
        <Providers>
          {children}
        </Providers>
      </body>
    </html>
  );
}
