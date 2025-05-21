import React from 'react';
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger
} from '@/components/ui/sheet';
import Image from 'next/image';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { dancingScript, poppins } from '@/styles/fonts';
import { NavMenu } from '../navbar.types';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger
} from '@/components/ui/accordion';
import InputGroup from '@/components/ui/input-group';

const ResTopNavbar = ({ data }: { data: NavMenu }) => {
  return (
    <Sheet>
      <SheetTrigger asChild className='cursor-pointer'>
        <Image
          priority
          src='/icons/menu.svg'
          height={100}
          width={100}
          alt='menu'
          className='max-h-[22px] max-w-[22px]'
        />
      </SheetTrigger>
      <SheetContent side='left' className='overflow-y-auto'>
        <SheetHeader className='mb-6'>
          <SheetTitle asChild>
            <SheetClose asChild>
              <Link
                href='/'
                className={cn([
                  dancingScript.className,
                  'flex flex-col items-center'
                ])}
              >
                <Image
                  src='/logo/amorattar.jpg'
                  height={100}
                  width={100}
                  alt='logo'
                  className='mb-2 max-h-[60px] max-w-[60px] rounded-full'
                />
                <div className='text-[30px] font-bold leading-none text-[#1A1A1A]'>
                  Amorattar
                </div>
              </Link>
            </SheetClose>
          </SheetTitle>
        </SheetHeader>

        <InputGroup className='mb-6 bg-[#F0F0F0]'>
          <InputGroup.Text>
            <Image
              priority
              src='/icons/search.svg'
              height={20}
              width={20}
              alt='search'
              className='min-h-5 min-w-5'
            />
          </InputGroup.Text>
          <InputGroup.Input
            type='search'
            name='search'
            placeholder='Search for perfumes and attar...'
            className='bg-transparent placeholder:text-black/40'
          />
        </InputGroup>

        <div className='mb-6 flex flex-col items-start'>
          {data.map((item) => (
            <React.Fragment key={item.id}>
              {item.type === 'MenuItem' && (
                <SheetClose asChild>
                  <Link href={item.url ?? '/'} className='mb-4 text-base'>
                    {item.label}
                  </Link>
                </SheetClose>
              )}
              {item.type === 'MenuList' && (
                <div className='mb-4 w-full'>
                  <Accordion type='single' collapsible>
                    <AccordionItem value={item.label} className='border-none'>
                      <AccordionTrigger className='p-0 py-0.5 text-left text-base font-normal'>
                        {item.label}
                      </AccordionTrigger>
                      <AccordionContent className='flex flex-col border-l p-4 pb-0'>
                        {item.children.map((itemChild) => (
                          <SheetClose
                            key={itemChild.id}
                            asChild
                            className='w-fit py-2 text-base'
                          >
                            <Link href={itemChild.url ?? '/'}>
                              {itemChild.label}
                            </Link>
                          </SheetClose>
                        ))}
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                </div>
              )}
            </React.Fragment>
          ))}
        </div>
      </SheetContent>
    </Sheet>
  );
};

export default ResTopNavbar;
