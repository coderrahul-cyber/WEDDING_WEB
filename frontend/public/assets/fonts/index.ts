import localFont from "next/font/local";
import { Geist, Geist_Mono, Playfair_Display  , Oswald} from "next/font/google";
export const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});
export const playfairDisplay = Playfair_Display({
  weight: ["400", "700"],
  style: ["normal", "italic"],
  subsets: ["latin"],
  variable: "--font-playfair-display",
});

export const oswald = Oswald({
  weight: ["400", "500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-oswald",
});

export const neuBlack = localFont({
  src: "./neu/NeueHaasDisplayBlack.woff2",
  variable: "--font-neu",
});

export const neuMedium = localFont({
  src: "./neu/NeueHaasDisplayMediu.woff2",
  variable: "--font-neu-medium",
});
export const neuton = localFont({
  src: "./Neuton-Regular.woff2",
  variable: "--font-neuton",
});
