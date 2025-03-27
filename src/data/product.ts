import { Product } from "@/types/product.types";

export const relatedProductData: Product[] = [
  {
    id: 12,
    title: "Amber Glow Attar",
    srcUrl: "/images/pic12.png",
    gallery: ["/images/pic12.png", "/images/pic10.png", "/images/pic11.png"],
    price: 242,
    discount: {
      amount: 0,
      percentage: 20,
    },
    rating: 4.0,
    fragranceType: "",
    brand: ""
  },
  {
    id: 13,
    title: "Lavender Mist Perfume",
    srcUrl: "/images/pic13.png",
    gallery: ["/images/pic13.png", "/images/pic10.png", "/images/pic11.png"],
    price: 145,
    discount: {
      amount: 0,
      percentage: 0,
    },
    rating: 3.5,
    fragranceType: "",
    brand: ""
  },
  {
    id: 14,
    title: "Vetiver Breeze Eau de Toilette",
    srcUrl: "/images/pic14.png",
    gallery: ["/images/pic14.png"],
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
    id: 15,
    title: "Patchouli Essence Attar",
    srcUrl: "/images/pic15.png",
    gallery: ["/images/pic15.png"],
    price: 150,
    discount: {
      amount: 0,
      percentage: 30,
    },
    rating: 5.0,
    fragranceType: "",
    brand: ""
  },
];