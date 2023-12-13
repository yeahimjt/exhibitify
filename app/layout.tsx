import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import Providers from './ThemeProvider';
import { Toaster } from '@/components/ui/toaster';
const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Exhibitify',
  description:
    'Portfolio feedback, and showcase platform. Browse real-working, diverse portfolios for inspiration.',
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang='en'>
      <body className={inter.className}>
        <Providers>
          {/* <ThemeSwitcher /> */}
          {children}
          <Toaster />
        </Providers>
      </body>
    </html>
  );
}
