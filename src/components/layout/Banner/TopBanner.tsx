'use client';

import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { hideBanner } from '@/lib/features/banner/bannerSlice';
import { RootState } from '@/lib/store';

const TopBanner = () => {
  const dispatch = useDispatch();
  const isVisible = useSelector((state: RootState) => state.banner.isVisible);

  const handleClose = () => {
    dispatch(hideBanner());
  };

  if (!isVisible) return null;

  return (
    <div className='bg-[#F9CB43] px-2 py-2 text-center text-black sm:px-4 xl:px-0'>
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
          onClick={handleClose}
        >
          <Image
            priority
            src='/icons/times.svg'
            height={13}
            width={13}
            alt='close banner'
            className='[filter:brightness(0)]'
          />
        </Button>
      </div>
    </div>
  );
};

export default TopBanner;
