export type Discount = {
  amount: number;
  percentage: number;
};

export type Product = {
  fragranceType: string;
  brand: string;
  id: number;
  title: string;
  srcUrl: string;
  gallery?: string[];
  price: number;
  discount: Discount;
  rating: number;
};
