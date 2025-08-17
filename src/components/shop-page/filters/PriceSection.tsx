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
  const { setMinPrice, setMaxPrice } = useFilters();
  return (
    <Accordion type='single' collapsible defaultValue='filter-price'>
      <AccordionItem value='filter-price' className='border-none'>
        <AccordionTrigger className='p-0 py-0.5 text-xl font-bold text-black hover:no-underline'>
          Price
        </AccordionTrigger>
        <AccordionContent className='pt-4' contentClassName='overflow-visible'>
          <Slider
            defaultValue={[50, 200]}
            min={0}
            max={250}
            step={1}
            label='₹'
            onValueCommit={([min, max]) => {
              setMinPrice(min);
              setMaxPrice(max);
            }}
          />
          <div className='mb-3' />
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default PriceSection;
