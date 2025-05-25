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
import { useState, useEffect, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import Image from 'next/image';

type ProductCategory = {
  id: string;
  productId: string;
  categoryId: string;
  createdAt: Date;
  updatedAt: Date;
};

type Category = {
  id: string;
  name: string;
  slug: string;
  productCategories: ProductCategory[];
  createdAt: Date;
  updatedAt: Date;
};

type FormData = {
  title: string;
  description: string;
  price: string;
  categoryId: string;
  discountedPrice: string;
  discount: { amount: number; percentage: number };
  gender: string[];
  categories: string[];
  colors: Array<{ name: string; code: string; imageUrl: string }>;
  selectedColor: { name: string; code: string; imageUrl: string };
  volumeOptions: Array<{ ml: number; price: number; stock: number }>;
  quantity: number;
  isSale: boolean;
  specifications: Array<{ key: string; value: string }>;
  isInStock: boolean;
  isOutOfStock: boolean;
};

export default function AddProduct() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [mainImage, setMainImage] = useState<File | null>(null);
  const [mainImagePreview, setMainImagePreview] = useState<string>('');
  const [galleryImages, setGalleryImages] = useState<File[]>([]);
  const [galleryPreviews, setGalleryPreviews] = useState<string[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>('');
  const [form, setForm] = useState<FormData>({
    title: '',
    description: '',
    price: '',
    categoryId: '',
    discountedPrice: '',
    discount: { amount: 0, percentage: 0 },
    gender: [],
    categories: [],
    colors: [],
    selectedColor: { name: '', code: '', imageUrl: '' },
    volumeOptions: [],
    quantity: 0,
    isSale: false,
    specifications: [],
    isInStock: true,
    isOutOfStock: false
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
      if (!res.ok) {
        throw new Error('Failed to fetch categories');
      }
      const data = await res.json();
      if (Array.isArray(data)) {
        setCategories(data);
      } else {
        console.error('Categories data is not an array:', data);
        setCategories([]);
      }
    } catch (err) {
      console.error('Error fetching categories:', err);
      setError('Failed to fetch categories');
      setCategories([]);
    } finally {
      setLoading(false);
    }
  }

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCategoryChange = (value: string) => {
    if (value) {
      setForm(prev => ({ 
        ...prev, 
        categoryId: value,
        categories: [...prev.categories, value]
      }));
    }
  };

  const onMainImageDrop = useCallback((acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      setMainImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setMainImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  }, []);

  const onGalleryDrop = useCallback((acceptedFiles: File[]) => {
    setGalleryImages(prev => [...prev, ...acceptedFiles]);
    acceptedFiles.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setGalleryPreviews(prev => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    });
  }, []);

  const { getRootProps: getMainImageRootProps, getInputProps: getMainImageInputProps } = useDropzone({
    onDrop: onMainImageDrop,
    accept: { 'image/*': [] },
    maxFiles: 1
  });

  const { getRootProps: getGalleryRootProps, getInputProps: getGalleryInputProps } = useDropzone({
    onDrop: onGalleryDrop,
    accept: { 'image/*': [] },
    multiple: true
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    setSuccess(false);

    try {
      const formData = new FormData();
      const productData = {
        ...form,
        price: parseFloat(form.price) || 0,
        discountedPrice: form.discountedPrice ? parseFloat(form.discountedPrice) : 0,
        gender: form.gender.length > 0 ? form.gender : ['unisex'],
        colors: form.colors.length > 0 ? form.colors : [{ name: 'Default', code: '#000000', imageUrl: '' }],
        selectedColor: form.selectedColor.name ? form.selectedColor : { name: 'Default', code: '#000000', imageUrl: '' },
        volumeOptions: form.volumeOptions.length > 0 ? form.volumeOptions : [{ ml: 100, price: parseFloat(form.price) || 0, stock: 0 }]
      };

      formData.append('data', JSON.stringify(productData));
      
      if (mainImage) {
        formData.append('mainImage', mainImage);
      }
      
      galleryImages.forEach((image) => {
        formData.append('gallery', image);
      });

      const response = await fetch('/api/products', {
        method: 'POST',
        body: formData
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to create product');
      }

      setSuccess(true);
      // Reset form
      setForm({
        title: '',
        description: '',
        price: '',
        categoryId: '',
        discountedPrice: '',
        discount: { amount: 0, percentage: 0 },
        gender: [],
        categories: [],
        colors: [],
        selectedColor: { name: '', code: '', imageUrl: '' },
        volumeOptions: [],
        quantity: 0,
        isSale: false,
        specifications: [],
        isInStock: true,
        isOutOfStock: false
      });
      setMainImage(null);
      setMainImagePreview('');
      setGalleryImages([]);
      setGalleryPreviews([]);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <PageContainer>
      <div className='flex flex-col gap-4 w-full'>
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
            <CardTitle>Product Images</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="grid gap-6 md:grid-cols-2">
              {/* Main Image Upload */}
              <div className="space-y-4">
                <Label>Main Product Image</Label>
                <div
                  {...getMainImageRootProps()}
                  className="border-2 border-dashed rounded-lg p-4 text-center cursor-pointer hover:border-primary"
                >
                  <input {...getMainImageInputProps()} />
                  {mainImagePreview ? (
                    <div className="relative w-full aspect-square">
                      <Image
                        src={mainImagePreview}
                        alt="Main product"
                        fill
                        className="object-contain"
                      />
                    </div>
                  ) : (
                    <p>Drag & drop the main product image here, or click to select</p>
                  )}
                </div>
              </div>

              {/* Gallery Images Upload */}
              <div className="space-y-4">
                <Label>Gallery Images</Label>
                <div
                  {...getGalleryRootProps()}
                  className="border-2 border-dashed rounded-lg p-4 text-center cursor-pointer hover:border-primary"
                >
                  <input {...getGalleryInputProps()} />
                  {galleryPreviews.length > 0 ? (
                    <div className="grid grid-cols-2 gap-2">
                      {galleryPreviews.map((preview, index) => (
                        <div key={index} className="relative aspect-square">
                          <Image
                            src={preview}
                            alt={`Gallery ${index + 1}`}
                            fill
                            className="object-contain"
                          />
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p>Drag & drop gallery images here, or click to select</p>
                  )}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="mt-6">
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
                    value={form.categoryId || undefined}
                    onValueChange={handleCategoryChange}
                    disabled={loading}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={loading ? 'Loading categories...' : 'Select a category'} />
                    </SelectTrigger>
                    <SelectContent>
                      {categories.length > 0 ? (
                        categories.map((category) => (
                          <SelectItem key={category.id} value={category.id}>
                            {category.name}
                          </SelectItem>
                        ))
                      ) : (
                        <SelectItem value="no-categories" disabled>
                          No categories available
                        </SelectItem>
                      )}
                    </SelectContent>
                  </Select>
                  {error && <p className="text-sm text-red-500">{error}</p>}
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
                    name='description'
                    value={form.description}
                    onChange={handleChange}
                    placeholder='Enter product description (minimum 10 characters)'
                    rows={4}
                    className={form.description.length > 0 && form.description.length < 10 ? 'border-red-500' : ''}
                  />
                  {form.description.length > 0 && form.description.length < 10 && (
                    <p className="text-sm text-red-500">
                      Description must be at least 10 characters
                    </p>
                  )}
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
