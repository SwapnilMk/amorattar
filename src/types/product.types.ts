export type Discount = {
  amount: number;
  percentage: number;
};

export type Gender = 'Men' | 'Women' | 'Unisex';

export type VolumeOption = {
  ml: number;
  price: number;
};

export type Color = {
  id: string;
  value: string;
  color: string;
  label: string;
};

export type Category = {
  id: string;
  name: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
};

export type ProductCategory = {
  id: string;
  productId: string;
  categoryId: string;
  createdAt: string;
  updatedAt: string;
  category: Category;
};

export type Fragrance =
  | 'Floral'
  | 'Woody'
  | 'Citrus'
  | 'Spicy'
  | 'Musky'
  | 'Sandalwood'
  | 'Vanilla'
  | 'Oriental'
  | 'Gourmand'
  | 'Chypre'
  | 'Aquatic'
  | 'Green'
  | 'Fresh'
  | 'Musk'
  | 'Scented';

export type AvailabilityStatus =
  | 'In Stock'
  | 'Out of Stock'
  | 'Pre-Order'
  | 'Low Stock';

export type Product = {
  id: string;
  title: string;
  srcUrl: string;
  gallery: string[];
  brand: string;
  price: number;
  discountedPrice: number;
  discount: number;
  rating: number;
  description: string;
  gender: Gender[];
  categories: ProductCategory[];
  colors: Color[];
  selectedColor: Color;
  volumeOptions: VolumeOption[];
  selectedVolume: VolumeOption;
  isSale: boolean;
  specifications: Array<{
    key: string;
    value: string;
  }>;
  fragrance: Fragrance[];
  availabilityStatus: AvailabilityStatus;
  createdAt: string;
  updatedAt: string;
};
