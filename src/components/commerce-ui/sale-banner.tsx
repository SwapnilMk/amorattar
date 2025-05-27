import React from 'react';

function SaleBanner() {
  return (
    <div className='relative overflow-hidden rounded-lg bg-gradient-to-r from-yellow-500 to-orange-500'>
      {/* Summer themed background patterns */}
      <div className='absolute inset-0'>
        <svg
          className='absolute left-0 top-0 h-full w-full'
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
        >
          <circle cx='80%' cy='60%' r='100' fill='white' fillOpacity='0.1' />
          <circle cx='50%' cy='20%' r='40' fill='white' fillOpacity='0.1' />
          <path
            d='M0 20 L40 0 L40 40 Z'
            fill='white'
            fillOpacity='0.1'
            transform='translate(20, 40)'
          />
          <path
            d='M0 20 L40 0 L40 40 Z'
            fill='white'
            fillOpacity='0.1'
            transform='translate(460, 140) rotate(180)'
          />
        </svg>
      </div>

      <div className='relative z-10 px-6 py-8 md:px-10'>
        <div className='mx-auto max-w-4xl'>
          <div className='mb-2 flex items-center justify-center'>
            <div className='rounded-full bg-white bg-opacity-20 px-4 py-1 text-sm font-medium uppercase tracking-wider text-black backdrop-blur-sm'>
              Limited Time Offer
            </div>
          </div>

          <h2 className='mb-3 text-center text-3xl font-extrabold uppercase tracking-wide text-white md:text-4xl lg:text-5xl'>
            Summer Sale
          </h2>

          <div className='mb-4 flex justify-center'>
            <div className='relative'>
              <div className='text-center text-5xl font-bold text-white md:text-6xl'>
                20% OFF
              </div>
              <div className='absolute -right-6 -top-1 rotate-12 rounded-md border-2 border-green-600 bg-green-500 bg-opacity-20 px-2 py-1 text-xs font-semibold text-white backdrop-blur-sm'>
                EXCLUSIVE
              </div>
            </div>
          </div>

          <p className='mb-6 text-center text-lg text-white text-opacity-90'>
            Refresh your wardrobe with our latest summer collection. All items
            included in this special seasonal promotion!
          </p>

          <div className='flex flex-col items-center justify-center space-y-3 sm:flex-row sm:space-x-4 sm:space-y-0'>
            <button className='rounded-md bg-white px-6 py-3 font-medium text-orange-500 transition-all hover:bg-opacity-90'>
              Shop Summer Collection
            </button>
            <button className='rounded-md border border-white border-opacity-40 bg-transparent px-6 py-3 font-medium text-white transition-all hover:bg-white hover:bg-opacity-10'>
              View All Deals
            </button>
          </div>

          <div className='mt-4 text-center text-sm text-white text-opacity-80'>
            * Offer valid until August 31st. Cannot be combined with other
            promotions.
          </div>
        </div>
      </div>
    </div>
  );
}

export default SaleBanner;
