'use client';

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
          <div className='flex aspect-square size-8 items-center justify-center rounded-lg bg-white p-1'>
            <Image
              src='/logo/amorperfumes.png'
              alt='Amor Perfumes'
              width={32}
              height={32}
              className='object-contain'
            />
          </div>
          <div className='flex flex-col gap-0.5 leading-none group-data-[collapsible=icon]:hidden'>
            <span className='font-semibold'>Admin Panel</span>
          </div>
        </SidebarMenuButton>
      </SidebarMenuItem>
    </SidebarMenu>
  );
}
