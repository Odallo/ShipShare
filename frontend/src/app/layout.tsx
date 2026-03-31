import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'ShipShare Kenya - Save Money by Shipping Together',
  description: 'Group shipping platform for Kenya. Combine shipments and save up to 40% on shipping costs.',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark:bg-gray-900">
      <body className={inter.className}>
        {children}
      </body>
    </html>
  );
}