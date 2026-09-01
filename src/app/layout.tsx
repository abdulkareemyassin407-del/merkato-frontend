import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Merkato - Wholesale Food Marketplace in Addis Ababa',
  description: 'Stock your restaurant, hotel, or shop with trusted wholesale Teff flour, cooking oil, lentils, and spices from verified Addis Ababa suppliers.',
  keywords: ['Merkato', 'Wholesale Ethiopia', 'Addis Ababa Food Wholesale', 'Teff Flour Wholesale', 'Cooking Oil Addis'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}