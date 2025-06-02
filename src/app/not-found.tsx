'use client';

import { Button } from '@/components/ui/button';
import type { Metadata, Viewport } from 'next';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

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
  const router = useRouter();
  return (
    <section className='flex min-h-screen items-center justify-center bg-white font-serif'>
      <div className='container mx-auto'>
        <div className='flex justify-center'>
          <div className='w-full text-center sm:w-10/12 md:w-8/12'>
            <div
              className='h-[250px] bg-[url(https://cdn.dribbble.com/users/285475/screenshots/2083086/dribbble_1.gif)] bg-contain bg-center bg-no-repeat sm:h-[350px] md:h-[400px]'
              aria-hidden='true'
            >
              <h1 className='pt-6 text-center text-6xl text-black sm:pt-8 sm:text-7xl md:text-8xl'>
                404
              </h1>
            </div>

            <div className='mt-[-50px]'>
              <h3 className='mb-4 text-2xl font-bold text-black sm:text-3xl'>
                Look like you're lost
              </h3>
              <p className='mb-6 text-black sm:mb-5'>
                The page you are looking for is not available!
              </p>

              <Button
                variant='default'
                onClick={() => router.push('/')}
                className='my-5 bg-green-600 hover:bg-green-700'
              >
                Go to Home
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
