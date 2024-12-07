import type { Metadata } from 'next';
import localFont from 'next/font/local';
import './globals.css';
import Providers from '@/context/providers';

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

export const metadata: Metadata = {
  title: 'Bdyana.com | Your Gate Way Shopping',
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
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
