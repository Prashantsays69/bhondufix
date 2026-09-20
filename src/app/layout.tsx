import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-heading",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "BhonduFix — Bas screenshot bhe 🚀 | Tech Support for Humans",
  description:
    "AI-powered visual tech-support for people who don't speak tech. Drop your error screenshot and get plain-English, safe, step-by-step fixes.",
  icons: {
    icon: "/favicon.ico",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${inter.variable} dark h-full`}>
      <body className="font-sans min-h-full flex flex-col bg-[#09090B] text-[#F4F4F5] antialiased selection:bg-[#C7FF3D] selection:text-[#09090B]">
        {children}
      </body>
    </html>
  );
}
