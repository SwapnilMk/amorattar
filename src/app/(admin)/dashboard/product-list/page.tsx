'use client';

import PageContainer from '@/components/layout/page-container';
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
  const [pagination, setPagination] = useState<PaginatedResponse['pagination']>(
    {
      total: 0,
      page: 1,
      limit: 10,
      pages: 0
    }
  );

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
    } catch (error) {
      console.error('Error deleting product:', error);
    }
  };

  useEffect(() => {
    async function fetchProducts() {
      setLoading(true);
      try {
        const res = await fetch('/api/products');
        const data: PaginatedResponse = await res.json();
        setProducts(data.products);
        setPagination(data.pagination);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  return (
    <PageContainer>
      <div className='flex w-full flex-col gap-4'>
        <div className='flex items-center justify-between'>
          <h1 className='text-2xl font-bold'>Product List</h1>
          <Button asChild>
            <Link href='/dashboard/add-product'>
              <IconPlus className='mr-2 h-4 w-4' />
              Add Product
            </Link>
          </Button>
        </div>

        <div className='flex items-center gap-4'>
          <div className='relative flex-1'>
            <IconSearch className='absolute left-2 top-2.5 h-4 w-4 text-muted-foreground' />
            <Input placeholder='Search products...' className='pl-8' />
          </div>
        </div>

        <Card>
          <CardContent>
            <div className='grid w-full overflow-x-auto [&>div]:max-h-[400px] [&>div]:rounded [&>div]:border'>
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
                <TableBody className='overflow-hidden'>
                  {loading ? (
                    <TableRow>
                      <TableCell colSpan={5} className='text-center'>
                        Loading...
                      </TableCell>
                    </TableRow>
                  ) : products.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={5} className='text-center'>
                        No products found
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
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  );
}
