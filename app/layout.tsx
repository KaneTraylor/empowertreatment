import type { Metadata } from "next";
import localFont from "next/font/local";
import Script from "next/script";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/SmoothScrollProvider";
import { CrisisHotline } from "@/components/CrisisHotline";

// Configure Line Seed Sans font
const lineSeedSans = localFont({
  src: [
    {
      path: '../public/fonts/LINESeedSans_A_Th.ttf',
      weight: '100',
      style: 'normal',
    },
    {
      path: '../public/fonts/LINESeedSans_A_Rg.ttf',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/LINESeedSans_A_He.ttf',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../public/fonts/LINESeedSans_A_Bd.ttf',
      weight: '700',
      style: 'normal',
    },
    {
      path: '../public/fonts/LINESeedSans_A_XBd.ttf',
      weight: '800',
      style: 'normal',
    },
  ],
  variable: '--font-line-seed',
});

export const metadata: Metadata = {
  title: "Welcome call | Empower Treatment",
  description: "Schedule your free welcome call with Empower Treatment",
  icons: {
    icon: '/favicon-et.png',
    shortcut: '/favicon-et.png',
    apple: '/favicon-et.png',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${lineSeedSans.variable} ${lineSeedSans.className}`}>
        <CrisisHotline />
        <SmoothScrollProvider>
          {children}
        </SmoothScrollProvider>
        {/* Tidio Live Chat */}
        <Script
          src="//code.tidio.co/8fnf2kgzkglr7i8bvsrdqucgne1y097d.js"
          strategy="afterInteractive"
          async
        />
      </body>
    </html>
  );
}