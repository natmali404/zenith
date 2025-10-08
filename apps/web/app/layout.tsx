import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { League_Spartan } from "next/font/google";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
});
const megrim = localFont({
  src: "./fonts/Megrim.woff",
  variable: "--font-megrim",
});

const leagueSpartan = League_Spartan({
  subsets: ["latin"],
  variable: "--font-league-spartan",
  weight: ["200", "400", "700"],
});

export const metadata: Metadata = {
  title: "Zenith",
  description: "Your personalized webgame hub",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${megrim.variable} ${leagueSpartan.variable} min-h-screen`}
      >
        {children}
      </body>
    </html>
  );
}
