'use client';

import * as React from 'react';
import {
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem
} from '@/components/ui/sidebar';
import Image from 'next/image';

export function OrgSwitcher() {
  return (
    <SidebarMenu>
      <SidebarMenuItem>
        <SidebarMenuButton
          size='lg'
          className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'
        >
          <div className='y flex aspect-square size-8 items-center justify-center rounded-lg text-sidebar-primary-foreground'>
            <Image
              src='/logo/amorattar.jpg'
              alt='Amorattar logo'
              width={32}
              height={32}
              className='object-contain'
            />
          </div>
          <div className='flex flex-col gap-0.5 leading-none'>
            <span className='font-semibold'>AMORATTAR</span>
            <span className=''>Admin Panel</span>
          </div>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
