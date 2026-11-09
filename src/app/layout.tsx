import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL('https://albenroy.com'),
  title: 'Alben Roy — Premium Portrait & Editorial Photographer',
  description:
    'Visual portfolio of Alben Roy (@albenroy). Capturing people, light & moments across South India with natural light storytelling and cinematic editorial intimacy.',
  keywords: [
    'Alben Roy',
    'Photographer',
    'Portrait Photographer',
    'Editorial Photography',
    'Kerala Photographer',
    'Fort Kochi Photography',
    'Natural Light Photography',
  ],
  authors: [{ name: 'Alben Roy' }],
  openGraph: {
    title: 'Alben Roy — Premium Portrait & Editorial Photographer',
    description: 'Capturing people, light & moments.',
    url: 'https://albenroy.com',
    siteName: 'Alben Roy Portfolio',
    images: [
      {
        url: '/images/03_bougainvillea_backless.jpg',
        width: 700,
        height: 930,
        alt: 'Alben Roy Photography',
      },
    ],
    locale: 'en_US',
    type: 'website',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400&family=Plus+Jakarta+Sans:wght@300;400;500;600;700&family=JetBrains+Mono:wght@400;500&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-ivory text-charcoal antialiased selection:bg-gold selection:text-charcoal-950 font-sans">
        {children}
      </body>
    </html>
  );
}
