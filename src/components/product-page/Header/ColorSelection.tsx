'use client';

import * as React from 'react';
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group';
import { Circle } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Color } from '@/types/product.types';

interface VariantColorSelectorBasicProps {
  value: Color;
  onValueChange: (value: Color) => void;
  variants: Color[];
  className?: string;
}

const VariantColorSelectorBasic = ({
  className,
  onValueChange,
  value,
  variants
}: VariantColorSelectorBasicProps) => {
  return (
    <RadioGroupPrimitive.Root
      className={cn('flex flex-wrap gap-3', className)}
      value={value.id}
      onValueChange={(id) => {
        const selectedColor = variants.find((v) => v.id === id);
        if (selectedColor) {
          onValueChange(selectedColor);
        }
      }}
    >
      {variants.map((variant) => (
        <label
          key={variant.id}
          className='relative flex cursor-pointer flex-col items-center gap-2'
        >
          <RadioGroupPrimitive.Item
            value={variant.id}
            className={cn(
              'focus:outline-hidden aspect-square size-6 rounded-full border-2 ring-offset-background focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
              'has-data-[state=checked]:ring-4',
              'has-data-[state=checked]:border-0'
            )}
            style={{
              backgroundColor: variant.color,
              color: getContrastYIQ(variant.color)
            }}
          >
            <RadioGroupPrimitive.Indicator className='flex h-full items-center justify-center'>
              <Circle className='h-2.5 w-2.5 fill-current text-current' />
            </RadioGroupPrimitive.Indicator>
          </RadioGroupPrimitive.Item>
          <span className='text-sm font-medium leading-none text-foreground'>
            {variant.label}
          </span>
        </label>
      ))}
    </RadioGroupPrimitive.Root>
  );
};

export default VariantColorSelectorBasic;

/**
 * Choose the best color for text based on the background color
 * Supports HEX and RGB colors
 * @param color
 * @returns
 */
function getContrastYIQ(color: string) {
  let r, g, b;

  if (color.startsWith('#')) {
    // HEX color
    const hex = color.replace('#', '');
    r = parseInt(hex.substring(0, 2), 16);
    g = parseInt(hex.substring(2, 4), 16);
    b = parseInt(hex.substring(4, 6), 16);
  } else if (color.startsWith('rgb')) {
    // RGB color
    const rgbValues = color.match(/\d+/g);
    if (!rgbValues || rgbValues.length < 3) {
      return 'black'; // Default to black for invalid colors
    }
    r = parseInt(rgbValues[0], 10);
    g = parseInt(rgbValues[1], 10);
    b = parseInt(rgbValues[2], 10);
  } else {
    return 'black'; // Default to black for unknown colors
  }

  const yiq = (r * 299 + g * 587 + b * 114) / 1000;
  return yiq >= 128 ? 'black' : 'white';
}
