export type Discount = {
  amount: number;
  percentage: number;
};

export type Gender = 'male' | 'female' | 'unisex';

export type VolumeOption = {
  ml: number;
  price: number;
  stock: number;
};

export type Color = {
  name: string;
  code: string;
  imageUrl: string;
};

export type Category = 'perfumes' | 'attars' | 'new-arrivals' | 'best-sellers';

export type Product = {
  id: number;
  title: string;
  srcUrl: string;
  gallery?: string[];
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
  isInStock: boolean;
  isOutOfStock: boolean;
};
