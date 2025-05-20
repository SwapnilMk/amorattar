import type { Metadata, Viewport } from 'next';
import '@/styles/globals.css';
import { satoshi } from '@/styles/fonts';
import Providers from './(user)/providers';
import SessionProvider from '@/components/providers/SessionProvider';
import { getSession } from '@/lib/auth';

export const metadata: Metadata = {
  title: 'amorattar',
  description: 'Premium attar and perfume shop'
};

export const viewport: Viewport = {
  themeColor: '#000000'
};

export default async function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  const session = await getSession();

  return (
    <html lang='en'>
      <body className={satoshi.className}>
        <SessionProvider user={session}>
          <Providers>{children}</Providers>
        </SessionProvider>
      </body>
    </html>
  );
}
