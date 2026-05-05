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
import { useSession } from '@/components/providers/SessionProvider';
import { UserNav } from '@/components/user-nav';
import AuthModal from '@/components/auth/AuthModal';
import { Button } from '@/components/ui/button';
import { User } from 'lucide-react';

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
  const { user } = useSession();

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
              className='flex flex-col items-center'
            >
              <Image
                src='/logo/amorperfumes.png'
                height={120}
                width={120}
                alt='logo'
                className='max-h-[90px] max-w-[90px] object-contain'
              />
            </Link>
          </div>

          {/* Right: User/Auth and Cart */}
          <div className='flex items-center gap-2'>
            {user ? (
              <UserNav />
            ) : (
              <AuthModal>
                <Button variant="ghost" size="icon" className="h-8 w-8">
                  <User size={20} />
                </Button>
              </AuthModal>
            )}
            <CartBtn />
          </div>
        </div>

        {/* Desktop Layout */}
        <div className='hidden w-full items-center justify-between md:flex'>
          <div className='flex items-center'>
            <Link
              href='/'
              className='mr-10 flex items-center gap-3'
            >
              <Image
                src='/logo/amorperfumes.png'
                height={160}
                width={160}
                alt='logo'
                className='max-h-[120px] max-w-[120px] object-contain'
              />
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
                  placeholder='Search for perfumes...'
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
            <div className="flex items-center gap-3">
              {user ? (
                <UserNav />
              ) : (
                <AuthModal>
                  <Button variant="ghost" className="flex items-center gap-2 font-medium">
                    <User size={18} />
                    <span>Sign In</span>
                  </Button>
                </AuthModal>
              )}
              <CartBtn />
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default TopNavbar;
