import { cn } from '@/lib/utils';
import Link from 'next/link';
import React from 'react';

type DressStyleCardProps = {
  title: string;
  url: string;
  className?: string;
};

const DressStyleCard = ({ title, url, className }: DressStyleCardProps) => {
  return (
    <Link
      href={url}
      className={cn([
        'group relative w-full overflow-hidden rounded-[20px] bg-cover bg-center bg-no-repeat px-6 py-4 text-left text-2xl font-bold text-white transition-all duration-300 hover:scale-[1.02] md:h-full md:px-9 md:py-[25px] md:text-4xl',
        'before:absolute before:inset-0 before:bg-black/40 before:backdrop-blur-[2px] before:transition-all before:duration-300 before:content-[""] group-hover:before:bg-black/50',
        className
      ])}
    >
      <span className='relative z-10'>{title}</span>
    </Link>
  );
};

export default DressStyleCard;
