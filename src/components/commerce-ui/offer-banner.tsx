'use client';
import React from 'react';
import Link from 'next/link';
import { Sparkles } from 'lucide-react';

function OfferBanner() {
  return (
    <div className='relative w-full overflow-hidden rounded-lg bg-gradient-to-r from-[#273F4F] to-[#273F4F]/90 px-6 py-5 text-white shadow-lg'>
      <div className='absolute inset-0 overflow-hidden'>
        <div className='absolute -left-20 -top-20 h-48 w-48 animate-pulse rounded-full bg-white opacity-10'></div>
        <div className='absolute right-10 top-5 h-20 w-20 animate-bounce rounded-full bg-white opacity-10 delay-300'></div>
        <div className='absolute bottom-4 left-1/3 h-24 w-24 animate-ping rounded-full bg-white opacity-10 [animation-duration:3s]'></div>
        <div className='absolute -bottom-10 -right-10 h-40 w-40 animate-pulse rounded-full bg-white opacity-10 delay-700'></div>
      </div>

      <div className='relative z-10 flex flex-col items-center justify-between gap-4 md:flex-row'>
        <div className='flex items-center justify-center gap-4 text-center md:justify-start md:text-left'>
          <div className='hidden animate-spin [animation-duration:8s] md:block'>
            <Sparkles className='h-10 w-10 text-[#F9CB43]' />
          </div>
          <div className='space-y-1'>
            <span className='inline-flex rounded-md bg-[#F9CB43] px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[#273F4F]'>
              10% OFF FOR EVERYTHING
            </span>
            <h3 className='text-center text-lg font-semibold md:text-left md:text-xl'>
              Adding new Perfumes every week for our lovely customers ✨️🛍
            </h3>
            <p className='text-sm text-white/90'>
              New scents drop weekly — discover fresh arrivals
            </p>
          </div>
        </div>
        <Link
          href='/shop'
          className='inline-flex items-center rounded-md bg-[#F9CB43] px-5 py-2.5 font-medium text-[#273F4F] transition-colors hover:bg-[#F9CB43]/90'
        >
          Shop Now
        </Link>
      </div>
    </div>
  );
}

export default OfferBanner;
