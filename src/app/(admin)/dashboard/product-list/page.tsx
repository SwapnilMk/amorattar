'use client';

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { IconPlus, IconSearch } from '@tabler/icons-react';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Product } from '@/types/product.types';
import { Badge } from '@/components/ui/badge';
import { Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import { IconEdit, IconTrash } from '@tabler/icons-react';
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious
} from '@/components/ui/pagination';
import { useDebounce } from '@/hooks/useDebounce';
                
interface PaginatedResponse {
  products: Product[];
  pagination: {
    total: number;
    page: number;
    limit: number;
    pages: number;
  };
}

export default function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [pagination, setPagination] = useState<PaginatedResponse['pagination']>(
    {
      total: 0,
      page: 1,
      limit: 10,
      pages: 0
    }
  );

  const debouncedSearchQuery = useDebounce(searchQuery, 500);

  const handleEditProduct = (product: Product) => {
    // TODO: Implement edit functionality
    console.log('Edit product:', product);
  };

  const handleDeleteProduct = async (id: string) => {
    if (!confirm('Are you sure you want to delete this product?')) return;
    try {
      const res = await fetch(`/api/products/${id}`, { method: 'DELETE' });
      if (!res.ok) throw new Error('Failed to delete product');
      setProducts(products.filter((p) => p.id !== id));
      // Refresh the current page data
      fetchProducts(currentPage, debouncedSearchQuery);
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  const fetchProducts = async (page: number = 1, search: string = '') => {
    setLoading(true);
    try {
      const params = new URLSearchParams({
        page: page.toString(),
        limit: '10'
      });
      
      if (search.trim()) {
        params.append('search', search.trim());
      }

      const res = await fetch(`/api/products?${params.toString()}`);
      const data: PaginatedResponse = await res.json();
      setProducts(data.products);
      setPagination(data.pagination);
    } catch (error) {
      console.error('Error fetching products:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts(currentPage, debouncedSearchQuery);
  }, [currentPage, debouncedSearchQuery]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1); // Reset to first page when searching
  };

  return (
    <div className='flex h-[70vh] sm:h-screen flex-col gap-4 p-4 sm:p-6'>
      <div className='flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between'>
        <h1 className='text-xl font-bold sm:text-2xl'>Product List</h1>
        <Button asChild className='w-full sm:w-auto'>
          <Link href='/dashboard/add-product'>
            <IconPlus className='mr-2 h-4 w-4' />
            Add Product
          </Link>
        </Button>
      </div>

      <div className='flex items-center gap-4'>
        <div className='relative flex-1'>
          <IconSearch className='absolute left-2 top-2.5 h-4 w-4 text-muted-foreground' />
          <Input 
            placeholder='Search products by title, brand, or description...' 
            className='pl-8' 
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
      </div>

      <Card className='flex-1 flex flex-col'>
        <CardContent className='flex-1 flex flex-col p-0'>
          <div className='flex-1 overflow-hidden'>
            {/* Mobile Card View */}
            <div className='block sm:hidden'>
              {loading ? (
                <div className='flex items-center justify-center py-8'>
                  <div className='h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent'></div>
                  <span className='ml-2'>Loading products...</span>
                </div>
              ) : products.length === 0 ? (
                <div className='text-center py-8'>
                  {searchQuery ? `No products found for "${searchQuery}"` : 'No products found'}
                </div>
              ) : (
                <div className='space-y-4 p-4 overflow-y-auto h-full'>
                  {products.map((product) => (
                    <div
                      key={product.id}
                      className='rounded-lg border p-4 space-y-3'
                    >
                      <div className='flex items-start gap-3'>
                        <div className='relative h-16 w-16 overflow-hidden rounded-md flex-shrink-0'>
                          <Image
                            src={product.srcUrl}
                            alt={product.title}
                            fill
                            className='object-cover'
                          />
                        </div>
                        <div className='flex-1 min-w-0'>
                          <h3 className='font-medium text-sm truncate'>{product.title}</h3>
                          <p className='text-xs text-muted-foreground'>{product.brand}</p>
                          <div className='flex items-center gap-1 mt-1'>
                            <Star className='h-3 w-3 fill-yellow-400 text-yellow-400' />
                            <span className='text-xs'>{product.rating.toFixed(1)}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className='flex flex-wrap gap-1'>
                        {product.categories?.slice(0, 2).map((cat) => (
                          <Badge
                            key={cat}
                            variant='secondary'
                            className='text-xs'
                          >
                            {cat}
                          </Badge>
                        ))}
                        {product.categories && product.categories.length > 2 && (
                          <Badge variant='secondary' className='text-xs'>
                            +{product.categories.length - 2} more
                          </Badge>
                        )}
                      </div>

                      <div className='text-xs text-muted-foreground'>
                        {product.volumeOptions && product.volumeOptions.length > 0 ? (
                          <div className='space-y-1'>
                            {product.volumeOptions.slice(0, 2).map((opt, idx) => (
                              <div key={idx} className='flex items-center gap-2'>
                                <span>{opt.ml}ml</span>
                                <span>₹{opt.price}</span>
                                {opt.discount > 0 && (
                                  <Badge variant='destructive' className='text-xs'>
                                    {opt.discount}% OFF
                                  </Badge>
                                )}
                              </div>
                            ))}
                            {product.volumeOptions.length > 2 && (
                              <span>+{product.volumeOptions.length - 2} more options</span>
                            )}
                          </div>
                        ) : (
                          <span>No volume options</span>
                        )}
                      </div>

                      <div className='flex justify-end gap-2 pt-2 border-t'>
                        <Button asChild variant='ghost' size='sm'>
                          <Link href={`/dashboard/product-list/${product.id}/edit`}>
                            <IconEdit className='h-4 w-4' />
                          </Link>
                        </Button>
                        <Button
                          variant='ghost'
                          size='sm'
                          onClick={() => handleDeleteProduct(product.id)}
                        >
                          <IconTrash className='h-4 w-4' />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Desktop Table View */}
            <div className='hidden sm:block'>
              <div className='overflow-x-auto'>
                <Table>
                  <TableHeader>
                    <TableRow className="sticky top-0 bg-background after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-border after:content-[''] [&>*]:whitespace-nowrap">
                      <TableHead className='w-[300px]'>Product Name</TableHead>
                      <TableHead>Brand</TableHead>
                      <TableHead>Volume Options</TableHead>
                      <TableHead>Rating</TableHead>
                      <TableHead className='text-right'>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody className='overflow-auto'>
                    {loading ? (
                      <TableRow>
                        <TableCell colSpan={5} className='text-center py-8'>
                          <div className='flex items-center justify-center'>
                            <div className='h-6 w-6 animate-spin rounded-full border-2 border-primary border-t-transparent'></div>
                            <span className='ml-2'>Loading products...</span>
                          </div>
                        </TableCell>
                      </TableRow>
                    ) : products.length === 0 ? (
                      <TableRow>
                        <TableCell colSpan={5} className='text-center py-8'>
                          {searchQuery ? `No products found for "${searchQuery}"` : 'No products found'}
                        </TableCell>
                      </TableRow>
                    ) : (
                      products.map((product) => (
                        <TableRow
                          key={product.id}
                          className='odd:bg-muted/50 [&>*]:whitespace-nowrap'
                        >
                          <TableCell>
                            <div className='flex items-center gap-3'>
                              <div className='relative h-12 w-12 overflow-hidden rounded-md'>
                                <Image
                                  src={product.srcUrl}
                                  alt={product.title}
                                  fill
                                  className='object-cover'
                                />
                              </div>
                              <div className='space-y-1'>
                                <p className='font-medium'>{product.title}</p>
                                <div className='flex flex-wrap gap-1'>
                                  {product.categories?.map((cat) => (
                                    <Badge
                                      key={cat}
                                      variant='secondary'
                                      className='text-xs'
                                    >
                                      {cat}
                                    </Badge>
                                  ))}
                                </div>
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>{product.brand}</TableCell>
                          <TableCell>
                            {product.volumeOptions &&
                            product.volumeOptions.length > 0 ? (
                              <div className='flex flex-col gap-1'>
                                {product.volumeOptions.map((opt, idx) => (
                                  <div
                                    key={idx}
                                    className='flex items-center gap-2 text-xs'
                                  >
                                    <span>{opt.ml}ml</span>
                                    <span>₹{opt.price}</span>
                                    {opt.discount > 0 && (
                                      <Badge
                                        variant='destructive'
                                        className='text-xs'
                                      >
                                        {opt.discount}% OFF
                                      </Badge>
                                    )}
                                  </div>
                                ))}
                              </div>
                            ) : (
                              <span className='text-xs text-muted-foreground'>
                                No options
                              </span>
                            )}
                          </TableCell>
                          <TableCell>
                            <div className='flex items-center gap-1'>
                              <Star className='h-4 w-4 fill-yellow-400 text-yellow-400' />
                              <span>{product.rating.toFixed(1)}</span>
                            </div>
                          </TableCell>
                          <TableCell className='text-right'>
                            <div className='flex justify-end gap-2'>
                              <Button asChild variant='ghost' size='icon'>
                                <Link
                                  href={`/dashboard/product-list/${product.id}/edit`}
                                >
                                  <IconEdit className='h-4 w-4' />
                                </Link>
                              </Button>
                              <Button
                                variant='ghost'
                                size='icon'
                                onClick={() => handleDeleteProduct(product.id)}
                              >
                                <IconTrash className='h-4 w-4' />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    )}
                  </TableBody>
                </Table>
              </div>
            </div>
          </div>
          
          {/* Pagination - Always visible on both mobile and desktop */}
          {pagination.pages > 1 && (
            <div className='border-t p-4 bg-background'>
              <Pagination className='justify-between'>
                <PaginationPrevious
                  href='#'
                  className='border border-black/10'
                  onClick={(e) => {
                    e.preventDefault();
                    if (currentPage > 1) {
                      handlePageChange(currentPage - 1);
                    }
                  }}
                  aria-disabled={currentPage === 1}
                />
                <PaginationContent>
                  {Array.from({ length: pagination.pages }, (_, i) => i + 1).map(
                    (page, index) => {
                      if (
                        page === 1 ||
                        page === pagination.pages ||
                        (page >= currentPage - 1 && page <= currentPage + 1)
                      ) {
                        return (
                          <PaginationItem key={page}>
                            <PaginationLink
                              href='#'
                              className='text-sm font-medium text-black/50'
                              isActive={currentPage === page}
                              onClick={(e) => {
                                e.preventDefault();
                                handlePageChange(page);
                              }}
                            >
                              {page}
                            </PaginationLink>
                          </PaginationItem>
                        );
                      }
                      if (
                        (page === 2 && currentPage > 3) ||
                        (page === pagination.pages - 1 &&
                          currentPage < pagination.pages - 2)
                      ) {
                        return (
                          <PaginationItem key={`ellipsis-${page}`}>
                            <PaginationEllipsis />
                          </PaginationItem>
                        );
                      }
                      return null;
                    }
                  )}
                </PaginationContent>
                <PaginationNext
                  href='#'
                  className='border border-black/10'
                  onClick={(e) => {
                    e.preventDefault();
                    if (currentPage < pagination.pages) {
                      handlePageChange(currentPage + 1);
                    }
                  }}
                  aria-disabled={currentPage === pagination.pages}
                />
              </Pagination>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
