import { Button } from '@/components/ui/button';
import InputGroup from '@/components/ui/input-group';
import { cn } from '@/lib/utils';
import { integralCF } from '@/styles/fonts';
import Image from 'next/image';
import React from 'react';

const NewsLetterSection = () => {
  return (
    <div className='relative mx-auto grid max-w-frame grid-cols-1 rounded-[20px] bg-black px-6 py-9 md:grid-cols-2 md:px-16 md:py-11'>
      <p
        className={cn([
          integralCF.className,
          'mb-9 text-[32px] font-bold text-white md:mb-0 md:text-[40px]'
        ])}
      >
        STAY UP TO DATE ABOUT OUR LATEST OFFERS
      </p>
      <div className='flex items-center'>
        <div className='mx-auto flex w-full max-w-[349px] flex-col'>
          <InputGroup className='mb-[14px] flex bg-white'>
            <InputGroup.Text>
              <Image
                priority
                src='/icons/envelope.svg'
                height={20}
                width={20}
                alt='email'
                className='min-h-5 min-w-5'
              />
            </InputGroup.Text>
            <InputGroup.Input
              type='email'
              name='email'
              placeholder='Enter your email address'
              className='bg-transparent placeholder:text-sm placeholder:text-black/40 sm:placeholder:text-base'
            />
          </InputGroup>
          <Button
            variant='secondary'
            className='h-12 rounded-full bg-white px-4 py-3 text-sm font-medium sm:text-base'
            aria-label='Subscribe to Newsletter'
            type='button'
          >
            Subscribe to Newsletter
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NewsLetterSection;
