import Image from 'next/image';
import React from 'react';

const brandsData: { id: string; srcUrl: string }[] = [
  {
    id: 'versace',
    srcUrl: '/icons/versace-logo.svg'
  },
  {
    id: 'zara',
    srcUrl: '/icons/zara-logo.svg'
  },
  {
    id: 'gucci',
    srcUrl: '/icons/gucci-logo.svg'
  },
  {
    id: 'prada',
    srcUrl: '/icons/prada-logo.svg'
  },
  {
    id: 'calvin-klein',
    srcUrl: '/icons/calvin-klein-logo.svg'
  }
];

const Brands = () => {
  return (
    <div className='bg-black'>
      <div className='mx-auto flex max-w-frame flex-wrap items-center justify-center space-x-7 py-5 sm:px-4 md:justify-between md:py-0 xl:px-0'>
        {brandsData.map((brand) => (
          <Image
            key={brand.id}
            priority
            src={brand.srcUrl}
            height={0}
            width={0}
            alt={brand.id}
            className='my-5 h-auto max-h-[26px] w-auto max-w-[116px] md:my-11 lg:max-h-9 lg:max-w-48'
          />
        ))}
      </div>
    </div>
  );
};

export default Brands;
