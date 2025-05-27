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
import { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useSession } from '@/components/providers/SessionProvider';
import { toast } from 'sonner';
import { CreateProductInput } from '@/lib/validations/product';
import {
  Gender,
  Fragrance,
  Color,
  Category,
  AvailabilityStatus
} from '@/types/product.types';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';
import slugify from 'slugify';
const initialFormData: CreateProductInput = {
  title: '',
  slug: '',
  srcUrl: '',
  gallery: [],
  brand: '',
  price: 0,
  discountedPrice: 0,
  discount: {
    amount: 0,
    percentage: 0
  },
  rating: 0,
  description: '',
  gender: ['Unisex'] as Gender[],
  categories: ['Perfumes'] as Category[],
  colors: [],
  selectedColor: {
    id: '',
    value: '',
    color: '',
    label: ''
  },
  volumeOptions: [],
  specifications: {},
  fragrance: ['Floral'] as Fragrance[],
  quantity: 1,
  isSale: false,
  availabilityStatus: 'In Stock'
};

export default function AddProduct() {
  const router = useRouter();
  const { user } = useSession();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [formData, setFormData] = useState<CreateProductInput>(initialFormData);
  const [mainImage, setMainImage] = useState<File | null>(null);
  const [mainImagePreview, setMainImagePreview] = useState<string>('');
  const [galleryImages, setGalleryImages] = useState<File[]>([]);
  const [galleryPreviews, setGalleryPreviews] = useState<string[]>([]);
  const [newColor, setNewColor] = useState<Color>({
    id: '',
    value: '',
    color: '',
    label: ''
  });
  const [newVolumeOption, setNewVolumeOption] = useState({
    ml: 0,
    price: 0
  });
  const [newSpecification, setNewSpecification] = useState({
    key: '',
    value: ''
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === 'price' ||
        name === 'discountedPrice' ||
        name === 'quantity' ||
        name === 'rating'
          ? parseFloat(value) || 0
          : value
    }));
  };

  const handleGenderChange = (value: Gender) => {
    setFormData((prev) => ({
      ...prev,
      gender: prev.gender.includes(value)
        ? prev.gender.filter((g) => g !== value)
        : [...prev.gender, value]
    }));
  };

  const handleCategoryChange = (value: Category) => {
    setFormData((prev) => ({
      ...prev,
      categories: prev.categories.includes(value)
        ? prev.categories.filter((c) => c !== value)
        : [...prev.categories, value]
    }));
  };

  const handleFragranceChange = (value: Fragrance) => {
    setFormData((prev) => ({
      ...prev,
      fragrance: prev.fragrance.includes(value)
        ? prev.fragrance.filter((f) => f !== value)
        : [...prev.fragrance, value]
    }));
  };

  const onMainImageDrop = useCallback(async (acceptedFiles: File[]) => {
    const file = acceptedFiles[0];
    if (file) {
      setMainImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setMainImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);

      try {
        const base64 = await convertFileToBase64(file);
        const response = await fetch('/api/upload', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            image: base64,
            folder: 'products/main'
          })
        });

        if (!response.ok) {
          throw new Error('Failed to upload image');
        }

        const result = await response.json();
        setFormData((prev) => ({ ...prev, srcUrl: result.secure_url }));
      } catch (error) {
        console.error('Error uploading main image:', error);
        toast.error('Failed to upload main image');
      }
    }
  }, []);

  const onGalleryDrop = useCallback(async (acceptedFiles: File[]) => {
    setGalleryImages((prev) => [...prev, ...acceptedFiles]);

    try {
      const uploadPromises = acceptedFiles.map(async (file) => {
        const base64 = await convertFileToBase64(file);
        const response = await fetch('/api/upload', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            image: base64,
            folder: 'products/gallery'
          })
        });

        if (!response.ok) {
          throw new Error('Failed to upload image');
        }

        const result = await response.json();
        return result.secure_url;
      });

      const urls = await Promise.all(uploadPromises);
      setFormData((prev) => ({ ...prev, gallery: [...prev.gallery, ...urls] }));

      acceptedFiles.forEach((file) => {
        const reader = new FileReader();
        reader.onloadend = () => {
          setGalleryPreviews((prev) => [...prev, reader.result as string]);
        };
        reader.readAsDataURL(file);
      });
    } catch (error) {
      console.error('Error uploading gallery images:', error);
      toast.error('Failed to upload gallery images');
    }
  }, []);

  const {
    getRootProps: getMainImageRootProps,
    getInputProps: getMainImageInputProps
  } = useDropzone({
    onDrop: onMainImageDrop,
    accept: { 'image/*': [] },
    maxFiles: 1
  });

  const {
    getRootProps: getGalleryRootProps,
    getInputProps: getGalleryInputProps
  } = useDropzone({
    onDrop: onGalleryDrop,
    accept: { 'image/*': [] },
    multiple: true
  });

  const handleAddColor = () => {
    if (newColor.value && newColor.color && newColor.label) {
      const color: Color = {
        id: `${formData.title.toLowerCase()}-${newColor.value}`,
        value: newColor.value,
        color: newColor.color,
        label: newColor.label
      };
      setFormData((prev) => ({
        ...prev,
        colors: [...prev.colors, color],
        selectedColor: prev.selectedColor.id ? prev.selectedColor : color
      }));
      setNewColor({
        id: '',
        value: '',
        color: '',
        label: ''
      });
    }
  };

  const handleColorSelect = (color: Color) => {
    setFormData((prev) => ({
      ...prev,
      selectedColor: color
    }));
  };

  const handleRemoveColor = (colorId: string) => {
    setFormData((prev) => ({
      ...prev,
      colors: prev.colors.filter((c) => c.id !== colorId),
      selectedColor:
        prev.selectedColor.id === colorId
          ? { id: '', value: '', color: '', label: '' }
          : prev.selectedColor
    }));
  };

  const handleAddVolumeOption = () => {
    if (!newVolumeOption.ml || !newVolumeOption.price) {
      toast.error('Please fill in all volume option fields');
      return;
    }

    setFormData((prev) => ({
      ...prev,
      volumeOptions: [...prev.volumeOptions, newVolumeOption]
    }));

    setNewVolumeOption({
      ml: 0,
      price: 0
    });
  };

  const handleAddSpecification = () => {
    if (!newSpecification.key || !newSpecification.value) {
      toast.error('Please fill in all specification fields');
      return;
    }

    setFormData((prev) => ({
      ...prev,
      specifications: {
        ...prev.specifications,
        [newSpecification.key]: newSpecification.value
      }
    }));

    setNewSpecification({
      key: '',
      value: ''
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || user.role !== 'admin') {
      router.push('/sign-in');
      return;
    }

    setLoading(true);
    setError('');

    try {
      // Generate slug from title
      const slug = slugify(formData.title, { lower: true });
      const data = { ...formData, slug };

      const response = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to create product');
      }

      toast.success('Product created successfully');
      router.push('/dashboard/product-list');
    } catch (error) {
      console.error('Error creating product:', error);
      toast.error(
        error instanceof Error ? error.message : 'Failed to create product'
      );
    } finally {
      setLoading(false);
    }
  };

  const convertFileToBase64 = async (file: File): Promise<string> => {
    const buffer = await file.arrayBuffer();
    const base64 = Buffer.from(buffer).toString('base64');
    return `data:${file.type};base64,${base64}`;
  };

  return (
    <PageContainer>
      <div className='flex w-full flex-col gap-4'>
        <div className='flex items-center gap-4'>
          <Button variant='ghost' size='icon' asChild>
            <Link href='/dashboard/product-list'>
              <IconArrowLeft className='h-4 w-4' />
            </Link>
          </Button>
          <h1 className='text-2xl font-bold'>Add New Product</h1>
        </div>

        <form onSubmit={handleSubmit} className='space-y-6'>
          <Card>
            <CardHeader>
              <CardTitle>Product Images</CardTitle>
            </CardHeader>
            <CardContent>
              <div className='grid gap-6 md:grid-cols-2'>
                {/* Main Image Upload */}
                <div className='space-y-4'>
                  <Label>Main Product Image</Label>
                  <div
                    {...getMainImageRootProps()}
                    className='cursor-pointer rounded-lg border-2 border-dashed p-4 text-center hover:border-primary'
                  >
                    <input {...getMainImageInputProps()} />
                    {mainImagePreview ? (
                      <div className='relative aspect-square w-full'>
                        <Image
                          src={mainImagePreview}
                          alt='Main product'
                          fill
                          className='object-contain'
                        />
                      </div>
                    ) : (
                      <p>
                        Drag & drop the main product image here, or click to
                        select
                      </p>
                    )}
                  </div>
                </div>

                {/* Gallery Images Upload */}
                <div className='space-y-4'>
                  <Label>Gallery Images</Label>
                  <div
                    {...getGalleryRootProps()}
                    className='cursor-pointer rounded-lg border-2 border-dashed p-4 text-center hover:border-primary'
                  >
                    <input {...getGalleryInputProps()} />
                    {galleryPreviews.length > 0 ? (
                      <div className='grid grid-cols-2 gap-2'>
                        {galleryPreviews.map((preview, index) => (
                          <div key={index} className='relative aspect-square'>
                            <Image
                              src={preview}
                              alt={`Gallery ${index + 1}`}
                              fill
                              className='object-contain'
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

          <Card>
            <CardHeader>
              <CardTitle>Basic Information</CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='grid gap-4 md:grid-cols-2'>
                <div className='space-y-2'>
                  <Label htmlFor='title'>Product Name</Label>
                  <Input
                    id='title'
                    name='title'
                    value={formData.title}
                    onChange={handleChange}
                    placeholder='Enter product name'
                    required
                  />
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='brand'>Brand</Label>
                  <Input
                    id='brand'
                    name='brand'
                    value={formData.brand}
                    onChange={handleChange}
                    placeholder='Enter brand name'
                    required
                  />
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='price'>Price</Label>
                  <Input
                    id='price'
                    name='price'
                    type='number'
                    value={formData.price}
                    onChange={handleChange}
                    placeholder='Enter price'
                    required
                  />
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='discountedPrice'>Discounted Price</Label>
                  <Input
                    id='discountedPrice'
                    name='discountedPrice'
                    type='number'
                    value={formData.discountedPrice}
                    onChange={handleChange}
                    placeholder='Enter discounted price'
                  />
                </div>
                <div className='space-y-2'>
                  <Label htmlFor='quantity'>Quantity</Label>
                  <Input
                    id='quantity'
                    name='quantity'
                    type='number'
                    value={formData.quantity}
                    onChange={handleChange}
                    placeholder='Enter quantity'
                    required
                  />
                </div>
                <div className='space-y-2'>
                  <Label>Availability Status</Label>
                  <Select
                    value={formData.availabilityStatus}
                    onValueChange={(value: AvailabilityStatus) =>
                      setFormData((prev) => ({
                        ...prev,
                        availabilityStatus: value
                      }))
                    }
                  >
                    <SelectTrigger>
                      <SelectValue placeholder='Select availability status' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value='In Stock'>In Stock</SelectItem>
                      <SelectItem value='Out of Stock'>Out of Stock</SelectItem>
                      <SelectItem value='Pre-Order'>Pre-Order</SelectItem>
                      <SelectItem value='Low Stock'>Low Stock</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className='space-y-2'>
                <Label htmlFor='description'>Description</Label>
                <Textarea
                  id='description'
                  name='description'
                  value={formData.description}
                  onChange={handleChange}
                  placeholder='Enter product description'
                  required
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Categories and Gender</CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='space-y-2'>
                <Label>Categories</Label>
                <div className='flex flex-wrap gap-2'>
                  {(
                    [
                      'Perfumes',
                      'Attars',
                      'New Arrivals',
                      'Best Sellers'
                    ] as const
                  ).map((category) => (
                    <Badge
                      key={category}
                      variant={
                        formData.categories.includes(category)
                          ? 'default'
                          : 'secondary'
                      }
                      className='cursor-pointer'
                      onClick={() => handleCategoryChange(category)}
                    >
                      {category}
                    </Badge>
                  ))}
                </div>
              </div>
              <div className='space-y-2'>
                <Label>Gender</Label>
                <div className='flex flex-wrap gap-2'>
                  {(['Men', 'Women', 'Unisex'] as const).map((gender) => (
                    <Badge
                      key={gender}
                      variant={
                        formData.gender.includes(gender)
                          ? 'default'
                          : 'secondary'
                      }
                      className='cursor-pointer'
                      onClick={() => handleGenderChange(gender)}
                    >
                      {gender}
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Colors</CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='grid gap-4 md:grid-cols-2'>
                <div className='space-y-2'>
                  <Label>Add New Color</Label>
                  <div className='space-y-2'>
                    <Input
                      placeholder='Color Value'
                      value={newColor.value}
                      onChange={(e) =>
                        setNewColor((prev) => ({
                          ...prev,
                          value: e.target.value
                        }))
                      }
                    />
                    <Input
                      placeholder='Color Code (e.g., #FF0000)'
                      value={newColor.color}
                      onChange={(e) =>
                        setNewColor((prev) => ({
                          ...prev,
                          color: e.target.value
                        }))
                      }
                    />
                    <Input
                      placeholder='Color Label'
                      value={newColor.label}
                      onChange={(e) =>
                        setNewColor((prev) => ({
                          ...prev,
                          label: e.target.value
                        }))
                      }
                    />
                    <Button type='button' onClick={handleAddColor}>
                      Add Color
                    </Button>
                  </div>
                </div>
                <div className='space-y-2'>
                  <Label>Selected Colors</Label>
                  <div className='grid gap-2'>
                    {formData.colors.map((color) => (
                      <div
                        key={color.id}
                        className={`flex cursor-pointer items-center justify-between rounded-lg border p-4 ${
                          formData.selectedColor.id === color.id
                            ? 'border-primary'
                            : 'border-border'
                        }`}
                        onClick={() => handleColorSelect(color)}
                      >
                        <div className='flex items-center space-x-4'>
                          <div
                            className='h-8 w-8 rounded-full'
                            style={{ backgroundColor: color.color }}
                          />
                          <div>
                            <p className='font-medium'>{color.label}</p>
                            <p className='text-sm text-muted-foreground'>
                              {color.value}
                            </p>
                          </div>
                        </div>
                        <Button
                          variant='ghost'
                          size='icon'
                          onClick={(e) => {
                            e.stopPropagation();
                            handleRemoveColor(color.id);
                          }}
                        >
                          <X className='h-4 w-4' />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Volume Options</CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='grid gap-4 md:grid-cols-2'>
                <div className='space-y-2'>
                  <Label>Add New Volume Option</Label>
                  <div className='space-y-2'>
                    <Input
                      type='number'
                      placeholder='Volume (ml)'
                      value={newVolumeOption.ml || ''}
                      onChange={(e) =>
                        setNewVolumeOption((prev) => ({
                          ...prev,
                          ml: parseInt(e.target.value) || 0
                        }))
                      }
                    />
                    <Input
                      type='number'
                      placeholder='Price'
                      value={newVolumeOption.price || ''}
                      onChange={(e) =>
                        setNewVolumeOption((prev) => ({
                          ...prev,
                          price: parseFloat(e.target.value) || 0
                        }))
                      }
                    />
                    <Button type='button' onClick={handleAddVolumeOption}>
                      Add Volume Option
                    </Button>
                  </div>
                </div>
                <div className='space-y-2'>
                  <Label>Volume Options</Label>
                  <div className='grid gap-2'>
                    {formData.volumeOptions.map((option, index) => (
                      <div
                        key={index}
                        className='flex items-center justify-between rounded-lg border p-4'
                      >
                        <div>
                          <p className='font-medium'>{option.ml}ml</p>
                          <p className='text-sm text-muted-foreground'>
                            ${option.price}
                          </p>
                        </div>
                        <Button
                          variant='ghost'
                          size='icon'
                          onClick={() => {
                            setFormData((prev) => ({
                              ...prev,
                              volumeOptions: prev.volumeOptions.filter(
                                (_, i) => i !== index
                              )
                            }));
                          }}
                        >
                          <X className='h-4 w-4' />
                        </Button>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Specifications</CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='grid gap-4 md:grid-cols-2'>
                <div className='space-y-2'>
                  <Label>Add New Specification</Label>
                  <div className='space-y-2'>
                    <Input
                      placeholder='Key'
                      value={newSpecification.key}
                      onChange={(e) =>
                        setNewSpecification((prev) => ({
                          ...prev,
                          key: e.target.value
                        }))
                      }
                    />
                    <Input
                      placeholder='Value'
                      value={newSpecification.value}
                      onChange={(e) =>
                        setNewSpecification((prev) => ({
                          ...prev,
                          value: e.target.value
                        }))
                      }
                    />
                    <Button type='button' onClick={handleAddSpecification}>
                      Add Specification
                    </Button>
                  </div>
                </div>
                <div className='space-y-2'>
                  <Label>Specifications</Label>
                  <div className='grid gap-2'>
                    {Object.entries(formData.specifications).map(
                      ([key, value]) => (
                        <div
                          key={key}
                          className='flex items-center justify-between rounded-lg border p-4'
                        >
                          <div>
                            <p className='font-medium'>{key}</p>
                            <p className='text-sm text-muted-foreground'>
                              {value}
                            </p>
                          </div>
                          <Button
                            variant='ghost'
                            size='icon'
                            onClick={() => {
                              setFormData((prev) => {
                                const newSpecs = { ...prev.specifications };
                                delete newSpecs[key];
                                return { ...prev, specifications: newSpecs };
                              });
                            }}
                          >
                            <X className='h-4 w-4' />
                          </Button>
                        </div>
                      )
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Fragrance Types</CardTitle>
            </CardHeader>
            <CardContent>
              <div className='flex flex-wrap gap-2'>
                {(
                  [
                    'Floral',
                    'Woody',
                    'Citrus',
                    'Spicy',
                    'Musky',
                    'Sandalwood',
                    'Vanilla',
                    'Oriental',
                    'Gourmand',
                    'Chypre',
                    'Aquatic',
                    'Green',
                    'Fresh',
                    'Musk',
                    'Scented'
                  ] as const
                ).map((fragrance) => (
                  <Badge
                    key={fragrance}
                    variant={
                      formData.fragrance.includes(fragrance)
                        ? 'default'
                        : 'secondary'
                    }
                    className='cursor-pointer'
                    onClick={() => handleFragranceChange(fragrance)}
                  >
                    {fragrance}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className='flex justify-end'>
            <Button type='submit' disabled={loading}>
              {loading ? 'Creating...' : 'Create Product'}
            </Button>
          </div>
        </form>
      </div>
    </PageContainer>
  );
}
