import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';
import { MdKeyboardArrowRight } from 'react-icons/md';
import { useFilters } from './FiltersContext';
import { cn } from '@/lib/utils';

const FragranceStyleSection = () => {
  const { style, setStyle, availableOptions, loadingOptions } = useFilters();

  if (loadingOptions || !availableOptions) {
    return (
      <div className='flex flex-col gap-2 pt-4'>
        {[1, 2, 3].map((i) => (
          <div key={i} className='h-8 w-full animate-pulse rounded bg-gray-200' />
        ))}
      </div>
    );
  }

  return (
    <Accordion type='single' collapsible>
      <AccordionItem value='filter-style' className='border-none'>
        <AccordionTrigger className='p-0 py-0.5 text-xl font-bold text-black hover:no-underline'>
          Fragrance Style
        </AccordionTrigger>
        <AccordionContent className='pb-0 pt-4'>
          <div className='flex flex-col space-y-0.5 text-black/60'>
            {availableOptions.fragrances.map((fStyle, idx) => (
              <button
                key={idx}
                type='button'
                className={cn(
                  'flex items-center justify-between py-2 transition-colors hover:text-black',
                  style === fStyle.toLowerCase() ? 'font-bold text-black' : ''
                )}
                onClick={() =>
                  setStyle(fStyle.toLowerCase() === style ? null : fStyle.toLowerCase())
                }
              >
                {fStyle} <MdKeyboardArrowRight />
              </button>
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default FragranceStyleSection;
