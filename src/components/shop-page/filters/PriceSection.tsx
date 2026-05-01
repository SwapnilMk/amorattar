import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';
import { Slider } from '@/components/ui/slider';
import { useFilters } from './FiltersContext';

const PriceSection = () => {
  const { setMinPrice, setMaxPrice, availableOptions, loadingOptions } = useFilters();

  if (loadingOptions || !availableOptions) {
    return (
      <div className='space-y-4 pt-4'>
        <div className='h-4 w-full animate-pulse rounded bg-gray-200' />
        <div className='flex justify-between'>
          <div className='h-4 w-10 animate-pulse rounded bg-gray-200' />
          <div className='h-4 w-10 animate-pulse rounded bg-gray-200' />
        </div>
      </div>
    );
  }

  const { min, max } = availableOptions.priceRange;

  return (
    <Accordion type='single' collapsible>
      <AccordionItem value='filter-price' className='border-none'>
        <AccordionTrigger className='p-0 py-0.5 text-xl font-bold text-black hover:no-underline'>
          Price
        </AccordionTrigger>
        <AccordionContent className='pt-4' contentClassName='overflow-visible'>
          <Slider
            defaultValue={[min, max]}
            min={min}
            max={max}
            step={1}
            label='₹'
            onValueCommit={([minVal, maxVal]) => {
              setMinPrice(minVal);
              setMaxPrice(maxVal);
            }}
          />
          <div className='mb-3' />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default PriceSection;
