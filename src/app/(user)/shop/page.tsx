import BreadcrumbShop from '@/components/shop-page/BreadcrumbShop';

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import MobileFilters from '@/components/shop-page/filters/MobileFilters';
import Filters from '@/components/shop-page/filters';
import { FiSliders } from 'react-icons/fi';
import ProductCard from '@/components/common/ProductCard';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from '@/components/ui/pagination';
import { relatedProductData } from '@/data/product';
import { newArrivalsData } from '@/data/new-arrivals';
import { topSellingData } from '@/data/top-selling';

export default function ShopPage() {
  return (
    <main className='pb-20'>
      <div className='mx-auto max-w-frame px-4 xl:px-0'>
        <hr className='mb-5 h-[1px] border-t-black/10 sm:mb-6' />
        <BreadcrumbShop />
        <div className='flex items-start md:space-x-5'>
          <div className='hidden min-w-[295px] max-w-[295px] space-y-5 rounded-[20px] border border-black/10 px-5 py-5 md:block md:space-y-6 md:px-6'>
            <div className='flex items-center justify-between'>
              <span className='text-xl font-bold text-black'>Filters</span>
              <FiSliders className='text-2xl text-black/40' />
            </div>
            <Filters />
          </div>
          <div className='flex w-full flex-col space-y-5'>
            <div className='flex flex-col lg:flex-row lg:justify-between'>
              <div className='flex items-center justify-between'>
                <h1 className='text-2xl font-bold md:text-[32px]'>Casual</h1>
                <MobileFilters />
              </div>
              <div className='flex flex-col sm:flex-row sm:items-center'>
                <span className='mr-3 text-sm text-black/60 md:text-base'>
                  Showing 1-10 of 100 Products
                </span>
                <div className='flex items-center'>
                  Sort by:{' '}
                  <Select defaultValue='most-popular'>
                    <SelectTrigger className='w-fit border-none bg-transparent px-1.5 text-sm font-medium text-black shadow-none sm:text-base'>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='most-popular'>Most Popular</SelectItem>
                      <SelectItem value='low-price'>Low Price</SelectItem>
                      <SelectItem value='high-price'>High Price</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
            <div className='grid w-full grid-cols-1 gap-4 xs:grid-cols-2 sm:grid-cols-3 md:grid-cols-2 lg:grid-cols-3 lg:gap-5'>
              {[
                ...relatedProductData.slice(1, 4),
                ...newArrivalsData.slice(1, 4),
                ...topSellingData.slice(1, 4)
              ].map((product) => (
                <ProductCard key={product.id} data={product} />
              ))}
            </div>
            <hr className='border-t-black/10' />
            <Pagination className='justify-between'>
              <PaginationPrevious href='#' className='border border-black/10' />
              <PaginationContent>
                <PaginationItem>
                  <PaginationLink
                    href='#'
                    className='text-sm font-medium text-black/50'
                    isActive
                  >
                    1
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink
                    href='#'
                    className='text-sm font-medium text-black/50'
                  >
                    2
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem className='hidden lg:block'>
                  <PaginationLink
                    href='#'
                    className='text-sm font-medium text-black/50'
                  >
                    3
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationEllipsis className='text-sm font-medium text-black/50' />
                </PaginationItem>
                <PaginationItem className='hidden lg:block'>
                  <PaginationLink
                    href='#'
                    className='text-sm font-medium text-black/50'
                  >
                    8
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem className='hidden sm:block'>
                  <PaginationLink
                    href='#'
                    className='text-sm font-medium text-black/50'
                  >
                    9
                  </PaginationLink>
                </PaginationItem>
                <PaginationItem>
                  <PaginationLink
                    href='#'
                    className='text-sm font-medium text-black/50'
                  >
                    10
                  </PaginationLink>
                </PaginationItem>
              </PaginationContent>

              <PaginationNext href='#' className='border border-black/10' />
            </Pagination>
          </div>
        </div>
      </div>
    </main>
  );
}
