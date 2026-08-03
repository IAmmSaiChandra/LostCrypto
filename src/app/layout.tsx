import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ShaderBackground } from "@/src/components/ui/simplex-noise-spots";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LostCrypto",
  description: "Recover lost crypto wallets",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased relative min-h-screen`}>
        {/* Simplex Noise spots background filling viewport globally */}
        <ShaderBackground className="fixed inset-0 -z-20 opacity-[0.06] pointer-events-none" />
        {children}
      </body>
    </html>
  );
}
