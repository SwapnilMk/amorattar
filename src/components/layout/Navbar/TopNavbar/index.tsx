import { cn } from '@/lib/utils';
import { integralCF } from '@/styles/fonts';
import Link from 'next/link';
import React from 'react';
import { NavMenu } from '../navbar.types';
import { MenuList } from './MenuList';
import {
  NavigationMenu,
  NavigationMenuList
} from '@/components/ui/navigation-menu';
import { MenuItem } from './MenuItem';
import Image from 'next/image';
import InputGroup from '@/components/ui/input-group';
import ResTopNavbar from './ResTopNavbar';
import CartBtn from './CartBtn';

const data: NavMenu = [
  {
    id: 1,
    label: 'Home',
    type: 'MenuItem',
    url: '/',
    children: []
  },
  {
    id: 2,
    label: 'Shop',
    type: 'MenuList',
    children: [
      {
        id: 21,
        label: 'All Products',
        url: '/shop#all-products',
        description: 'Browse all our fragrances'
      },
      {
        id: 22,
        label: 'Perfumes',
        url: '/shop#perfumes',
        description: 'Luxurious and modern perfumes'
      },
      {
        id: 23,
        label: 'Attars',
        url: '/shop#attars',
        description: 'Traditional concentrated fragrances'
      },
      {
        id: 24,
        label: 'Home Fragrances',
        url: '/shop#home-fragrances',
        description: 'Scented solutions for your home'
      },
      {
        id: 25,
        label: 'Body Sprays',
        url: '/shop#body-sprays',
        description: 'Refreshing and long-lasting sprays'
      }
    ]
  },
  {
    id: 3,
    label: 'New Arrivals',
    type: 'MenuItem',
    url: '/shop#new-arrivals',
    children: []
  },
  {
    id: 4,
    label: 'Best Sellers',
    type: 'MenuItem',
    url: '/shop#best-sellers',
    children: []
  },
  {
    id: 5,
    label: 'Gifting',
    type: 'MenuItem',
    url: '/shop#gifting',
    children: []
  }
];

const TopNavbar = () => {
  return (
    <nav className='sticky top-0 z-20 bg-white'>
      <div className='relative mx-auto flex max-w-frame items-center justify-between px-4 py-5 md:py-6 xl:px-0'>
        {/* Mobile Layout */}
        <div className='flex w-full items-center md:hidden'>
          {/* Left: Hamburger Menu */}
          <div className='flex items-center'>
            <ResTopNavbar data={data} />
          </div>

          {/* Center: Logo */}
          <div className='flex flex-grow justify-center'>
            <Link href='/' className={cn([integralCF.className, 'text-2xl'])}>
              AMORATTAR
            </Link>
          </div>

          {/* Right: Cart Button */}
          <div className='flex items-center'>
            <CartBtn />
          </div>
        </div>

        {/* Desktop Layout */}
        <div className='hidden w-full items-center justify-between md:flex'>
          <div className='flex items-center'>
            <Link
              href='/'
              className={cn([
                integralCF.className,
                'mb-2 mr-3 text-2xl lg:mr-10 lg:text-[32px]'
              ])}
            >
              AMORATTAR
            </Link>
            <NavigationMenu className='mr-2 lg:mr-7'>
              <NavigationMenuList>
                {data.map((item) => (
                  <React.Fragment key={item.id}>
                    {item.type === 'MenuItem' && (
                      <MenuItem label={item.label} url={item.url} />
                    )}
                    {item.type === 'MenuList' && (
                      <MenuList data={item.children} label={item.label} />
                    )}
                  </React.Fragment>
                ))}
              </NavigationMenuList>
            </NavigationMenu>
          </div>
          <div className='flex items-center'>
            <InputGroup className='mr-3 bg-[#F0F0F0] lg:mr-10'>
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
            <CartBtn />
            <Link href='/sign-in' className='p-1'>
              <Image
                priority
                src='/icons/user.svg'
                height={100}
                width={100}
                alt='user'
                className='max-h-[22px] max-w-[22px]'
              />
            </Link>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default TopNavbar;
