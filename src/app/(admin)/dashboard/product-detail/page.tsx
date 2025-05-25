import PageContainer from '@/components/layout/page-container';
import { Metadata } from 'next';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { IconArrowLeft, IconEdit, IconTrash } from '@tabler/icons-react';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Product Detail',
  description: 'View detailed information about a product'
};

// Sample product data
const product = {
  id: 1,
  name: 'Premium Headphones',
  category: 'Electronics',
  price: 199.99,
  stock: 45,
  description:
    'High-quality wireless headphones with noise cancellation and premium sound quality.',
  specifications: {
    brand: 'AudioTech',
    model: 'ATH-WB1000',
    color: 'Black',
    weight: '250g',
    connectivity: 'Bluetooth 5.0',
    batteryLife: '30 hours'
  },
  createdAt: '2024-01-15',
  lastUpdated: '2024-03-01'
};

export default function ProductDetail() {
  return (
    <PageContainer>
      <div className='flex flex-col gap-4'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-4'>
            <Button variant='ghost' size='icon' asChild>
              <Link href='/dashboard/product-list'>
                <IconArrowLeft className='h-4 w-4' />
              </Link>
            </Button>
            <h1 className='text-2xl font-bold'>Product Details</h1>
          </div>
          <div className='flex gap-2'>
            <Button variant='outline' size='sm'>
              <IconEdit className='mr-2 h-4 w-4' />
              Edit
            </Button>
            <Button variant='destructive' size='sm'>
              <IconTrash className='mr-2 h-4 w-4' />
              Delete
            </Button>
          </div>
        </div>

        <div className='grid gap-4 md:grid-cols-2'>
          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div>
                <h3 className='text-sm font-medium text-muted-foreground'>
                  Name
                </h3>
                <p className='text-lg'>{product.name}</p>
              </div>
              <div>
                <h3 className='text-sm font-medium text-muted-foreground'>
                  Category
                </h3>
                <p className='text-lg'>{product.category}</p>
              </div>
              <div>
                <h3 className='text-sm font-medium text-muted-foreground'>
                  Price
                </h3>
                <p className='text-lg'>${product.price.toFixed(2)}</p>
              </div>
              <div>
                <h3 className='text-sm font-medium text-muted-foreground'>
                  Stock
                </h3>
                <p className='text-lg'>{product.stock} units</p>
              </div>
              <div>
                <h3 className='text-sm font-medium text-muted-foreground'>
                  Description
                </h3>
                <p className='text-lg'>{product.description}</p>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Specifications</CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              {Object.entries(product.specifications).map(([key, value]) => (
                <div key={key}>
                  <h3 className='text-sm font-medium capitalize text-muted-foreground'>
                    {key.replace(/([A-Z])/g, ' $1').trim()}
                  </h3>
                  <p className='text-lg'>{value}</p>
                </div>
              ))}
            </CardContent>
          </Card>

          <Card className='md:col-span-2'>
            <CardHeader>
              <CardTitle>Additional Information</CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div>
                <h3 className='text-sm font-medium text-muted-foreground'>
                  Created At
                </h3>
                <p className='text-lg'>{product.createdAt}</p>
              </div>
              <div>
                <h3 className='text-sm font-medium text-muted-foreground'>
                  Last Updated
                </h3>
                <p className='text-lg'>{product.lastUpdated}</p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageContainer>
  );
}
