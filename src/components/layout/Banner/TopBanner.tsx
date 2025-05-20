import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';

const TopBanner = () => {
  return (
    <div className='bg-black px-2 py-2 text-center text-white sm:px-4 xl:px-0'>
      <div className='relative mx-auto max-w-frame'>
        <p className='text-xs sm:text-sm'>
          Get 20% off to your first order.{' '}
          <Link href='/shop' className='font-medium underline'>
            Shop Now
          </Link>
        </p>
        <Button
          variant='ghost'
          className='absolute right-0 top-1/2 hidden h-fit w-fit -translate-y-1/2 p-1 hover:bg-transparent sm:flex'
          size='icon'
          type='button'
          aria-label='close banner'
        >
          <Image
            priority
            src='/icons/times.svg'
            height={13}
            width={13}
            alt='close banner'
          />
        </Button>
      </div>
    </div>
  );
};

export default TopBanner;
