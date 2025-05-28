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

const SizeSection = () => {
  const [selected, setSelected] = useState<string>('30ml');

  return (
    <Accordion type='single' collapsible defaultValue='filter-size'>
      <AccordionItem value='filter-size' className='border-none'>
        <AccordionTrigger className='p-0 py-0.5 text-xl font-bold text-black hover:no-underline'>
          Bottle Size
        </AccordionTrigger>
        <AccordionContent className='pb-0 pt-4'>
          <div className='flex flex-wrap items-center'>
            {[
              '3ml', // Common for attar samples
              '10ml', // Travel or roll-on size
              '30ml', // Standard perfume size
              '50ml', // Mid-range option
              '100ml' // Full-size bottle
            ].map((size, index) => (
              <button
                key={index}
                type='button'
                className={cn([
                  'm-1 flex max-h-[39px] items-center justify-center rounded-full bg-[#F9CB43]/20 px-5 py-2.5 text-sm transition-all duration-300',
                  selected === size
                    ? 'bg-[#F9CB43] font-medium text-black'
                    : 'hover:bg-[#F9CB43]/30'
                ])}
                onClick={() => setSelected(size)}
              >
                {size}
              </button>
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default SizeSection;
