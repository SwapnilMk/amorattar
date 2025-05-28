import type { Metadata, Viewport } from 'next';
import '@/styles/globals.css';
import { satoshi } from '@/styles/fonts';
import Providers from './(user)/providers';
import SessionProvider from '@/components/providers/SessionProvider';
import { getSession } from '@/lib/auth';

export const metadata: Metadata = {
  title: 'amorattar',
  description: 'Premium attar and perfume shop',
  manifest: '/favicon/site.webmanifest',
  icons: {
    icon: [
      { url: '/favicon/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/favicon/favicon-32x32.png', sizes: '32x32', type: 'image/png' }
    ],
    shortcut: '/favicon/favicon.ico',
    apple: '/favicon/apple-touch-icon.png',
    other: [
      {
        rel: 'android-chrome-192x192',
        url: '/favicon/android-chrome-192x192.png'
      },
      {
        rel: 'android-chrome-512x512',
        url: '/favicon/android-chrome-512x512.png'
      }
    ]
  },
  appleWebApp: {
    capable: true,
    statusBarStyle: 'default',
    title: 'Amorattar'
  },
  applicationName: 'Amorattar',
  formatDetection: {
    telephone: false
  }
};

export const viewport: Viewport = {
  themeColor: '#000000',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false
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
