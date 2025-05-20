import React from 'react';
import { FooterLinks } from './footer.types';
import Link from 'next/link';
import { cn } from '@/lib/utils';

const footerLinksData: FooterLinks[] = [
  {
    id: 1,
    title: 'Shop',
    children: [
      {
        id: 11,
        label: 'Perfumes',
        url: '/shop#perfumes'
      },
      {
        id: 12,
        label: 'Attars',
        url: '/shop#attars'
      },
      {
        id: 13,
        label: 'Home Fragrances',
        url: '/shop#home-fragrances'
      },
      {
        id: 14,
        label: 'Gift Sets',
        url: '/shop#gifting'
      }
    ]
  },
  {
    id: 2,
    title: 'Explore',
    children: [
      {
        id: 21,
        label: 'New Arrivals',
        url: '/shop#new-arrivals'
      },
      {
        id: 22,
        label: 'Best Sellers',
        url: '/shop#best-sellers'
      },
      {
        id: 23,
        label: 'Signature Attars',
        url: '/shop#signature-attars'
      },
      {
        id: 24,
        label: 'Scent Guide',
        url: '/scent-guide'
      }
    ]
  },
  {
    id: 3,
    title: 'Support',
    children: [
      {
        id: 31,
        label: 'Contact Us',
        url: '/contact'
      },
      {
        id: 32,
        label: 'Order Tracking',
        url: '/order-tracking'
      },
      {
        id: 33,
        label: 'Returns & Refunds',
        url: '/returns'
      },
      {
        id: 34,
        label: 'FAQs',
        url: '/faqs'
      }
    ]
  },
  {
    id: 4,
    title: 'Company',
    children: [
      {
        id: 41,
        label: 'About Us',
        url: '/about'
      },
      {
        id: 42,
        label: 'Our Stores',
        url: '/stores'
      },
      {
        id: 43,
        label: 'Privacy Policy',
        url: '/privacy'
      },
      {
        id: 44,
        label: 'Terms of Service',
        url: '/terms'
      }
    ]
  }
];

const LinksSection = () => {
  return (
    <>
      {footerLinksData.map((item) => (
        <section className='mt-5 flex flex-col' key={item.id}>
          <h3 className='mb-6 text-sm font-medium uppercase tracking-widest md:text-base'>
            {item.title}
          </h3>
          {item.children.map((link) => (
            <Link
              href={link.url}
              key={link.id}
              className={cn([
                'mb-4 w-fit text-sm text-black/60 transition-colors hover:text-black md:text-base'
              ])}
            >
              {link.label}
            </Link>
          ))}
        </section>
      ))}
    </>
  );
};

export default LinksSection;
