import React from 'react';
import { useFilters } from './FiltersContext';
import { MdKeyboardArrowRight } from 'react-icons/md';
import { cn } from '@/lib/utils';

const CategoriesSection = () => {
  const { category: currentCategory, setCategory, availableOptions, loadingOptions } = useFilters();

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
    <div className='flex flex-col space-y-0.5 text-black/60'>
      {availableOptions.categories.map((category, idx) => (
        <button
          key={idx}
          type='button'
          className={cn(
            'flex items-center justify-between py-2 transition-colors hover:text-black',
            currentCategory === category.toLowerCase().replace(/ /g, '-') ? 'font-bold text-black' : ''
          )}
          onClick={() =>
            setCategory(
              category.toLowerCase().replace(/ /g, '-') === currentCategory ? null : category.toLowerCase().replace(/ /g, '-')
            )
          }
        >
          {category} <MdKeyboardArrowRight />
        </button>
      ))}
    </div>
  );
};

export default CategoriesSection;
