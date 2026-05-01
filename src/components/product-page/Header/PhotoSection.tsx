'use client';

import { Product } from '@/types/product.types';
import Image from 'next/image';
import React, { useState, useEffect } from 'react';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi
} from '@/components/ui/carousel';
import { cn } from '@/lib/utils';
import ImageViewer_Basic from '@/components/commerce-ui/image-viewer-basic';

const PhotoSection = ({ data }: { data: Product }) => {
  const [api, setApi] = useState<CarouselApi>();
  const [currentIndex, setCurrentIndex] = useState(0);
  const images = data?.gallery && data.gallery.length > 0 ? data.gallery : [data.srcUrl];

  useEffect(() => {
    if (!api) return;

    api.on('select', () => {
      setCurrentIndex(api.selectedScrollSnap());
    });
  }, [api]);

  // Handle manual selection from thumbnails
  const handleThumbnailClick = (index: number) => {
    setCurrentIndex(index);
    api?.scrollTo(index);
  };

  return (
    <div className='flex flex-col-reverse lg:flex-row lg:space-x-3.5'>
      {images.length > 1 && (
        <div className='mt-4 flex w-full items-center justify-center space-x-3 lg:mt-0 lg:w-fit lg:flex-col lg:justify-start lg:space-x-0 lg:space-y-3.5'>
          {images.map((photo, index) => (
            <button
              key={index}
              type='button'
              className={cn(
                'aspect-square max-h-[80px] w-full max-w-[80px] overflow-hidden rounded-[13px] bg-[#F0EEED] transition-all xl:max-h-[120px] xl:max-w-[110px] xl:rounded-[20px]',
                currentIndex === index ? 'ring-2 ring-black' : 'opacity-60 hover:opacity-100'
              )}
              onClick={() => handleThumbnailClick(index)}
            >
              <Image
                src={photo}
                width={152}
                height={167}
                className='h-full w-full object-cover'
                alt={`${data.title} - view ${index + 1}`}
                priority
              />
            </button>
          ))}
        </div>
      )}

      <div className='relative mx-auto mb-3 h-full max-h-[530px] min-h-[330px] w-full overflow-hidden rounded-[13px] bg-[#F0EEED] sm:w-96 sm:rounded-[20px] md:w-full lg:mb-0 lg:min-h-[380px] xl:min-h-[530px]'>
        <Carousel setApi={setApi} className='h-full w-full cursor-grab active:cursor-grabbing'>
          <CarouselContent className='h-full'>
            {images.map((photo, index) => (
              <CarouselItem key={index} className='h-full'>
                <ImageViewer_Basic
                  imageUrl={photo}
                  imageTitle={data.title}
                  className='h-full w-full'
                  classNameImageViewer='w-full h-full object-contain'
                  classNameThumbnailViewer='h-full w-full object-cover'
                  showControls={true}
                />
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>

        {/* White Dots for Mobile */}
        {images.length > 1 && (
          <div className='absolute bottom-4 left-1/2 flex -translate-x-1/2 space-x-2 lg:hidden'>
            {images.map((_, index) => (
              <div
                key={index}
                className={cn(
                  'h-1.5 w-1.5 rounded-full transition-all shadow-sm',
                  currentIndex === index ? 'bg-white w-4' : 'bg-white/40'
                )}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PhotoSection;
