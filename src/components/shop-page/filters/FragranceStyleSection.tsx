import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';
import Link from 'next/link';
import { MdKeyboardArrowRight } from 'react-icons/md';
import { useFilters } from './FiltersContext';

type FragranceStyle = {
  title: string;
  slug: string;
};

const fragranceStylesData: FragranceStyle[] = [
  {
    title: 'Floral',
    slug: '/shop?style=floral'
  },
  {
    title: 'Woody',
    slug: '/shop?style=woody'
  },
  {
    title: 'Citrus',
    slug: '/shop?style=citrus'
  },
  {
    title: 'Oriental',
    slug: '/shop?style=oriental'
  }
];

const FragranceStyleSection = () => {
  const { setStyle } = useFilters();
  return (
    <Accordion type='single' collapsible defaultValue='filter-style'>
      <AccordionItem value='filter-style' className='border-none'>
        <AccordionTrigger className='p-0 py-0.5 text-xl font-bold text-black hover:no-underline'>
          Fragrance Style
        </AccordionTrigger>
        <AccordionContent className='pb-0 pt-4'>
          <div className='flex flex-col space-y-0.5 text-black/60'>
            {fragranceStylesData.map((fStyle, idx) => (
              <Link
                key={idx}
                href={fStyle.slug}
                className='flex items-center justify-between py-2 transition-colors hover:text-black'
                onClick={() =>
                  setStyle(
                    new URL(fStyle.slug, 'http://dummy').searchParams.get(
                      'style'
                    )
                  )
                }
              >
                {fStyle.title} <MdKeyboardArrowRight />
              </Link>
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
};

export default FragranceStyleSection;
