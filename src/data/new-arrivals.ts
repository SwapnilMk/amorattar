import { Product } from "@/types/product.types";

export const newArrivalsData: Product[] = [
  {
    id: 1,
    title: "Jasmine Bloom Perfume",
    srcUrl: "/images/pic1.png",
    gallery: ["/images/pic1.png", "/images/pic10.png", "/images/pic11.png"],
    price: 120,
    discount: {
      amount: 0,
      percentage: 0,
    },
    rating: 4.5,
    fragranceType: "",
    brand: ""
  },
  {
    id: 2,
    title: "Oud Mystique Attar",
    srcUrl: "/images/pic2.png",
    gallery: ["/images/pic2.png"],
    price: 260,
    discount: {
      amount: 0,
      percentage: 20,
    },
    rating: 3.5,
    fragranceType: "",
    brand: ""
  },
  {
    id: 3,
    title: "Saffron Spice Eau de Parfum",
    srcUrl: "/images/pic3.png",
    gallery: ["/images/pic3.png"],
    price: 180,
    discount: {
      amount: 0,
      percentage: 0,
    },
    rating: 4.5,
    fragranceType: "",
    brand: ""
  },
  {
    id: 4,
    title: "Lemon Grove Spray",
    srcUrl: "/images/pic4.png",
    gallery: ["/images/pic4.png", "/images/pic10.png", "/images/pic11.png"],
    price: 160,
    discount: {
      amount: 0,
      percentage: 30,
    },
    rating: 4.5,
    fragranceType: "",
    brand: ""
  },
];