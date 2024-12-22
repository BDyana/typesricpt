import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import Providers from '@/context/providers';
import { extractRouterConfig } from 'uploadthing/server';
import { ourFileRouter } from './api/uploadthing/core';
import { NextSSRPlugin } from '@uploadthing/react/next-ssr-plugin';
import { Analytics } from '@vercel/analytics/react';

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

export const metadata: Metadata = {
  title: 'BDyana.com | Dream Comes True',
  description: 'crafted and built by  @mosespace.com',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
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
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <NextSSRPlugin
          /**
           * The `extractRouterConfig` will extract **only** the route configs
           * from the router to prevent additional information from being
           * leaked to the client. The data passed to the client is the same
           * as if you were to fetch `/api/uploadthing` directly.
           */
          routerConfig={extractRouterConfig(ourFileRouter)}
        />
        <Providers>
          {children}
          <Analytics />
        </Providers>
      </body>
    </html>
  );
}
