export type Category = {
  id: string;
  name: string;
  slug: string;
  createdAt: string;
  updatedAt: string;
};

export type VolumeOption = {
  ml: number;
  price: number;
  discount: number;
  discountedPrice: number;
};

export type Color = {
  id: string;
  value: string;
  color: string;
  label: string;
};

export type Gender = 'Men' | 'Women' | 'Unisex';

export type AvailabilityStatus =
  | 'In Stock'
  | 'Out of Stock'
  | 'Pre-Order'
  | 'Low Stock';

export type Fragrance = string;

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
  categories: string[];
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
