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
  const [selected, setSelected] = useState<string>('bg-green-600');
  const { setColorLabel } = useFilters();

  return (
    <Accordion type='single' collapsible defaultValue='filter-colors'>
      <AccordionItem value='filter-colors' className='border-none'>
        <AccordionTrigger className='p-0 py-0.5 text-xl font-bold text-black hover:no-underline'>
          Colors
        </AccordionTrigger>
        <AccordionContent className='pb-0 pt-4'>
          <div className='space-2.5 flex grid-cols-5 flex-wrap gap-2.5 md:grid'>
            {[
              'bg-green-600',
              'bg-red-600',
              'bg-yellow-300',
              'bg-orange-600',
              'bg-cyan-400',
              'bg-blue-600',
              'bg-purple-600',
              'bg-pink-600',
              'bg-white',
              'bg-black'
            ].map((color, index) => (
              <button
                key={index}
                type='button'
                className={cn([
                  color,
                  'flex h-9 w-9 items-center justify-center rounded-full border border-black/20 sm:h-10 sm:w-10'
                ])}
                onClick={() => {
                  setSelected(color);
                  // map tailwind bg class to a generic color label for filtering
                  const label = color
                    .replace('bg-', '')
                    .replace('-600', '')
                    .replace('-300', '');
                  setColorLabel(label);
                }}
              >
                {selected === color && (
                  <IoMdCheckmark className='text-base text-white' />
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
