import { z } from 'zod';

export const colorSchema = z.object({
  id: z.string().min(1, 'Color ID is required'),
  value: z.string().min(1, 'Color value is required'),
  color: z.string().min(1, 'Color code is required'),
  label: z.string().min(1, 'Color label is required')
});

export const volumeOptionSchema = z.object({
  ml: z.number().min(1, 'Volume must be at least 1ml'),
  price: z.number().min(0, 'Price must be positive'),
  discount: z.number().min(0).max(100).default(0),
  discountedPrice: z.number().min(0, 'Discounted price must be positive')
});

export const specificationSchema = z.object({
  key: z.string().min(1, 'Specification key is required'),
  value: z.string().min(1, 'Specification value is required')
});

export const productSchema = z.object({
  title: z
    .string()
    .min(1, 'Title is required')
    .max(100, 'Title must be less than 100 characters'),
  slug: z.string().min(1, 'Slug is required'),
  srcUrl: z.string().min(1, 'Main image is required'),
  gallery: z.array(z.string()).default([]),
  brand: z
    .string()
    .min(1, 'Brand is required')
    .max(50, 'Brand must be less than 50 characters'),
  price: z.number().min(0, 'Price must be positive'),
  discountedPrice: z.number().min(0, 'Discounted price must be positive'),
  discount: z.number().min(0).max(100),
  rating: z.number().min(0).max(5).default(0),
  description: z
    .string()
    .min(10, 'Description must be at least 10 characters')
    .max(1000, 'Description must be less than 1000 characters'),
  gender: z
    .array(z.enum(['Men', 'Women', 'Unisex'] as const))
    .min(1, 'At least one gender is required'),
  categories: z.array(z.string()).min(1, 'At least one category is required'),
  colors: z.array(colorSchema).min(1, 'At least one color is required'),
  selectedColor: colorSchema,
  volumeOptions: z
    .array(volumeOptionSchema)
    .min(1, 'At least one volume option is required'),
  selectedVolume: volumeOptionSchema,
  isSale: z.boolean().default(false),
  specifications: z.record(z.string(), z.string()),
  fragrance: z
    .array(z.string())
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

// Frontend validation utilities
export interface ValidationErrors {
  [key: string]: string[];
}

export const validateProductForm = (data: any): ValidationErrors => {
  const errors: ValidationErrors = {};

  // Basic field validations
  if (!data.title?.trim()) {
    errors.title = ['Product title is required'];
  } else if (data.title.length > 100) {
    errors.title = ['Product title must be less than 100 characters'];
  }

  if (!data.brand?.trim()) {
    errors.brand = ['Brand name is required'];
  } else if (data.brand.length > 50) {
    errors.brand = ['Brand name must be less than 50 characters'];
  }

  if (!data.description?.trim()) {
    errors.description = ['Product description is required'];
  } else if (data.description.length < 10) {
    errors.description = ['Description must be at least 10 characters'];
  } else if (data.description.length > 1000) {
    errors.description = ['Description must be less than 1000 characters'];
  }

  if (!data.srcUrl?.trim()) {
    errors.srcUrl = ['Main product image is required'];
  }

  if (data.price < 0) {
    errors.price = ['Price must be positive'];
  }

  if (data.discountedPrice < 0) {
    errors.discountedPrice = ['Discounted price must be positive'];
  }

  if (data.discount < 0 || data.discount > 100) {
    errors.discount = ['Discount must be between 0 and 100'];
  }

  if (data.rating < 0 || data.rating > 5) {
    errors.rating = ['Rating must be between 0 and 5'];
  }

  // Gender validation
  if (!data.gender || data.gender.length === 0) {
    errors.gender = ['At least one gender must be selected'];
  }

  // Categories validation
  if (!data.categories || data.categories.length === 0) {
    errors.categories = ['At least one category must be selected'];
  }

  // Colors validation
  if (!data.colors || data.colors.length === 0) {
    errors.colors = ['At least one color must be added'];
  } else {
    data.colors.forEach((color: any, index: number) => {
      if (!color.value?.trim()) {
        if (!errors.colors) errors.colors = [];
        errors.colors.push(`Color ${index + 1}: Color value is required`);
      }
      if (!color.color?.trim()) {
        if (!errors.colors) errors.colors = [];
        errors.colors.push(`Color ${index + 1}: Color code is required`);
      }
      if (!color.label?.trim()) {
        if (!errors.colors) errors.colors = [];
        errors.colors.push(`Color ${index + 1}: Color label is required`);
      }
    });
  }

  // Volume options validation
  if (!data.volumeOptions || data.volumeOptions.length === 0) {
    errors.volumeOptions = ['At least one volume option must be added'];
  } else {
    data.volumeOptions.forEach((option: any, index: number) => {
      if (!option.ml || option.ml <= 0) {
        if (!errors.volumeOptions) errors.volumeOptions = [];
        errors.volumeOptions.push(
          `Volume option ${index + 1}: Volume must be greater than 0`
        );
      }
      if (!option.price || option.price < 0) {
        if (!errors.volumeOptions) errors.volumeOptions = [];
        errors.volumeOptions.push(
          `Volume option ${index + 1}: Price must be positive`
        );
      }
      if (option.discount < 0 || option.discount > 100) {
        if (!errors.volumeOptions) errors.volumeOptions = [];
        errors.volumeOptions.push(
          `Volume option ${index + 1}: Discount must be between 0 and 100`
        );
      }
    });
  }

  // Fragrance validation
  if (!data.fragrance || data.fragrance.length === 0) {
    errors.fragrance = ['At least one fragrance type must be selected'];
  }

  return errors;
};

export const hasValidationErrors = (errors: ValidationErrors): boolean => {
  return Object.keys(errors).length > 0;
};
