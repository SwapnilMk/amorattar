import type { Metadata, Viewport } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Page Not Found',
  description: 'The page you are looking for does not exist.'
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false
};

export default function NotFound() {
  return (
    <div className='flex min-h-screen flex-col items-center justify-center'>
      <h2 className='text-2xl font-bold'>Page Not Found</h2>
      <p className='mt-2 text-gray-600'>
        The page you are looking for does not exist.
      </p>
      <Link href='/' className='mt-4 text-blue-600 hover:underline'>
        Return Home
      </Link>
    </div>
  );
}
