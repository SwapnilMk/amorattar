// src/components/layout/SizeSection.tsx
'use client';

import React, { useState } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';
import { cn } from '@/lib/utils';
import { useFilters } from './FiltersContext';

const SizeSection = () => {
  const { sizeMl, setSizeMl, availableOptions, loadingOptions } = useFilters();

  if (loadingOptions || !availableOptions) {
    return (
      <div className='flex flex-wrap gap-2 pt-4'>
        {[1, 2, 3, 4].map((i) => (
          <div key={i} className='h-10 w-16 animate-pulse rounded-full bg-gray-200' />
        ))}
      </div>
    );
  }

  return (
    <Accordion type='single' collapsible>
      <AccordionItem value='filter-size' className='border-none'>
        <AccordionTrigger className='p-0 py-0.5 text-xl font-bold text-black hover:no-underline'>
          Bottle Size
        </AccordionTrigger>
        <AccordionContent className='pb-0 pt-4'>
          <div className='flex flex-wrap items-center'>
            {availableOptions.sizes.map((size, index) => (
              <button
                key={index}
                type='button'
                className={cn([
                  'm-1 flex max-h-[39px] items-center justify-center rounded-full bg-[#F9CB43]/20 px-5 py-2.5 text-sm transition-all duration-300',
                  sizeMl === size
                    ? 'bg-[#F9CB43] font-medium text-black'
                    : 'hover:bg-[#F9CB43]/30'
                ])}
                onClick={() => {
                  setSizeMl(size === sizeMl ? null : size);
                }}
              >
                {size}ml
              </button>
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default SizeSection;
