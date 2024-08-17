import '@styles/globals';

import { ReactNode } from 'react';
import type { Metadata } from 'next';
import { Roboto } from 'next/font/google';

const roboto = Roboto({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-robot'
});

export const metadata: Metadata = {
  title: 'Dice Game',
  description: 'Dice Game description'
};

export default function RootLayout({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  return (
    <html lang='en'>
      <body className={roboto.className}>{children}</body>
    </html>
  );
}
