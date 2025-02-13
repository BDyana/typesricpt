import Providers from '@/context/providers';
import { NextSSRPlugin } from '@uploadthing/react/next-ssr-plugin';
import { Analytics } from '@vercel/analytics/react';
import localFont from 'next/font/local';
import { extractRouterConfig } from 'uploadthing/server';
import { ourFileRouter } from './api/uploadthing/core';
import './globals.css';

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  weight: '100 900',
});
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  weight: '100 900',
});
const SegoeUI = localFont({
  src: './fonts/SegoeUI.woff',
  variable: '--font-segoe-ui',
});

export const metadata = {
  metadataBase: new URL('https://Kyajastoreug.com'),
  title: {
    default: 'BDyana | Where Trends Are Born',
    template: '%s | BDyana',
  },
  description:
    "Discover a wide range of quality products at BDyana where trends are born, located in Bangladesh.. Explore our extensive collection, including fashion, beauty products, and more. From the latest beauty products to trendy fashion, we've got it all. Call us at +880 01511-309 309 for personalized assistance and unbeatable deals.",
  applicationName: 'BDyana',
  keywords: [
    'BDyana Store',
    'Bangladesh Town Center',
    'electronics',
    'fashion',
    'gadgets',
    'trendy fashion',
    'personalized assistance',
    'unbeatable deals',
    'one-stop shop',
    'quality products',
    'tech accessories',
    'home appliances',
    'affordable fashion',
    'student discounts',
    'local business',
    'convenient shopping',
    'online store',
    'best prices',
    'customer satisfaction',
    'top brands',
    'latest trends',
  ],
  authors: [{ name: 'Md. Roshidul Hasan', url: 'https://www.bdyana.com' }],
  creator: 'BDyana Developer Team | Affordable Software developer',
  publisher: 'BDyana Developer Team | Affordable Software developer',
  openGraph: {
    title: {
      default:
        'BDyana | Where Trends Are Born - Your One-Stop Shop for All Your Needs',
      template: '%s | BDyana Store',
    },
    description:
      "Discover a wide range of quality products at BDyana Store, located in Bangladeshi. Explore our extensive collection, including fashion, electronics, and more. From the latest gadgets to trendy fashion, we've got it all. Call us at +880 01511-309 309 for personalized assistance and unbeatable deals.",
    url: 'http://bdyana.com',
    siteName: 'BDyana store',
    type: 'website',
    local: 'en_us',
    images: [
      {
        url: 'https://www.bdyana.com/opengraph-image.png',
        width: 800,
        height: 600,
        alt: 'BDyana | Where Trends Are Born',
      },
    ],
    locale: 'en_US',
  },
  alternates: {
    canonical: '/',
    languages: ['en'],
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
        {/* Google Tag Manager */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','GTM-T5GV6KQX');
            `,
          }}
        />
        {/* Other Meta Tags */}
        <meta
          name="facebook-domain-verification"
          content="pzi59zqi0qrjrv2rbtdiflwivnynhz"
        />
        <meta
          name="google-site-verification"
          content="MZrG05ej8tcAbK1d7W9RCA9JTHIG5Z8zdz_EHKMycfI"
        />
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${SegoeUI.variable} antialiased`}
      >
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-T5GV6KQX"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          ></iframe>
        </noscript>
        <NextSSRPlugin routerConfig={extractRouterConfig(ourFileRouter)} />
        <Providers>
          {children}
          <Analytics />
        </Providers>
      </body>
    </html>
  );
}
