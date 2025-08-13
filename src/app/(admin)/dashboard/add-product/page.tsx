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
import { useState, useCallback, useEffect } from 'react';
import { useDropzone } from 'react-dropzone';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useSession } from '@/components/providers/SessionProvider';
import { toast } from 'sonner';
import {
  CreateProductInput,
  validateProductForm,
  ValidationErrors
} from '@/lib/validations/product';
import type {
  VolumeOption,
  Color,
  Gender,
  Fragrance,
  AvailabilityStatus
} from '@/types/product.types';
import { Badge } from '@/components/ui/badge';
import { X } from 'lucide-react';
import slugify from 'slugify';
import { Switch } from '@/components/ui/switch';
import { HexColorPicker } from 'react-colorful';
import {
  Popover,
  PopoverContent,
  PopoverTrigger
} from '@/components/ui/popover';
import { ChevronsUpDown } from 'lucide-react';
import { Star } from 'lucide-react';
import MultipleSelector, { Option } from '@/components/ui/multiselect';
import { fragranceTypes } from '@/constants/data';
import { ErrorMessage, FieldError } from '@/components/ui/error-message';

const initialFormData: CreateProductInput = {
  title: '',
  slug: '',
  srcUrl: '',
  gallery: [],
  brand: '',
  price: 0,
  discountedPrice: 0,
  discount: 0,
  rating: 0,
  description: '',
  gender: [] as Gender[],
  categories: [],
  colors: [],
  selectedColor: {
    id: '',
    value: '',
    color: '',
    label: ''
  },
  volumeOptions: [],
  selectedVolume: {
    ml: 0,
    price: 0,
    discount: 0,
    discountedPrice: 0
  },
  isSale: false,
  specifications: {},
  fragrance: [] as Fragrance[],
  availabilityStatus: 'In Stock'
};

const fragranceOptions: Option[] = fragranceTypes.map((type) => ({
  value: type,
  label: type
}));

const DEFAULT_SPECIFICATIONS = {
  Concentration:
    'Long-lasting fragrance (Attar – Pure oil-based, no mixture / Perfume – Eau De Parfum or higher)',
  Occasion: 'Office, Daily Wear, Casual Outings, Special Events',
  'Volume (in ml)':
    'Perfume: 8ml / 10ml / 20ml / 30ml / 50ml / 100ml; Attar: 6ml / 12ml / 24ml / 48ml',
  'Bottle Material': 'Premium Glass Bottle'
};

export default function AddProduct() {
  const router = useRouter();
  const { user } = useSession();
  const [loading, setLoading] = useState(false);
  const [validationErrors, setValidationErrors] = useState<ValidationErrors>(
    {}
  );
  const [formData, setFormData] = useState<
    Omit<
      CreateProductInput,
      'volumeOptions' | 'selectedVolume' | 'fragrance'
    > & {
      volumeOptions: VolumeOption[];
      selectedVolume: VolumeOption;
      fragrance: string[];
    }
  >(initialFormData as any);
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
  // Update newVolumeOption to include discount and discountedPrice
  const [newVolumeOption, setNewVolumeOption] = useState<VolumeOption>({
    ml: 0,
    price: 0,
    discount: 0,
    discountedPrice: 0
  });
  const [newSpecification, setNewSpecification] = useState({
    key: '',
    value: ''
  });
  // --- Add categories state and fetch logic ---
  const [categories, setCategories] = useState<
    { id: string; name: string; slug: string }[]
  >([]);
  useEffect(() => {
    fetch('/api/categories')
      .then((res) => res.json())
      .then((data) =>
        Array.isArray(data) ? setCategories(data) : setCategories([])
      )
      .catch(() => setCategories([]));
  }, []);

  const clearValidationError = (fieldName: string) => {
    if (validationErrors[fieldName]) {
      setValidationErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[fieldName];
        return newErrors;
      });
    }
  };

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

    clearValidationError(name);
  };

  const handleGenderChange = (value: Gender) => {
    setFormData((prev) => ({
      ...prev,
      gender: prev.gender.includes(value)
        ? prev.gender.filter((g) => g !== value)
        : [...prev.gender, value]
    }));

    clearValidationError('gender');
  };

  const handleCategoryChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      categories: prev.categories.includes(value)
        ? prev.categories.filter((c) => c !== value)
        : [...prev.categories, value]
    }));

    clearValidationError('categories');
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
        setFormData((prev) => ({
          ...prev,
          srcUrl: result.secure_url,
          gallery: [result.secure_url, ...prev.gallery]
        }));

        // Clear srcUrl validation error when image is uploaded
        clearValidationError('srcUrl');
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
    if (!newColor.value || !newColor.color || !newColor.label) {
      return;
    }

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

    clearValidationError('colors');
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

  // Update handleVolumeSelect to update selectedVolume
  const handleVolumeSelect = (volume: VolumeOption) => {
    setFormData((prev) => ({
      ...prev,
      selectedVolume: volume
    }));
  };

  const handleAddVolumeOption = () => {
    if (!newVolumeOption.ml || !newVolumeOption.price) {
      toast.error('Please fill in all volume option fields');
      return;
    }

    const discount = newVolumeOption.discount || 0;
    const discountedPrice = newVolumeOption.price * (1 - discount / 100);
    const newVolume = {
      ml: newVolumeOption.ml,
      price: newVolumeOption.price,
      discount,
      discountedPrice
    };

    setFormData((prev) => ({
      ...prev,
      volumeOptions: [...prev.volumeOptions, newVolume],
      selectedVolume:
        prev.volumeOptions.length === 0 ? newVolume : prev.selectedVolume
    }));

    setNewVolumeOption({
      ml: 0,
      price: 0,
      discount: 0,
      discountedPrice: 0
    });

    clearValidationError('volumeOptions');
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

    setNewSpecification({ key: '', value: '' });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || user.role !== 'admin') {
      router.push('/sign-in');
      return;
    }

    setLoading(true);

    try {
      // Frontend validation
      const errors = validateProductForm(formData);

      if (Object.keys(errors).length > 0) {
        setValidationErrors(errors);
        setLoading(false);
        toast.error(Object.values(errors)[0][0]);
        return;
      }

      const slug = slugify(formData.title, { lower: true });
      const specifications =
        formData.specifications &&
        Object.keys(formData.specifications).length > 0
          ? formData.specifications
          : { ...DEFAULT_SPECIFICATIONS };

      const data = {
        ...formData,
        slug,
        categories: formData.categories,
        fragrance: formData.fragrance as any,
        specifications
      };

      const response = await fetch('/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (!response.ok) {
        const error = await response.json();
        console.error('API Error:', error);

        if (error.errors && Array.isArray(error.errors)) {
          const backendErrors: ValidationErrors = {};
          error.errors.forEach((err: any) => {
            const field = err.path?.[0] || 'general';

            if (!backendErrors[field]) {
              backendErrors[field] = [];
            }
            backendErrors[field].push(err.message);
          });
          setValidationErrors(backendErrors);
          setLoading(false);
          toast.error('Please fix the validation errors above');
          return;
        }

        // Handle single error message
        if (error.error) {
          setValidationErrors({ general: [error.error] });
          setLoading(false);
          toast.error(error.error);
          return;
        }

        setValidationErrors({ general: ['Failed to create product'] });
        setLoading(false);
        toast.error('Failed to create product');
        return;
      }

      toast.success('Product created successfully');
      setShowSuccessModal(true);
      setValidationErrors({}); // Clear validation errors on success
      // router.push('/dashboard/product-list'); // Remove immediate redirect
    } catch (error) {
      console.error('Error creating product:', error);
      // Don't show toast here since we handle errors in the response block
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

  const convertFileToBase64 = async (file: File): Promise<string> => {
    const buffer = await file.arrayBuffer();
    const base64 = Buffer.from(buffer).toString('base64');
    return `data:${file.type};base64,${base64}`;
  };

  const handleRemoveGalleryImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      gallery: prev.gallery.filter((_, i) => i !== index)
    }));
    setGalleryPreviews((prev) => prev.filter((_, i) => i !== index));
    setGalleryImages((prev) => prev.filter((_, i) => i !== index));
  };

  const [showSuccessModal, setShowSuccessModal] = useState(false);

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
                <div className='space-y-4'>
                  <Label>Main Product Image</Label>
                  <div
                    {...getMainImageRootProps()}
                    className={`cursor-pointer rounded-lg border-2 border-dashed p-4 text-center hover:border-primary ${
                      validationErrors.srcUrl ? 'border-destructive' : ''
                    }`}
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
                  <FieldError error={validationErrors.srcUrl?.[0]} />
                </div>

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
                          <div
                            key={index}
                            className='group relative aspect-square'
                          >
                            <Image
                              src={preview}
                              alt={`Gallery ${index + 1}`}
                              fill
                              className='object-contain'
                            />
                            <Button
                              variant='destructive'
                              size='icon'
                              className='absolute right-2 top-2 opacity-0 transition-opacity group-hover:opacity-100'
                              onClick={() => handleRemoveGalleryImage(index)}
                            >
                              <X className='h-4 w-4' />
                            </Button>
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
                    className={
                      validationErrors.title
                        ? 'border-destructive focus:border-destructive'
                        : ''
                    }
                  />
                  <FieldError error={validationErrors.title?.[0]} />
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
                    className={
                      validationErrors.brand
                        ? 'border-destructive focus:border-destructive'
                        : ''
                    }
                  />
                  <FieldError error={validationErrors.brand?.[0]} />
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
                  className={
                    validationErrors.description
                      ? 'border-destructive focus:border-destructive'
                      : ''
                  }
                />
                <FieldError error={validationErrors.description?.[0]} />
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
                  {categories.length > 0 ? (
                    categories.map((category) => (
                      <Badge
                        key={category.name}
                        variant={
                          formData.categories.includes(category.name)
                            ? 'default'
                            : 'secondary'
                        }
                        className='cursor-pointer'
                        onClick={() => handleCategoryChange(category.name)}
                      >
                        {category.name}
                      </Badge>
                    ))
                  ) : (
                    <span className='text-muted-foreground'>
                      No categories found
                    </span>
                  )}
                </div>
                <FieldError error={validationErrors.categories?.[0]} />
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
                <FieldError error={validationErrors.gender?.[0]} />
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
                      disabled
                    />
                    <div className='space-y-2'>
                      <Label>Color Picker</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant='outline'
                            className='w-full justify-between'
                            style={{ backgroundColor: newColor.color }}
                          >
                            {newColor.color || 'Pick a color'}
                            <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className='w-full p-3'>
                          <HexColorPicker
                            color={newColor.color}
                            onChange={(color) =>
                              setNewColor((prev) => ({
                                ...prev,
                                color,
                                value: color // auto-fill value with color code
                              }))
                            }
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
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
                    <Button
                      type='button'
                      onClick={handleAddColor}
                      className='w-full'
                    >
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
                            className='h-8 w-8 rounded-full border'
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
                  <FieldError error={validationErrors.colors?.[0]} />
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
                        className={`flex cursor-pointer items-center justify-between rounded-lg border p-4 ${formData.selectedVolume.ml === option.ml ? 'border-primary' : 'border-border'}`}
                        onClick={() => handleVolumeSelect(option)}
                      >
                        <div>
                          <p className='font-medium'>{option.ml}ml</p>
                          <p className='text-sm text-muted-foreground'>
                            ₹{option.price} | Discount: {option.discount || 0}%
                            | ₹{option.discountedPrice}
                          </p>
                          <div className='mt-1 flex gap-2'>
                            <Input
                              type='number'
                              min={0}
                              max={100}
                              value={option.discount > 0 ? option.discount : ''}
                              onChange={(e) => {
                                const discount =
                                  parseFloat(e.target.value) || 0;
                                setFormData((prev) => {
                                  const updatedOptions = prev.volumeOptions.map(
                                    (opt, i) =>
                                      i === index
                                        ? {
                                            ...opt,
                                            discount,
                                            discountedPrice:
                                              opt.price * (1 - discount / 100)
                                          }
                                        : opt
                                  );
                                  const updatedSelected =
                                    prev.selectedVolume.ml === option.ml
                                      ? {
                                          ...prev.selectedVolume,
                                          discount,
                                          discountedPrice:
                                            option.price * (1 - discount / 100)
                                        }
                                      : prev.selectedVolume;
                                  return {
                                    ...prev,
                                    volumeOptions: updatedOptions,
                                    selectedVolume: updatedSelected
                                  };
                                });
                              }}
                              className='w-20'
                              placeholder='Discount %'
                            />
                            <span className='text-xs text-muted-foreground'>
                              %
                            </span>
                          </div>
                        </div>
                        <Button
                          variant='ghost'
                          size='icon'
                          onClick={(e) => {
                            e.stopPropagation();
                            setFormData((prev) => ({
                              ...prev,
                              volumeOptions: prev.volumeOptions.filter(
                                (_, i) => i !== index
                              ),
                              selectedVolume:
                                prev.selectedVolume.ml === option.ml
                                  ? {
                                      ml: 0,
                                      price: 0,
                                      discount: 0,
                                      discountedPrice: 0
                                    }
                                  : prev.selectedVolume
                            }));
                          }}
                        >
                          <X className='h-4 w-4' />
                        </Button>
                      </div>
                    ))}
                  </div>
                  <FieldError error={validationErrors.volumeOptions?.[0]} />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Fragrance Types</CardTitle>
            </CardHeader>
            <CardContent>
              <div className='space-y-4'>
                <div className='space-y-2'>
                  <Label>Add Fragrance Type</Label>
                  <MultipleSelector
                    value={formData.fragrance.map((f) => ({
                      value: f,
                      label: f
                    }))}
                    defaultOptions={fragranceOptions}
                    options={fragranceOptions}
                    placeholder='Select fragrance types'
                    onChange={(selected) => {
                      setFormData((prev) => ({
                        ...prev,
                        fragrance: selected.map((opt) => opt.value)
                      }));

                      clearValidationError('fragrance');
                    }}
                    hideClearAllButton
                    hidePlaceholderWhenSelected
                    emptyIndicator={
                      <p className='text-center text-sm'>No results found</p>
                    }
                  />
                  <FieldError error={validationErrors.fragrance?.[0]} />
                </div>
              </div>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle>Rating & Sale Status</CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='grid gap-4 md:grid-cols-2'>
                <div className='space-y-2'>
                  <Label>Rating</Label>
                  <div className='flex items-center gap-2'>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type='button'
                        onClick={() => {
                          setFormData((prev) => ({
                            ...prev,
                            rating: star
                          }));

                          clearValidationError('rating');
                        }}
                        className='focus:outline-none'
                      >
                        <Star
                          className={`h-6 w-6 ${
                            star <= formData.rating
                              ? 'fill-yellow-400 text-yellow-400'
                              : 'text-gray-300'
                          }`}
                        />
                      </button>
                    ))}
                    <span className='ml-2 text-sm text-muted-foreground'>
                      {formData.rating.toFixed(1)}/5
                    </span>
                  </div>
                  <FieldError error={validationErrors.rating?.[0]} />
                </div>
                <div className='space-y-2'>
                  <Label>Sale Status</Label>
                  <div className='flex items-center space-x-2'>
                    <Switch
                      id='isSale'
                      checked={formData.isSale}
                      onCheckedChange={(checked) =>
                        setFormData((prev) => ({ ...prev, isSale: checked }))
                      }
                    />
                    <Label htmlFor='isSale'>Mark as Sale</Label>
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
          <div className='flex justify-end'>
            <Button type='submit' disabled={loading}>
              {loading ? 'Adding...' : 'Add Product'}
            </Button>
          </div>
        </form>
      </div>
      {showSuccessModal && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
          <div className='flex flex-col items-center rounded-lg bg-white p-8 shadow-lg'>
            <h2 className='mb-4 text-xl font-bold'>Product Created!</h2>
            <p className='mb-2'>
              Your product <strong>{formData.title}</strong> was added
              successfully.
            </p>
            <div className='mt-4 flex gap-2'>
              <Button onClick={() => router.push('/dashboard/product-list')}>
                Go to Product List
              </Button>
              <Button
                variant='outline'
                onClick={() => setShowSuccessModal(false)}
              >
                Add Another Product
              </Button>
            </div>
          </div>
        </div>
      )}
    </PageContainer>
  );
}
