'use client';

import { setSizeSelection } from '@/lib/features/products/productsSlice';
import { useAppDispatch, useAppSelector } from '@/lib/hooks/redux';
import { RootState } from '@/lib/store';
import { cn } from '@/lib/utils';
import React from 'react';

const SizeSelection = () => {
  const { sizeSelection } = useAppSelector(
    (state: RootState) => state.products
  );
  const dispatch = useAppDispatch();

  return (
    <div className='flex flex-col'>
      <span className='mb-4 text-sm text-black/60 sm:text-base'>
        Choose Size
      </span>
      <div className='flex flex-wrap items-center lg:space-x-3'>
        {['Small', 'Medium', 'Large', 'X-Large'].map((size, index) => (
          <button
            key={index}
            type='button'
            className={cn([
              'm-1 flex max-h-[46px] items-center justify-center rounded-full bg-[#F0F0F0] px-5 py-2.5 text-sm lg:m-0 lg:px-6 lg:py-3 lg:text-base',
              sizeSelection === size && 'bg-black font-medium text-white'
            ])}
            onClick={() => dispatch(setSizeSelection(size))}
          >
            {size}
          </button>
        ))}
      </div>
    </div>
  );
};

export default SizeSelection;
