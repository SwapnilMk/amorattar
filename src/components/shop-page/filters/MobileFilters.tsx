import React from 'react';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger
} from '@/components/ui/drawer';
import { FiSliders } from 'react-icons/fi';
import Filters from '.';
import { useFilters } from './FiltersContext';

const MobileFilters = () => {
  const filters = useFilters();
  return (
    <>
      <Drawer>
        <DrawerTrigger asChild>
          <button
            type='button'
            className='h-8 w-8 rounded-full bg-[#F0F0F0] p-1 text-black md:hidden'
          >
            <FiSliders className='mx-auto text-base' />
          </button>
        </DrawerTrigger>
        <DrawerContent className='max-h-[90%]'>
          <DrawerHeader>
            <div className='flex items-center justify-between'>
              <span className='text-xl font-bold text-black'>Filters</span>
              <FiSliders className='text-2xl text-black/40' />
            </div>
            <DrawerTitle className='hidden'>filters</DrawerTitle>
            <DrawerDescription className='hidden'>filters</DrawerDescription>
          </DrawerHeader>
          <div className='max-h-[90%] w-full space-y-5 overflow-y-auto px-5 py-5 md:space-y-6 md:px-6'>
            <Filters onApply={() => {}} />
          </div>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export default MobileFilters;
