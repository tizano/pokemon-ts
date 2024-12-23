import { Footer } from '@/components/footer/footer';
import { DialogProvider } from '@/components/providers/dialog-provider';
import ReactQueryClientProvider from '@/components/providers/react-query-client-provider';
import { Toaster } from '@/components/ui/toaster';
import type { Metadata } from 'next';
import { Poppins } from 'next/font/google';

import { Header } from '@/components/header/header';
import { ScrollTop } from '@/components/scroll-top/scroll-top';
import './globals.css';

const inter = Poppins({ weight: ['400', '600', '700'], subsets: ['latin'] });

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
    <html lang="fr">
      <body className={`${inter.className} relative`}>
        <ReactQueryClientProvider>
          <DialogProvider>
            <ScrollTop />
            <div className="absolute z-10 pointer-events-none bottom-0 -left-[5vw] -right-[5vw] top-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:270px_104px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]"></div>
            <Header className="z-20" />
            <main className="relative min-h-screen bg-pokemon-bg-900 pt-[120px]">
              {children}
              <Toaster />
            </main>
            <Footer />
          </DialogProvider>
        </ReactQueryClientProvider>
      </body>
    </html>
  );
}
