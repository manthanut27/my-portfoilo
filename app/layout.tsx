import type { Metadata } from 'next';
import { Inter, Syne, Space_Mono } from 'next/font/google';
import './globals.css';
import { HiringManagerProvider } from '@/providers/HiringManagerProvider';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const syne = Syne({
  subsets: ['latin'],
  variable: '--font-syne',
  weight: ['400', '500', '600', '700', '800'],
  display: 'swap',
});

const spaceMono = Space_Mono({
  subsets: ['latin'],
  variable: '--font-space-mono',
  weight: ['400', '700'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Manthan Utekar — Full-Stack Developer',
  description:
    'Personal portfolio of Manthan Utekar. Full-stack developer building production-grade web apps with React, Node.js, and Supabase. Open to full-time roles.',
  keywords: [
    'Manthan Utekar',
    'Full-Stack Developer',
    'React',
    'Node.js',
    'Supabase',
    'Portfolio',
    'Frontend Developer',
    'Mumbai',
  ],
  authors: [{ name: 'Manthan Utekar' }],
  creator: 'Manthan Utekar',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://manthan.dev',
    title: 'Manthan Utekar — Full-Stack Developer',
    description:
      'Building production-grade web apps with React, Node.js, and Supabase. Check out my projects and get in touch.',
    siteName: 'Manthan Utekar Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Manthan Utekar — Full-Stack Developer',
    description:
      'Building production-grade web apps with React, Node.js, and Supabase.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${syne.variable} ${spaceMono.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              '@context': 'https://schema.org',
              '@type': 'Person',
              name: 'Manthan Utekar',
              jobTitle: 'Full-Stack Developer',
              url: 'https://manthan.dev',
              sameAs: [
                'https://github.com/manthanut27',
                'https://www.linkedin.com/in/utkmanthan',
              ],
              knowsAbout: [
                'React',
                'Node.js',
                'Next.js',
                'Supabase',
                'TypeScript',
                'Three.js',
              ],
            }),
          }}
        />
      </head>
      <body className={inter.className}>
        <HiringManagerProvider>
          {children}
        </HiringManagerProvider>
      </body>
    </html>
  );
}
