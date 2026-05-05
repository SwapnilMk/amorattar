import React from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';

export default function PageContainer({
  children,
  scrollable = true,
  padding = true
}: {
  children: React.ReactNode;
  scrollable?: boolean;
  padding?: boolean;
}) {
  const paddingClass = padding ? 'p-4 md:px-6' : '';
  return (
    <div className='flex w-full flex-1 flex-col overflow-hidden'>
      {scrollable ? (
        <ScrollArea className='h-[calc(100dvh-64px)] w-full'>
          <div className={cn('flex min-h-full w-full flex-1 flex-col', paddingClass)}>
            {children}
          </div>
        </ScrollArea>
      ) : (
        <div className={cn('flex w-full flex-1 flex-col', paddingClass)}>
          {children}
        </div>
      )}
    </div>
  );
}
