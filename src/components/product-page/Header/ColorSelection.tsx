'use client';

import { Color } from '@/types/product.types';
import { cn } from '@/lib/utils';
import React from 'react';
import { IoMdCheckmark } from 'react-icons/io';

type ColorSelectionProps = {
  colors: Color[];
  selectedColor: Color;
  onColorChange: (color: Color) => void;
};

const ColorSelection = ({
  colors,
  selectedColor,
  onColorChange
}: ColorSelectionProps) => {
  if (!colors || colors.length === 0) {
    return null;
  }

  return (
    <div className='flex flex-col'>
      <div className='flex flex-wrap items-center gap-3 sm:gap-4'>
        {colors.map((color: Color) => (
          <button
            key={color.name}
            type='button'
            className={cn(
              'flex h-9 w-9 items-center justify-center rounded-full border-2 sm:h-10 sm:w-10',
              selectedColor.name === color.name
                ? 'border-black'
                : 'border-transparent',
              color.code
            )}
            onClick={() => onColorChange(color)}
            title={color.name}
          >
            {selectedColor.name === color.name && (
              <IoMdCheckmark className='text-base text-white' />
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default ColorSelection;
