'use client';

import { cn } from '@/lib/utils';
import { dancingScript } from '@/styles/fonts';
import Link from 'next/link';
import React, { useCallback, useEffect, useRef, useState } from 'react';
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
import SearchResults from './SearchResults';
import { useDebounce } from '@/hooks/useDebounce';
import { useRouter } from 'next/navigation';

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
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const searchContainerRef = useRef<HTMLDivElement>(null);
  const debouncedSearchQuery = useDebounce(searchQuery, 300);
  const router = useRouter();

  const handleSearch = useCallback(async (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    try {
      const response = await fetch(
        `/api/search?q=${encodeURIComponent(query)}`
      );
      const data = await response.json();
      setSearchResults(data.products);
    } catch (error) {
      console.error('Error searching products:', error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
      setShowResults(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      if (searchQuery.trim()) {
        router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
        setShowResults(false);
      }
    }
  };

  useEffect(() => {
    handleSearch(debouncedSearchQuery);
  }, [debouncedSearchQuery, handleSearch]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        searchContainerRef.current &&
        !searchContainerRef.current.contains(event.target as Node)
      ) {
        setShowResults(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <nav className='sticky top-0 z-20 bg-white'>
      <div className='relative mx-auto flex max-w-frame items-center justify-between px-4 py-2 md:py-6 xl:px-0'>
        {/* Mobile Layout */}
        <div className='flex w-full items-center md:hidden'>
          {/* Left: Hamburger Menu */}
          <div className='flex items-center'>
            <ResTopNavbar data={data} />
          </div>

          {/* Center: Logo */}
          <div className='flex flex-grow justify-center'>
            <Link
              href='/'
              className={cn([
                dancingScript.className,
                'mr-3 flex items-center gap-2 text-2xl font-bold lg:mr-10 lg:text-[43px]'
              ])}
            >
              <Image
                src='/logo/amorattar.jpg'
                height={100}
                width={100}
                alt='logo'
                className='max-h-[50px] max-w-[50px] rounded-full'
              />
              <span>Amorattar</span>
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
                dancingScript.className,
                'mb-2 mr-3 flex items-center gap-2 text-2xl font-bold lg:mr-10 lg:text-[43px]'
              ])}
            >
              <Image
                src='/logo/amorattar.jpg'
                height={100}
                width={100}
                alt='logo'
                className='max-h-[65px] max-w-[65px] rounded-full'
              />
              <span>Amorattar</span>
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
            <div ref={searchContainerRef} className='relative mr-3 lg:mr-10'>
              <InputGroup className='w-[300px] bg-[#F0F0F0] lg:w-[400px]'>
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
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    setShowResults(true);
                  }}
                  onKeyDown={handleKeyDown}
                  onFocus={() => setShowResults(true)}
                />
              </InputGroup>
              {showResults && (
                <SearchResults
                  results={searchResults}
                  isLoading={isSearching}
                  onClose={() => setShowResults(false)}
                />
              )}
            </div>
            <CartBtn />
          </div>
        </div>
      </div>
    </nav>
  );
};

export default TopNavbar;
