'use client';

import { Product } from '@/types/product.types';
import Image from 'next/image';
import React, { useState } from 'react';

const PhotoSection = ({ data }: { data: Product }) => {
  const [selected, setSelected] = useState<string>(data.srcUrl);

  return (
    <div className='flex flex-col-reverse lg:flex-row lg:space-x-3.5'>
      {data?.gallery && data.gallery.length > 0 && (
        <div className='flex w-full items-center justify-center space-x-3 lg:w-fit lg:flex-col lg:justify-start lg:space-x-0 lg:space-y-3.5'>
          {data.gallery.map((photo, index) => (
            <button
              key={index}
              type='button'
              className='aspect-square max-h-[106px] w-full max-w-[111px] overflow-hidden rounded-[13px] bg-[#F0EEED] xl:max-h-[167px] xl:min-h-[167px] xl:max-w-[152px] xl:rounded-[20px]'
              onClick={() => setSelected(photo)}
            >
              <Image
                src={photo}
                width={152}
                height={167}
                className='h-full w-full rounded-md object-cover transition-all duration-500 hover:scale-110'
                alt={data.title}
                priority
              />
            </button>
          ))}
        </div>
      )}

      <div className='mx-auto mb-3 flex h-full max-h-[530px] min-h-[330px] w-full items-center justify-center overflow-hidden rounded-[13px] bg-[#F0EEED] sm:w-96 sm:rounded-[20px] md:w-full lg:mb-0 lg:min-h-[380px] xl:min-h-[530px]'>
        <Image
          src={selected}
          width={444}
          height={530}
          className='h-full w-full rounded-md object-cover transition-all duration-500 hover:scale-110'
          alt={data.title}
          priority
          unoptimized
        />
      </div>
    </div>
  );
};

export default PhotoSection;
