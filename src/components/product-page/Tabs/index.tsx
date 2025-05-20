'use client';

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import React, { useState } from 'react';
import ProductDetailsContent from './ProductDetailsContent';
import ReviewsContent from './ReviewsContent';
import FaqContent from './FaqContent';
import { Product } from '@/types/product.types';

type TabBtn = {
  id: number;
  label: string;
};

type TabsProps = {
  data: Product;
};

const tabBtnData: TabBtn[] = [
  {
    id: 1,
    label: 'Product Details'
  },
  {
    id: 2,
    label: 'Rating & Reviews'
  },
  {
    id: 3,
    label: 'FAQs'
  }
];

const Tabs = ({ data }: TabsProps) => {
  const [active, setActive] = useState<number>(1);

  return (
    <div>
      <div className='mb-6 flex items-center overflow-x-auto sm:mb-8'>
        {tabBtnData.map((tab) => (
          <Button
            key={tab.id}
            variant='ghost'
            type='button'
            className={cn([
              active === tab.id
                ? 'border-b-2 border-black font-medium'
                : 'border-b border-black/10 font-normal text-black/60',
              'flex-1 rounded-none p-5 sm:p-6'
            ])}
            onClick={() => setActive(tab.id)}
          >
            {tab.label}
          </Button>
        ))}
      </div>
      <div className='mb-12 sm:mb-16'>
        {active === 1 && <ProductDetailsContent data={data} />}
        {active === 2 && <ReviewsContent />}
        {active === 3 && <FaqContent />}
      </div>
    </div>
  );
};

export default Tabs;
