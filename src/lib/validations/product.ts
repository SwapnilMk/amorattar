import { z } from 'zod';

export const colorSchema = z.object({
  name: z.string().min(1, 'Color name is required'),
  code: z.string().min(1, 'Color code is required'),
  imageUrl: z.string().url('Invalid image URL').optional().or(z.literal(''))
});

export const volumeOptionSchema = z.object({
  ml: z.number().min(1, 'Volume must be at least 1ml'),
  price: z.number().min(0, 'Price must be positive'),
  stock: z.number().min(0, 'Stock must be positive')
});

export const specificationSchema = z.object({
  key: z.string().min(1, 'Specification key is required'),
  value: z.string().min(1, 'Specification value is required')
});

export const productSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  description: z.string().min(10, 'Description must be at least 10 characters'),
  price: z.number().min(0, 'Price must be positive'),
  discountedPrice: z.number().min(0, 'Discounted price must be positive'),
  discount: z.object({
    amount: z.number().min(0),
    percentage: z.number().min(0).max(100)
  }),
  gender: z.array(z.enum(['male', 'female', 'unisex'])).min(1, 'Select at least one gender'),
  categories: z.array(z.string()).min(1, 'Select at least one category'),
  colors: z.array(colorSchema).min(1, 'Add at least one color'),
  selectedColor: colorSchema,
  volumeOptions: z.array(volumeOptionSchema).min(1, 'Add at least one volume option'),
  quantity: z.number().min(0, 'Quantity must be positive'),
  isSale: z.boolean(),
  specifications: z.array(specificationSchema),
  isInStock: z.boolean(),
  isOutOfStock: z.boolean()
});

export const reviewSchema = z.object({
  rating: z.number().min(1).max(5),
  content: z.string().min(10, 'Review must be at least 10 characters')
}); 