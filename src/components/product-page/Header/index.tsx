'use client';

import React, { useState } from 'react';
import PhotoSection from './PhotoSection';
import { Product, Color } from '@/types/product.types';
import { integralCF } from '@/styles/fonts';
import { cn } from '@/lib/utils';
import Rating from '@/components/ui/Rating';
import AddToCardSection from './AddToCardSection';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import VariantColorSelectorBasic from './ColorSelection';
import { Separator } from '@/components/ui/separator';

const Header = ({ data }: { data: Product }) => {
  const [selectedVolume, setSelectedVolume] = useState(data.volumeOptions[0]);
  const [selectedColor, setSelectedColor] = useState<Color>(data.selectedColor);

  const handleVolumeChange = (ml: number) => {
    const volume = data.volumeOptions.find((v) => v.ml === ml);
    if (volume) {
      setSelectedVolume(volume);
    }
  };

  return (
    <>
      <div className='grid grid-cols-1 gap-5 md:grid-cols-2'>
        <div>
          <PhotoSection data={{ ...data, srcUrl: data.srcUrl }} />
        </div>
        <div>
          {/* Brand */}
          <div className='mb-2 text-sm text-gray-600'>{data.brand}</div>

          {/* Categories */}
          <div className='mb-3 flex flex-wrap gap-2'>
            {data.categories.map((category) => (
              <Link
                key={category.id}
                href={`/shop?category=${category.category.slug}`}
                className='no-underline'
              >
                <Badge
                  variant='outline'
                  className={cn(
                    'px-3 py-1 text-sm capitalize transition-colors hover:bg-black hover:text-white',
                    {
                      'bg-blue-50 text-blue-700':
                        category.category.name === 'Perfumes',
                      'bg-amber-50 text-amber-700':
                        category.category.name === 'Attars',
                      'bg-green-50 text-green-700':
                        category.category.name === 'New Arrivals',
                      'bg-purple-50 text-purple-700':
                        category.category.name === 'Best Sellers'
                    }
                  )}
                >
                  {category.category.name}
                </Badge>
              </Link>
            ))}
          </div>

          <h1
            className={cn([
              integralCF.className,
              'mb-3 text-2xl capitalize md:mb-3.5 md:text-[40px] md:leading-[40px]'
            ])}
          >
            {data.title}
          </h1>

          {/* Rating */}
          <div className='mb-3 flex items-center sm:mb-3.5'>
            <Rating
              initialValue={data.rating}
              allowFraction
              SVGclassName='inline-block'
              emptyClassName='fill-gray-50'
              size={25}
              readonly
            />
            <span className='ml-[11px] pb-0.5 text-xs text-black sm:ml-[13px] sm:pb-0 sm:text-sm'>
              {data.rating.toFixed(1)}
              <span className='text-black/60'>/5</span>
            </span>
          </div>

          {/* Price and Discount */}
          <div className='mb-5 flex items-center space-x-2.5 sm:space-x-3'>
            <span className='text-2xl font-bold text-black sm:text-[32px]'>
              ₹{selectedVolume.price}
            </span>
            {data.discount > 0 && (
              <span className='text-2xl font-bold text-black/40 line-through sm:text-[32px]'>
                ₹{data.price}
              </span>
            )}
            {data.discount > 0 && (
              <span className='rounded-full bg-[#FF3333]/10 px-3.5 py-1.5 text-[10px] font-medium text-[#FF3333] sm:text-xs'>
                {`-${data.discount}%`}
              </span>
            )}
            {data.isSale && (
              <span className='rounded-full bg-green-500/10 px-3.5 py-1.5 text-[10px] font-medium text-green-500 sm:text-xs'>
                Sale
              </span>
            )}
          </div>

          {/* Gender and Availability */}
          <div className='mb-5 flex flex-wrap gap-2'>
            {data.gender.map((gender) => (
              <Badge
                key={gender}
                variant='outline'
                className={cn('px-3 py-1 text-sm', {
                  'bg-blue-100 text-blue-800': gender === 'Men',
                  'bg-pink-100 text-pink-800': gender === 'Women',
                  'bg-purple-100 text-purple-800': gender === 'Unisex'
                })}
              >
                {gender}
              </Badge>
            ))}
            <Badge
              variant='outline'
              className={cn(
                'px-3 py-1 text-sm',
                data.availabilityStatus === 'In Stock' &&
                  'bg-green-100 text-green-800',
                data.availabilityStatus === 'Out of Stock' &&
                  'bg-red-100 text-red-800',
                data.availabilityStatus === 'Low Stock' &&
                  'bg-yellow-100 text-yellow-800',
                data.availabilityStatus === 'Pre-Order' &&
                  'bg-blue-100 text-blue-800'
              )}
            >
              {data.availabilityStatus}
            </Badge>
          </div>

          {/* Fragrance Types */}
          <div className='mb-5'>
            <h3 className='mb-2 text-sm font-medium'>Fragrance</h3>
            <div className='flex flex-wrap gap-2'>
              {data.fragrance.map((type) => (
                <Badge
                  key={type}
                  variant='outline'
                  className='bg-gray-100 px-3 py-1 text-sm text-gray-800'
                >
                  {type}
                </Badge>
              ))}
            </div>
          </div>

          <p className='mb-5 text-sm text-black/60 sm:text-base'>
            {data.description}
          </p>

          <Separator className='mb-5' />

          {/* Color Selection */}
          <div className='mb-5'>
            <h3 className='mb-3 text-sm font-medium'>Available Colors</h3>
            <VariantColorSelectorBasic
              value={selectedColor}
              onValueChange={setSelectedColor}
              variants={data.colors}
            />
          </div>

          <Separator className='my-5' />

          {/* Volume Selection */}
          <div className='mb-5'>
            <h3 className='mb-3 text-sm font-medium'>Select Volume</h3>
            <div className='flex gap-2'>
              {data.volumeOptions.map((option) => (
                <button
                  key={option.ml}
                  onClick={() => handleVolumeChange(option.ml)}
                  className={cn(
                    'rounded-full border px-4 py-2 text-sm transition-colors',
                    selectedVolume.ml === option.ml
                      ? 'border-[#334958] bg-[#334958] text-white'
                      : 'border-gray-200 hover:border-[#334958] hover:text-[#334958]'
                  )}
                >
                  {option.ml}ml
                </button>
              ))}
            </div>
          </div>

          <Separator className='my-5' />

          {/* Action Buttons - Desktop */}
          <div className='hidden md:flex md:gap-3'>
            <AddToCardSection data={data} />
          </div>
        </div>
      </div>

      {/* Action Buttons - Mobile (Sticky) */}
      <div className='fixed bottom-0 left-0 z-50 w-full border-t border-black/5 bg-white p-4 md:hidden'>
        <AddToCardSection data={data} />
      </div>
    </>
  );
};

export default Header;
