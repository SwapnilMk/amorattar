import React from 'react';
import CategoriesSection from '@/components/shop-page/filters/CategoriesSection';
import ColorsSection from '@/components/shop-page/filters/ColorsSection';
import DressStyleSection from '@/components/shop-page/filters/FragranceStyleSection';
import PriceSection from '@/components/shop-page/filters/PriceSection';
import SizeSection from '@/components/shop-page/filters/SizeSection';
import { Button } from '@/components/ui/button';
import { useFilters, FiltersProvider } from './FiltersContext';

const FiltersContent = ({ onApply }: { onApply?: () => void }) => {
  return (
    <>
      <hr className='border-t-black/10' />
      <CategoriesSection />
      <hr className='border-t-black/10' />
      <PriceSection />
      <hr className='border-t-black/10' />
      <ColorsSection />
      <hr className='border-t-black/10' />
      <SizeSection />
      <hr className='border-t-black/10' />
      <DressStyleSection />
      <Button
        type='button'
        className='group relative h-12 w-full overflow-hidden rounded-full bg-[#F9CB43] py-4 text-sm font-medium text-black transition-all duration-300 hover:bg-[#F9CB43]/90 hover:text-black'
        onClick={onApply}
      >
        <span className='relative z-10'>Apply Filter</span>
        <div className='absolute inset-0 -translate-x-full bg-white/20 transition-transform duration-300 group-hover:translate-x-0'></div>
      </Button>
    </>
  );
};

const Filters = ({ onApply }: { onApply?: () => void }) => {
  return (
    <FiltersProvider>
      <FiltersContent onApply={onApply} />
    </FiltersProvider>
  );
};

export default Filters;
