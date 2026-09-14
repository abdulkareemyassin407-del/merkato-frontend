import type { Metadata } from 'next';
import './globals.css';
import Footer from './components/footer'; // Adjust path if your alias uses '@/app/components/footer'

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
      <body className="min-h-screen flex flex-col justify-between">
        <main className="flex-grow">{children}</main>
        <Footer lang="am" />
      </body>
    </html>
  );
}