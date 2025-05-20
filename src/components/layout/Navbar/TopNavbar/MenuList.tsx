// src/components/layout/navbar/topnavbar/MenuList.tsx
import * as React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import {
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger
} from '@/components/ui/navigation-menu';
import { MenuListData } from '../navbar.types';

export type MenuListProps = {
  data: MenuListData;
  label: string;
};

export function MenuList({ data, label }: MenuListProps) {
  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger className='px-3 font-normal'>
        {label}
      </NavigationMenuTrigger>
      <NavigationMenuContent>
        <ul className='grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]'>
          <li className='row-span-3'>
            <NavigationMenuLink asChild>
              <a
                className='flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-black/70 to-black/50 bg-cover bg-center bg-no-repeat p-6 no-underline outline-none backdrop-blur-sm focus:shadow-md'
                style={{
                  backgroundImage: 'url(/images/menu/signatureAttars.jpeg)'
                }}
                href='/shop#signature-attars'
              >
                <div className='mb-2 mt-4 text-lg font-medium text-white'>
                  Signature Attars
                </div>
                <p className='text-sm leading-tight text-white/90'>
                  Experience our exclusive range of handcrafted attars made from
                  the finest oils.
                </p>
              </a>
            </NavigationMenuLink>
          </li>
          {data.map((item) => (
            <ListItem key={item.id} title={item.label} href={item.url ?? '/'}>
              {item.description ?? 'Explore this category'}
            </ListItem>
          ))}
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
}

const ListItem = React.forwardRef<
  React.ElementRef<typeof Link>,
  React.ComponentPropsWithoutRef<typeof Link>
>(({ className, title, children, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          ref={ref}
          className={cn(
            'block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground',
            className
          )}
          {...props}
        >
          <div className='text-sm font-medium leading-none'>{title}</div>
          <p className='line-clamp-2 text-sm leading-snug text-muted-foreground'>
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = 'ListItem';
