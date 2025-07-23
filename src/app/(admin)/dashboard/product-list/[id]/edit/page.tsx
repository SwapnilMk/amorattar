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
import { useRouter, useParams } from 'next/navigation';
import { useSession } from '@/components/providers/SessionProvider';
import { toast } from 'sonner';
import { CreateProductInput } from '@/lib/validations/product';
import {
  Gender,
  Fragrance,
  Color,
  AvailabilityStatus,
  VolumeOption
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
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem
} from '@/components/ui/command';
import { Check, ChevronsUpDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Star } from 'lucide-react';
import MultipleSelector, { Option } from '@/components/ui/multiselect';

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
  gender: ['Unisex'],
  categories: ['Perfumes'],
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
  fragrance: ['Floral'],
  availabilityStatus: 'In Stock'
};

// Local type for volume options with all fields
type VolumeOptionFull = {
  ml: number;
  price: number;
  discount: number;
  discountedPrice: number;
};

const fragranceTypes = [
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
  'Scented',
  'Fruity',
  'Herbal',
  'Leather',
  'Amber',
  'Powdery',
  'Aldehydic',
  'Balsamic',
  'Resinous',
  'Smoky',
  'Earthy',
  'Animalic',
  'Metallic',
  'Ozonic',
  'Sweet',
  'Spicy Oriental',
  'Citrus Fresh',
  'Floral Fruity',
  'Woody Oriental',
  'Green Floral',
  'Aquatic Fresh',
  'Coconut',
  'Mint',
  'Tea',
  'Coffee',
  'Chocolate',
  'Vanillic',
  'Spicy Fresh',
  'Citrus Woody',
  'Floral Green',
  'Marine',
  'Incense',
  'Pine',
  'Cedar',
  'Patchouli',
  'Rose',
  'Jasmine',
  'Violet',
  'Peach',
  'Apple',
  'Berry',
  'Tropical',
  'Champaca',
  'Tobacco',
  'Rum',
  'Gin',
  'Whiskey',
  'Honey',
  'Milk',
  'Caramel',
  'Fig',
  'Plum',
  'Pear',
  'Melon',
  'Watermelon',
  'Lotus',
  'Magnolia',
  'Gardenia',
  'Tiare',
  'Ylang-Ylang',
  'Neroli',
  'Orange Blossom',
  'Lily',
  'Mimosa',
  'Freesia',
  'Peony',
  'Dewy',
  'Aromatic',
  'Cypress',
  'Bergamot',
  'Lime',
  'Mandarin',
  'Grapefruit',
  'Pomegranate',
  'Red Fruits',
  'Blackcurrant',
  'Currant',
  'Raspberry',
  'Strawberry',
  'Cherry',
  'Apricot',
  'Pineapple',
  'Mango',
  'Papaya',
  'Guava',
  'Passionfruit',
  'Lychee',
  'Sage',
  'Basil',
  'Thyme',
  'Oud',
  'Ambergris',
  'Cashmere',
  'Suede',
  'Vetiver',
  'Moss',
  'Hay',
  'Wheat',
  'Rice',
  'Saffron',
  'Cardamom',
  'Clove',
  'Nutmeg',
  'Cinnamon',
  'Pepper',
  'Ginger',
  'Anise',
  'Fennel',
  'Licorice',
  'Salt',
  'Seaweed',
  'Tar',
  'Gunpowder',
  'Stone',
  'Concrete',
  'Dusty',
  'Chalky',
  'Iris',
  'Aldehyde',
  'Soap',
  'Powder',
  'Makeup',
  'Lipstick',
  'Leather Suede',
  'Animal Musk',
  'Barnyard',
  'Horse',
  'Amberwood',
  'Balsam',
  'Myrrh',
  'Frankincense',
  'Labdanum',
  'Styrax',
  'Tolu',
  'Peru Balsam',
  'Opoponax',
  'Galbanum',
  'Costus',
  'Castoreum',
  'Civet',
  'Beeswax',
  'Oak',
  'Maple',
  'Walnut',
  'Chestnut',
  'Hazelnut',
  'Almond',
  'Pistachio',
  'Macadamia',
  'Cashew',
  'Coconut Water',
  'Cucumber',
  'Tomato Leaf',
  'Bell Pepper',
  'Carrot',
  'Celery',
  'Pumpkin',
  'Zucchini',
  'Spinach',
  'Artichoke',
  'Asparagus',
  'Rhubarb',
  'Turnip',
  'Radish',
  'Beet',
  'Parsnip',
  'Sweet Potato',
  'Yam',
  'Potato',
  'Onion',
  'Garlic',
  'Shallot',
  'Leek',
  'Chive',
  'Scallion',
  'Truffle',
  'Mushroom',
  'Earth',
  'Soil',
  'Rain',
  'Petrichor',
  'Fog',
  'Mist',
  'Cloud',
  'Wind',
  'Sun',
  'Moon',
  'Star',
  'Galaxy',
  'Cosmos',
  'Universe'
] as const;
const fragranceOptions: Option[] = fragranceTypes.map((type) => ({
  value: type,
  label: type
}));

export default function EditProduct() {
  const router = useRouter();
  const params = useParams();
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
  const [categories, setCategories] = useState<
    { id: string; name: string; slug: string }[]
  >([]);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [isEdit, setIsEdit] = useState(true); // Added isEdit state

  // Fetch categories dynamically
  useEffect(() => {
    async function fetchCategories() {
      try {
        const res = await fetch('/api/categories');
        if (!res.ok) throw new Error('Failed to fetch categories');
        const data = await res.json();
        setCategories(Array.isArray(data) ? data : []);
      } catch (error) {
        setCategories([]);
      }
    }
    fetchCategories();
  }, []);

  // Fetch product data by ID and pre-fill form
  useEffect(() => {
    async function fetchProduct() {
      if (!params || !params.id) return;
      setLoading(true);
      try {
        const res = await fetch(`/api/products/${params.id}`);
        if (!res.ok) throw new Error('Failed to fetch product');
        const data = await res.json();
        setFormData({
          ...initialFormData,
          ...data,
          categories: Array.isArray(data.categories) ? data.categories : [],
          colors: data.colors || [],
          selectedColor: data.selectedColor || initialFormData.selectedColor,
          volumeOptions: (data.volumeOptions || []).map((opt: any) => ({
            ml: opt.ml,
            price: opt.price,
            discount: opt.discount ?? 0,
            discountedPrice: opt.discountedPrice ?? 0
          })),
          selectedVolume:
            data.selectedVolume && typeof data.selectedVolume === 'object'
              ? {
                  ml: data.selectedVolume.ml ?? 0,
                  price: data.selectedVolume.price ?? 0,
                  discount: data.selectedVolume.discount ?? 0,
                  discountedPrice: data.selectedVolume.discountedPrice ?? 0
                }
              : initialFormData.selectedVolume,
          specifications: data.specifications
            ? Object.fromEntries(
                (Array.isArray(data.specifications)
                  ? data.specifications
                  : Object.entries(data.specifications)
                ).map((spec: any) =>
                  Array.isArray(spec) ? spec : [spec.key, spec.value]
                )
              )
            : {},
          fragrance: data.fragrance || [],
          availabilityStatus: data.availabilityStatus || 'In Stock',
          srcUrl: data.srcUrl || '',
          gallery: data.gallery || []
        });
        setMainImagePreview(data.srcUrl || '');
        setGalleryPreviews(data.gallery || []);
        setIsEdit(true); // Set isEdit to true for edit
      } catch (error) {
        setError('Failed to fetch product');
      } finally {
        setLoading(false);
      }
    }
    fetchProduct();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [params.id]);

  // Handlers (copied from add-product)
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

  const handleCategoryChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      categories: prev.categories.includes(value)
        ? prev.categories.filter((c) => c !== value)
        : [...prev.categories, value]
    }));
  };

  const handleFragranceChange = (value: string) => {
    setFormData((prev) => ({
      ...prev,
      fragrance: prev.fragrance.includes(value)
        ? prev.fragrance.filter((f) => f !== value)
        : [...prev.fragrance, value]
    }));
  };

  const convertFileToBase64 = async (file: File): Promise<string> => {
    const buffer = await file.arrayBuffer();
    const base64 = Buffer.from(buffer).toString('base64');
    return `data:${file.type};base64,${base64}`;
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

  const handleVolumeSelect = (volume: VolumeOptionFull) => {
    setFormData((prev) => ({
      ...prev,
      selectedVolume: volume,
      price: volume.price,
      discountedPrice: volume.price * (1 - prev.discount / 100)
    }));
  };

  const handleAddVolumeOption = () => {
    if (!newVolumeOption.ml || !newVolumeOption.price) {
      toast.error('Please fill in all volume option fields');
      return;
    }

    const newVolume = {
      ml: newVolumeOption.ml,
      price: newVolumeOption.price,
      discount: 0,
      discountedPrice: newVolumeOption.price
    };

    setFormData((prev) => ({
      ...prev,
      volumeOptions: [...prev.volumeOptions, newVolume],
      selectedVolume:
        prev.volumeOptions.length === 0 ? newVolume : prev.selectedVolume,
      price: prev.volumeOptions.length === 0 ? newVolume.price : prev.price,
      discountedPrice:
        prev.volumeOptions.length === 0 ? newVolume.price : prev.discountedPrice
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

  const handleRemoveGalleryImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      gallery: prev.gallery.filter((_, i) => i !== index)
    }));
    setGalleryPreviews((prev) => prev.filter((_, i) => i !== index));
    setGalleryImages((prev) => prev.filter((_, i) => i !== index));
  };

  // Submit handler (PUT)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user || user.role !== 'admin') {
      router.push('/sign-in');
      return;
    }
    setLoading(true);
    setError('');
    try {
      const slug = slugify(formData.title, { lower: true });
      // Convert specifications from record (UI) to array (DB/API)
      const data = {
        ...formData,
        slug,
        categories: formData.categories.filter(
          (c): c is string => typeof c === 'string' && !!c
        ),
        specifications: formData.specifications // API expects record, API will convert to array
      };
      const response = await fetch(`/api/products/${params.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to update product');
      }
      toast.success('Product updated successfully');
      setShowSuccessModal(true);
      // router.push('/dashboard/product-list'); // Remove immediate redirect
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : 'Failed to update product'
      );
    } finally {
      setLoading(false);
    }
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
          <h1 className='text-2xl font-bold'>Edit Product</h1>
        </div>
        {error && <div className='mb-2 text-sm text-red-500'>{error}</div>}
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
              <div className='grid grid-cols-2 gap-4'>
                <div className='space-y-2'>
                  <Label>Product Name</Label>
                  <Input
                    type='text'
                    name='title'
                    value={formData.title}
                    onChange={handleChange}
                  />
                </div>
                <div className='space-y-2'>
                  <Label>Brand</Label>
                  <Input
                    type='text'
                    name='brand'
                    value={formData.brand}
                    onChange={handleChange}
                  />
                </div>
                <div className='space-y-2'>
                  <Label>Availability Status</Label>
                  <Select
                    onValueChange={(value) =>
                      setFormData((prev) => ({
                        ...prev,
                        availabilityStatus: value as AvailabilityStatus
                      }))
                    }
                    value={formData.availabilityStatus}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder='Select availability status' />
                    </SelectTrigger>
                    <SelectContent>
                      {[
                        'In Stock',
                        'Out of Stock',
                        'Pre-Order',
                        'Low Stock'
                      ].map((status) => (
                        <SelectItem key={status} value={status}>
                          {status}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className='space-y-2'>
                  <Label>Description</Label>
                  <Textarea
                    name='description'
                    value={formData.description}
                    onChange={handleChange}
                  />
                </div>
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
                    categories.map((category) => {
                      const isSelected = formData.categories
                        .map((c) =>
                          typeof c === 'string' ? c.trim().toLowerCase() : ''
                        )
                        .includes(category.name.trim().toLowerCase());
                      return (
                        <Badge
                          key={category.name}
                          variant={isSelected ? 'default' : 'secondary'}
                          className='flex cursor-pointer items-center gap-1'
                          onClick={() => handleCategoryChange(category.name)}
                        >
                          {isSelected && <Check className='mr-1 h-3 w-3' />}
                          {category.name}
                        </Badge>
                      );
                    })
                  ) : (
                    <span className='text-muted-foreground'>
                      No categories found
                    </span>
                  )}
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
                      onClick={() => handleGenderChange(gender as Gender)}
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
                        className={`flex cursor-pointer items-center justify-between rounded-lg border p-4 ${formData.selectedColor.id === color.id ? 'border-primary' : 'border-border'}`}
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
                      placeholder='Price (in ₹)'
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
                              value={option.discount}
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
                                  : (prev.selectedVolume as VolumeOptionFull)
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
                          setFormData((prev) => ({ ...prev, rating: star }));
                        }}
                        className='focus:outline-none'
                      >
                        <Star
                          className={`h-6 w-6 ${star <= formData.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                        />
                      </button>
                    ))}
                    <span className='ml-2 text-sm text-muted-foreground'>
                      {formData.rating.toFixed(1)}/5
                    </span>
                  </div>
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
                    onChange={(selected: Option[]) =>
                      setFormData((prev) => ({
                        ...prev,
                        fragrance: selected.map((opt) => opt.value)
                      }))
                    }
                    hideClearAllButton
                    hidePlaceholderWhenSelected
                    emptyIndicator={
                      <p className='text-center text-sm'>No results found</p>
                    }
                  />
                </div>
                <div className='flex flex-wrap gap-2'>
                  {formData.fragrance.map((fragrance) => (
                    <Badge
                      key={fragrance}
                      variant='default'
                      className='cursor-pointer'
                      onClick={() => handleFragranceChange(fragrance)}
                    >
                      {fragrance}
                      <X className='ml-1 h-3 w-3' />
                    </Badge>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          <div className='flex justify-end'>
            <Button type='submit' disabled={loading}>
              {loading ? 'Updating...' : 'Update Product'}
            </Button>
          </div>
        </form>
      </div>
      {/* Success Modal */}
      {showSuccessModal && (
        <div className='fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50'>
          <div className='flex flex-col items-center rounded-lg bg-white p-8 shadow-lg'>
            <h2 className='mb-4 text-xl font-bold'>
              Product {isEdit ? 'Updated' : 'Created'}!
            </h2>
            <p className='mb-2'>
              Your product <strong>{formData.title}</strong> was{' '}
              {isEdit ? 'updated' : 'added'} successfully.
            </p>
            <div className='mt-4 flex gap-2'>
              <Button onClick={() => router.push('/dashboard/product-list')}>
                Go to Product List
              </Button>
              <Button
                variant='outline'
                onClick={() => setShowSuccessModal(false)}
              >
                {isEdit ? 'Continue Editing' : 'Add Another Product'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </PageContainer>
  );
}
