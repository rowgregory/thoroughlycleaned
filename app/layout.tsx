import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import './globals.css';
import './animations.css';
import PageWrapper from './page-wrapper';

const roboto = Roboto({ weight: ['400'], subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Thorougly Cleaned LLC',
  description: 'Commercial & Residential Cleaning Business',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={roboto.className}>
        <PageWrapper>{children}</PageWrapper>
      </body>
    </html>
  );
}
