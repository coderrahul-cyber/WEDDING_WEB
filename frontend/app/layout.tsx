// app/layout.tsx

import SmoothScrolling from "@/sections/smoothScroller";
import "./globals.css";
import {  geistMono, geistSans, neuBlack, neuMedium, neuton, oswald, playfairDisplay } from "@/public/assets/fonts";




export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${oswald.variable} ${geistMono.variable} ${neuBlack.variable} ${neuMedium.variable} ${playfairDisplay.variable} ${neuton.variable} `}>
      <body className="antialiased" >
        <SmoothScrolling>
        {children}
        </SmoothScrolling>
      </body>
    </html>
  );
}
