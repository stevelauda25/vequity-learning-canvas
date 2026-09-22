import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';
import './whiteboard.css';
import './client-updates.css';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin'],
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.SITE_ORIGIN || 'http://localhost:3000'),
  icons: { icon: '/favicon.svg' },
  openGraph: { title: 'Vequity — Exit Radar Learning Canvas', description: 'A connected guide to the product. Explore the PRD, user journeys, and interactive wireframes.', type: 'website', images: [{ url: '/og.png', width: 1734, height: 907, alt: 'Vequity Exit Radar — A connected guide to the product' }] },
  twitter: { card: 'summary_large_image', title: 'Vequity — Exit Radar Learning Canvas', description: 'A connected guide to the product. Explore the PRD, user journeys, and interactive wireframes.', images: ['/og.png'] },
  title: 'Vequity — Exit Radar Learning Canvas',
  description: 'An interactive field guide to Exit Radar: the people, the product, the rules, and the wireframes.',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
