'use client';
import PageContainer from '@/components/layout/page-container';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select';
import { IconArrowLeft } from '@tabler/icons-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';

export default function AddProduct() {
  const [categories, setCategories] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [form, setForm] = useState({
    title: '',
    price: '',
    categoryId: ''
    // Add other fields as needed
  });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    fetchCategories();
  }, []);

  async function fetchCategories() {
    setLoading(true);
    setError('');
    try {
      const res = await fetch('/api/categories');
      const data = await res.json();
      setCategories(data);
    } catch (err) {
      setError('Failed to fetch categories');
    }
    setLoading(false);
  }

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCategoryChange = (value: string) => {
    setForm({ ...form, categoryId: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    setSuccess(false);
    try {
      const res = await fetch('/api/products', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          price: parseFloat(form.price)
        })
      });
      if (res.ok) {
        setSuccess(true);
        setForm({ title: '', price: '', categoryId: '' });
      } else {
        setError('Failed to add product');
      }
    } catch {
      setError('Failed to add product');
    }
    setSubmitting(false);
  };

  return (
    <PageContainer>
      <div className='flex flex-col gap-4'>
        <div className='flex items-center gap-4'>
          <Button variant='ghost' size='icon' asChild>
            <Link href='/dashboard/product-list'>
              <IconArrowLeft className='h-4 w-4' />
            </Link>
          </Button>
          <h1 className='text-2xl font-bold'>Add New Product</h1>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Product Information</CardTitle>
          </CardHeader>
          <CardContent>
            <form className='space-y-6' onSubmit={handleSubmit}>
              <div className='grid gap-4 md:grid-cols-2'>
                <div className='space-y-2'>
                  <Label htmlFor='title'>Product Name</Label>
                  <Input
                    id='title'
                    name='title'
                    value={form.title}
                    onChange={handleChange}
                    placeholder='Enter product name'
                  />
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='price'>Price</Label>
                  <Input
                    id='price'
                    name='price'
                    value={form.price}
                    onChange={handleChange}
                    placeholder='Enter price'
                    type='number'
                  />
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='category'>Category</Label>
                  <Select
                    value={form.categoryId}
                    onValueChange={handleCategoryChange}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder='Select a category' />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.map((category) => (
                        <SelectItem key={category.id} value={category.id}>
                          {category.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='stock'>Stock</Label>
                  <Input
                    id='stock'
                    type='number'
                    placeholder='Enter stock quantity'
                  />
                </div>
                <div className='space-y-2 md:col-span-2'>
                  <Label htmlFor='description'>Description</Label>
                  <Textarea
                    id='description'
                    placeholder='Enter product description'
                    rows={4}
                  />
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='brand'>Brand</Label>
                  <Input id='brand' placeholder='Enter brand name' />
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='model'>Model</Label>
                  <Input id='model' placeholder='Enter model number' />
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='color'>Color</Label>
                  <Input id='color' placeholder='Enter color' />
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='weight'>Weight</Label>
                  <Input id='weight' placeholder='Enter weight' />
                </div>
              </div>
              <Button type='submit' disabled={submitting}>
                {submitting ? 'Adding...' : 'Add Product'}
              </Button>
              {error && <div className='text-red-500'>{error}</div>}
              {success && (
                <div className='text-green-500'>
                  Product added successfully!
                </div>
              )}
            </form>
          </CardContent>
        </Card>
      </div>
    </PageContainer>
  );
}
