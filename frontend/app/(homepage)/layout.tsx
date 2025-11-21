// app/layout.tsx
// "use client";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "../globals.css";
import {  neuBlack, neuMedium, neuton, oswald, playfairDisplay } from "@/public/assets/fonts";

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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // await new Promise((r) => setTimeout(r, 5000));
  return (
    <html lang="en" className={`${geistSans.variable} ${oswald.variable} ${geistMono.variable} ${neuBlack.variable} ${neuMedium.variable} ${playfairDisplay.variable} ${neuton.variable} `}>
      <body className="antialiased" >
        {children}
      </body>
    </html>
  );

}
