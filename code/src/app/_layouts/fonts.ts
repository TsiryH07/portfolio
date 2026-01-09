import {JetBrains_Mono, Space_Grotesk} from "next/font/google";

export const fontSans = Space_Grotesk({
  display: "swap",
  subsets: ["latin"],
  variable: "--font-geist-sans",
  weight: ["400", "500", "600", "700"],
});

export const fontMono = JetBrains_Mono({
  display: "swap",
  subsets: ["latin"],
  variable: "--font-geist-mono",
  weight: ["400", "500", "600", "700"],
});
