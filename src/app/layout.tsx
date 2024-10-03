import ReactQueryClientProvider from '@/lib/providers/react-query-client-provider';
import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Pokemon App',
  description: 'Get pokemon cards information',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ReactQueryClientProvider>
      <html lang="fr">
        <body className={inter.className}>
          <main className="block min-h-screen">{children}</main>
        </body>
      </html>
    </ReactQueryClientProvider>
  );
}
