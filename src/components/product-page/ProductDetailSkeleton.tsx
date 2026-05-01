'use client';

import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';
import { Separator } from '@/components/ui/separator';

const ProductDetailSkeleton = () => {
  return (
    <div className='mx-auto max-w-frame px-4 xl:px-0'>
      <div className='mb-5 h-[1px] border-t-black/10 sm:mb-6' />
      
      {/* Breadcrumb Skeleton */}
      <div className='mb-5 flex items-center space-x-2'>
        <Skeleton className='h-4 w-16' />
        <Skeleton className='h-4 w-4' />
        <Skeleton className='h-4 w-16' />
        <Skeleton className='h-4 w-4' />
        <Skeleton className='h-4 w-24' />
      </div>

      <div className='grid grid-cols-1 gap-5 md:grid-cols-2'>
        {/* Photo Section Skeleton */}
        <div className='flex flex-col-reverse gap-3 md:flex-row md:gap-4'>
          <div className='flex flex-row gap-3 overflow-x-auto md:flex-col md:overflow-y-auto'>
            {[1, 2, 3].map((i) => (
              <Skeleton key={i} className='h-[100px] w-[100px] shrink-0 rounded-xl md:h-[150px] md:w-[150px]' />
            ))}
          </div>
          <Skeleton className='aspect-square w-full rounded-2xl md:flex-1' />
        </div>

        {/* Info Section Skeleton */}
        <div>
          <Skeleton className='mb-2 h-4 w-20' /> {/* Brand */}
          <div className='mb-3 flex gap-2'>
            <Skeleton className='h-7 w-20 rounded-full' />
            <Skeleton className='h-7 w-20 rounded-full' />
          </div>
          <Skeleton className='mb-3 h-10 w-3/4' /> {/* Title */}
          
          <div className='mb-3 flex items-center space-x-2'>
            <Skeleton className='h-6 w-32' /> {/* Stars */}
            <Skeleton className='h-6 w-12' /> {/* Rating text */}
          </div>

          <div className='mb-5 flex items-center space-x-3'>
            <Skeleton className='h-10 w-24' /> {/* Price */}
            <Skeleton className='h-10 w-24' /> {/* Old Price */}
            <Skeleton className='h-10 w-16' /> {/* Discount */}
          </div>

          <div className='mb-5 flex gap-2'>
            <Skeleton className='h-7 w-16 rounded-full' />
            <Skeleton className='h-7 w-20 rounded-full' />
          </div>

          <div className='mb-5 space-y-2'>
            <Skeleton className='h-4 w-full' />
            <Skeleton className='h-4 w-full' />
            <Skeleton className='h-4 w-2/3' />
          </div>

          <Separator className='mb-5' />

          <div className='mb-5'>
            <Skeleton className='mb-3 h-5 w-32' />
            <div className='flex gap-2'>
              <Skeleton className='h-10 w-10 rounded-full' />
              <Skeleton className='h-10 w-10 rounded-full' />
              <Skeleton className='h-10 w-10 rounded-full' />
            </div>
          </div>

          <Separator className='my-5' />

          <div className='mb-5'>
            <Skeleton className='mb-3 h-5 w-32' />
            <div className='flex gap-2'>
              <Skeleton className='h-10 w-20 rounded-full' />
              <Skeleton className='h-10 w-20 rounded-full' />
            </div>
          </div>

          <Separator className='my-5' />

          <div className='flex gap-3'>
            <Skeleton className='h-14 flex-1 rounded-full' />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailSkeleton;
