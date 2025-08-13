// src/components/layout/footer/Footer.tsx
import { cn } from '@/lib/utils';
import { dancingScript } from '@/styles/fonts';
import React from 'react';
import { PaymentBadge, SocialNetworks } from './footer.types';
import { FaInstagram, FaSnapchat, FaWhatsapp } from 'react-icons/fa';
import Link from 'next/link';
import LinksSection from './LinksSection';
import Image from 'next/image';
import NewsLetterSection from './NewsLetterSection';
import LayoutSpacing from './LayoutSpacing';
import Banner from '@/components/commerce-ui/banner';

const socialsData: SocialNetworks[] = [
  // {
  //   id: 1,
  //   icon: <FaWhatsapp />,
  //   url: 'https://wa.me/918268435091'
  // },
  {
    id: 2,
    icon: <FaSnapchat />,
    url: 'https://www.snapchat.com/add/amorattar6'
  },
  {
    id: 3,
    icon: <FaInstagram />,
    url: 'https://www.instagram.com/amorattar6/'
  }
];

const paymentBadgesData: PaymentBadge[] = [
  {
    id: 1,
    srcUrl: '/icons/Visa.svg'
  },
  {
    id: 2,
    srcUrl: '/icons/mastercard.svg'
  },
  {
    id: 3,
    srcUrl: '/icons/paypal.svg'
  },
  {
    id: 4,
    srcUrl: '/icons/applePay.svg'
  },
  {
    id: 5,
    srcUrl: '/icons/googlePay.svg'
  }
];

const Footer = () => {
  return (
    <footer className='mt-10'>
      <div className='relative'>
        <div className='absolute bottom-0 h-1/2 w-full bg-[#F0F0F0]'></div>
        <div className='px-4'>
          <Banner />
        </div>
      </div>
      <div className='bg-[#F0F0F0] px-4 pb-4 pt-8 md:pt-[50px]'>
        <div className='mx-auto max-w-frame'>
          <nav className='mb-8 lg:grid lg:grid-cols-12'>
            <div className='flex flex-col lg:col-span-3 lg:max-w-[248px]'>
              <h1
                className={cn([
                  dancingScript.className,
                  'mb-6 text-[28px] lg:text-[32px]'
                ])}
              >
                Amorattar
              </h1>
              <p className='mb-9 text-sm text-black/60'>
                Discover the art of fragrance with our curated collection of
                attars and perfumes, crafted to elevate your senses.
              </p>
              <div className='flex items-center'>
                {socialsData.map((social) => (
                  <Link
                    href={social.url}
                    key={social.id}
                    className='mr-3 flex h-7 w-7 items-center justify-center rounded-full border border-black/20 bg-white p-1.5 transition-all hover:bg-black hover:text-white'
                  >
                    {social.icon}
                  </Link>
                ))}
              </div>
            </div>
            <div className='col-span-9 hidden lg:grid lg:grid-cols-4 lg:pl-10'>
              <LinksSection />
            </div>
            <div className='grid grid-cols-2 sm:grid-cols-4 lg:hidden'>
              <LinksSection />
            </div>
          </nav>

          <hr className='mb-6 h-[1px] border-t-black/10' />
          <div className='mb-2 flex flex-col items-center justify-center sm:flex-row sm:justify-between'>
            <p className='mb-4 text-center text-sm text-black/60 sm:mb-0 sm:mr-1 sm:text-left'>
              © {new Date().getFullYear()} AMORATTAR. Designed and Developed by{' '}
              <Link
                href='https://github.com/swapnilMk/'
                target='_blank'
                className='font-medium text-black'
              >
                SwapnilMk
              </Link>
            </p>
            <div className='flex items-center'>
              {paymentBadgesData.map((badge, _, arr) => (
                <span
                  key={badge.id}
                  className={cn([
                    arr.length !== badge.id && 'mr-3',
                    'flex h-[30px] w-[46px] items-center justify-center rounded-[5px] border-[#D6DCE5] bg-white'
                  ])}
                >
                  <Image
                    priority
                    src={badge.srcUrl}
                    width={33}
                    height={100}
                    alt={`Payment method ${badge.id}`}
                    className='max-h-[15px]'
                  />
                </span>
              ))}
            </div>
          </div>
        </div>
        <LayoutSpacing />
      </div>
    </footer>
  );
};

export default Footer;
