import { z } from 'zod';

export const colorSchema = z.object({
  id: z.string().min(1, 'Color ID is required'),
  value: z.string().min(1, 'Color value is required'),
  color: z.string().min(1, 'Color code is required'),
  label: z.string().min(1, 'Color label is required')
});

export const volumeOptionSchema = z.object({
  ml: z.number().min(1, 'Volume must be at least 1ml'),
  price: z.number().min(0, 'Price must be positive')
});

export const specificationSchema = z.object({
  key: z.string().min(1, 'Specification key is required'),
  value: z.string().min(1, 'Specification value is required')
});

export const categoryEnum = z.enum([
  'Perfumes',
  'Attars',
  'New Arrivals',
  'Best Sellers'
] as const);
export type CategoryType = z.infer<typeof categoryEnum>;

export const productSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  slug: z.string().min(1, 'Slug is required'),
  srcUrl: z.string().min(1, 'Main image is required'),
  gallery: z.array(z.string()).min(1, 'At least one gallery image is required'),
  brand: z.string().min(1, 'Brand is required'),
  price: z.number().min(0, 'Price must be positive'),
  discountedPrice: z.number().min(0, 'Discounted price must be positive'),
  discount: z.number().min(0).max(100),
  rating: z.number().min(0).max(5).default(0),
  description: z.string().min(1, 'Description is required'),
  gender: z
    .array(z.enum(['Men', 'Women', 'Unisex'] as const))
    .min(1, 'At least one gender is required'),
  categories: z.array(categoryEnum).min(1, 'At least one category is required'),
  colors: z.array(colorSchema).min(1, 'At least one color is required'),
  selectedColor: colorSchema,
  volumeOptions: z
    .array(volumeOptionSchema)
    .min(1, 'At least one volume option is required'),
  selectedVolume: volumeOptionSchema,
  isSale: z.boolean().default(false),
  specifications: z.record(z.string(), z.string()),
  fragrance: z
    .array(
      z.enum([
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
      ] as const)
    )
    .min(1, 'At least one fragrance type is required'),
  availabilityStatus: z.enum([
    'In Stock',
    'Out of Stock',
    'Pre-Order',
    'Low Stock'
  ] as const)
});

export type CreateProductInput = z.infer<typeof productSchema>;
export type UpdateProductInput = Partial<CreateProductInput>;

export const reviewSchema = z.object({
  rating: z.number().min(1).max(5),
  content: z.string().min(10, 'Review must be at least 10 characters')
});
