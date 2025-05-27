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

export type Category = 'Perfumes' | 'Attars' | 'New Arrivals' | 'Best Sellers';

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
  id: number;
  title: string;
  srcUrl: string;
  gallery?: string[];
  brand: string;
  price: number;
  discountedPrice: number;
  discount: Discount;
  rating: number;
  description: string;
  gender: Gender[];
  categories: Category[];
  colors: Color[];
  selectedColor: Color;
  volumeOptions: VolumeOption[];
  quantity: number;
  isSale: boolean;
  specifications: Record<string, string>;
  fragrance: Fragrance[];
  availabilityStatus: AvailabilityStatus;
};
