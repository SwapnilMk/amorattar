'use client';

import React, { useState } from 'react';
import PhotoSection from './PhotoSection';
import { Product, Color } from '@/types/product.types';
import { integralCF } from '@/styles/fonts';
import { cn } from '@/lib/utils';
import Rating from '@/components/ui/Rating';
import ColorSelection from './ColorSelection';
import AddToCardSection from './AddToCardSection';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { IconBrandWhatsapp } from '@tabler/icons-react';

const Header = ({ data }: { data: Product }) => {
  const [selectedVolume, setSelectedVolume] = useState(data.volumeOptions[0]);
  const [selectedColor, setSelectedColor] = useState<Color>(data.selectedColor);

  const handleVolumeChange = (ml: number) => {
    const volume = data.volumeOptions.find((v) => v.ml === ml);
    if (volume) {
      setSelectedVolume(volume);
    }
  };

  const handleColorChange = (color: Color) => {
    setSelectedColor(color);
  };

  const handleWhatsAppShare = () => {
    const message = `Check out this amazing product: ${data.title} - ₹${selectedVolume.price}`;
    const whatsappUrl = `https://wa.me/?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  return (
    <>
      <div className='grid grid-cols-1 gap-5 md:grid-cols-2'>
        <div>
          <PhotoSection data={{ ...data, srcUrl: selectedColor.imageUrl }} />
        </div>
        <div>
          {/* Categories */}
          <div className='mb-3 flex flex-wrap gap-2'>
            {data.categories.map((category) => (
              <Link 
                key={category} 
                href={`/shop?category=${category}`}
                className='no-underline'
              >
                <Badge
                  variant='outline'
                  className={cn(
                    'px-3 py-1 text-sm capitalize transition-colors hover:bg-black hover:text-white',
                    category === 'perfumes' && 'bg-blue-50 text-blue-700',
                    category === 'attars' && 'bg-amber-50 text-amber-700',
                    category === 'new-arrivals' && 'bg-green-50 text-green-700',
                    category === 'best-sellers' && 'bg-purple-50 text-purple-700'
                  )}
                >
                  {category.replace('-', ' ')}
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
          <div className='mb-5 flex items-center space-x-2.5 sm:space-x-3'>
            <span className='text-2xl font-bold text-black sm:text-[32px]'>
              ₹{selectedVolume.price}
            </span>
            {data.discount.percentage > 0 && (
              <span className='text-2xl font-bold text-black/40 line-through sm:text-[32px]'>
                ₹
                {selectedVolume.price +
                  (selectedVolume.price * data.discount.percentage) / 100}
              </span>
            )}
            {data.discount.percentage > 0 && (
              <span className='rounded-full bg-[#FF3333]/10 px-3.5 py-1.5 text-[10px] font-medium text-[#FF3333] sm:text-xs'>
                {`-${data.discount.percentage}%`}
              </span>
            )}
            {data.isSale && (
              <span className='rounded-full bg-green-500/10 px-3.5 py-1.5 text-[10px] font-medium text-green-500 sm:text-xs'>
                Sale
              </span>
            )}
          </div>

          {/* Gender Badges */}
          <div className='mb-5 flex gap-2'>
            {data.gender.map((gender) => (
              <Badge
                key={gender}
                variant='outline'
                className={cn(
                  'px-3 py-1 text-sm',
                  gender === 'male' && 'bg-blue-100 text-blue-800',
                  gender === 'female' && 'bg-pink-100 text-pink-800',
                  gender === 'unisex' && 'bg-purple-100 text-purple-800'
                )}
              >
                {gender.charAt(0).toUpperCase() + gender.slice(1)}
              </Badge>
            ))}
          </div>

          <p className='mb-5 text-sm text-black/60 sm:text-base'>
            {data.description}
          </p>
          <hr className='mb-5 h-[1px] border-t-black/10' />

          {/* Color Selection */}
          <div className='mb-5'>
            <h3 className='mb-3 text-sm font-medium'>Select Color</h3>
            <ColorSelection
              colors={data.colors}
              selectedColor={selectedColor}
              onColorChange={handleColorChange}
            />
          </div>

          <hr className='my-5 h-[1px] border-t-black/10' />

          {/* Volume Selection */}
          <div className='mb-5'>
            <h3 className='mb-3 text-sm font-medium'>Select Volume</h3>
            <div className='flex gap-2'>
              {data.volumeOptions.map((option) => (
                <button
                  key={option.ml}
                  onClick={() => handleVolumeChange(option.ml)}
                  className={cn(
                    'rounded-full border px-4 py-2 text-sm',
                    selectedVolume.ml === option.ml
                      ? 'border-black bg-black text-white'
                      : 'border-gray-200 hover:border-black'
                  )}
                >
                  {option.ml}ml
                </button>
              ))}
            </div>
          </div>

          <hr className='my-5 hidden h-[1px] border-t-black/10 md:block' />
          <div className='flex gap-3'>
            <AddToCardSection data={data} />
            <button
              onClick={handleWhatsAppShare}
              className='flex flex-1 items-center justify-center gap-2 rounded-full bg-[#25D366] px-6 py-3 text-sm font-medium text-white transition-all hover:bg-[#128C7E] focus:outline-none focus:ring-2 focus:ring-[#25D366] focus:ring-offset-2'
            >
              <IconBrandWhatsapp className='h-5 w-5' />
              Share
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Header;
