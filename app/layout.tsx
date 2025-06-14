import type { Metadata } from "next";
import localFont from "next/font/local";
import Script from "next/script";
import "./globals.css";
import { SmoothScrollProvider } from "@/components/SmoothScrollProvider";
import { ScrollToTop } from "@/components/ScrollToTop";
import { TreatmentCenterSchema, FAQSchema } from "@/components/StructuredData";
import GoogleAnalytics from "@/components/GoogleAnalytics";

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
  metadataBase: new URL('https://empowertreatment.com'),
  title: {
    default: 'Empower Treatment | Outpatient Mental Health & Addiction Treatment in Ohio',
    template: '%s | Empower Treatment'
  },
  description: 'Comprehensive outpatient mental health and addiction treatment in Ohio. Specializing in substance use disorders, depression, anxiety, and teen therapy. Accepting most insurance.',
  keywords: ['mental health treatment', 'addiction treatment', 'outpatient therapy', 'substance abuse treatment', 'teen therapy', 'Ohio mental health', 'Suboxone treatment', 'MAT program', 'depression treatment', 'anxiety therapy'],
  authors: [{ name: 'Empower Treatment' }],
  creator: 'Empower Treatment',
  publisher: 'Empower Treatment',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  icons: {
    icon: '/favicon-et.png',
    shortcut: '/favicon-et.png',
    apple: '/favicon-et.png',
  },
  manifest: '/manifest.json',
  openGraph: {
    type: 'website',
    siteName: 'Empower Treatment',
    title: 'Empower Treatment | Outpatient Mental Health & Addiction Treatment',
    description: 'Comprehensive outpatient mental health and addiction treatment in Ohio. Specializing in substance use disorders, depression, anxiety, and teen therapy.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Empower Treatment - Mental Health and Addiction Treatment Center',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Empower Treatment | Mental Health & Addiction Treatment',
    description: 'Comprehensive outpatient treatment in Ohio. Specializing in substance use, depression, anxiety, and teen therapy.',
    images: ['/og-image.jpg'],
  },
  verification: {
    google: 'google-site-verification-code',
    yandex: 'yandex-verification-code',
    yahoo: 'yahoo-verification-code',
  },
  alternates: {
    canonical: 'https://empowertreatment.com',
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <TreatmentCenterSchema />
        <FAQSchema />
        <GoogleAnalytics />
      </head>
      <body className={`${lineSeedSans.variable} ${lineSeedSans.className}`}>
        <SmoothScrollProvider>
          <ScrollToTop />
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