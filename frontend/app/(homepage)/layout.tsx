// app/layout.tsx
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import {  neuBlack, neuMedium, neuton } from "@/public/assets/fonts";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "XYZ-Studio",
  description: "THE BEST PHOTOGRAPHY STUDIO IN THE AREA",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable} ${neuBlack.variable} ${neuMedium.variable} ${neuton.variable}`}>
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
