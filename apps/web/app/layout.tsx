import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";

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
      <body className={`${geistSans.variable} ${geistMono.variable} ${megrim.variable} min-h-screen bg-gradient-to-br from-[#110345] to-[#6744C0]`}>
        {children}
      </body>
    </html>
  );
}
