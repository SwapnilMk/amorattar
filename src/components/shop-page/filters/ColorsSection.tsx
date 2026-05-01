'use client';

import React, { useState } from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';
import { IoMdCheckmark } from 'react-icons/io';
import { cn } from '@/lib/utils';
import { useFilters } from './FiltersContext';

const ColorsSection = () => {
  const { colorLabel, setColorLabel, availableOptions, loadingOptions } = useFilters();

  if (loadingOptions || !availableOptions) {
    return (
      <div className='flex flex-wrap gap-2 pt-4'>
        {[1, 2, 3, 4, 5].map((i) => (
          <div key={i} className='h-9 w-9 animate-pulse rounded-full bg-gray-200 sm:h-10 sm:w-10' />
        ))}
      </div>
    );
  }

  return (
    <Accordion type='single' collapsible>
      <AccordionItem value='filter-colors' className='border-none'>
        <AccordionTrigger className='p-0 py-0.5 text-xl font-bold text-black hover:no-underline'>
          Colors
        </AccordionTrigger>
        <AccordionContent className='pb-0 pt-4'>
          <div className='space-2.5 flex grid-cols-5 flex-wrap gap-2.5 md:grid'>
            {availableOptions.colors.map((color, index) => (
              <button
                key={index}
                type='button'
                title={color.label}
                className={cn([
                  'flex h-9 w-9 items-center justify-center rounded-full border border-black/20 sm:h-10 sm:w-10'
                ])}
                style={{ backgroundColor: color.color }}
                onClick={() => {
                  setColorLabel(color.label === colorLabel ? null : color.label);
                }}
              >
                {colorLabel === color.label && (
                  <IoMdCheckmark className={cn('text-base', 
                    ['white', '#ffffff', '#fff'].includes(color.color.toLowerCase()) ? 'text-black' : 'text-white'
                  )} />
                )}
              </button>
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default ColorsSection;
