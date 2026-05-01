'use client';

import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

const ProductSkeleton = () => {
  return (
    <div className='flex aspect-auto flex-col items-start rounded-lg border border-gray-100 p-4'>
      <div className='mb-2.5 aspect-square w-full overflow-hidden rounded-[13px] bg-[#F0EEED] lg:max-w-[295px] lg:rounded-[20px] xl:mb-4'>
        <Skeleton className='h-full w-full' />
      </div>
      <Skeleton className='mb-1 h-4 w-20' />
      <div className='mb-2 w-full'>
        <Skeleton className='h-6 w-3/4' />
      </div>
      <Skeleton className='mb-2 h-4 w-24' />
      <div className='mb-2 flex items-center space-x-2'>
        <Skeleton className='h-6 w-16' />
        <Skeleton className='h-6 w-16' />
        <Skeleton className='h-6 w-12' />
      </div>
      <div className='mt-auto flex w-full space-x-2'>
        <Skeleton className='h-10 flex-1 rounded-full' />
        <Skeleton className='h-10 w-10 rounded-full' />
      </div>
    </div>
  );
};

export default ProductSkeleton;
