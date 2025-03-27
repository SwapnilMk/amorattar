import { Product } from "@/types/product.types";

export const topSellingData: Product[] = [
    {
        id: 5,
        title: "Rose Attar Elegance",
        srcUrl: "/images/pic5.png",
        gallery: ["/images/pic5.png", "/images/pic10.png", "/images/pic11.png"],
        price: 232,
        discount: {
            amount: 0,
            percentage: 20,
        },
        rating: 5.0,
        fragranceType: "",
        brand: ""
    },
    {
        id: 6,
        title: "Sandalwood Bliss Perfume",
        srcUrl: "/images/pic6.png",
        gallery: ["/images/pic6.png", "/images/pic10.png", "/images/pic11.png"],
        price: 145,
        discount: {
            amount: 0,
            percentage: 0,
        },
        rating: 4.0,
        fragranceType: "",
        brand: ""
    },
    {
        id: 7,
        title: "Citrus Zest Spray",
        srcUrl: "/images/pic7.png",
        gallery: ["/images/pic7.png"],
        price: 80,
        discount: {
            amount: 0,
            percentage: 0,
        },
        rating: 3.0,
        fragranceType: "",
        brand: ""
    },
    {
        id: 8,
        title: "Oud Royale Attar",
        srcUrl: "/images/pic8.png",
        gallery: ["/images/pic8.png"],
        price: 210,
        discount: {
            amount: 0,
            percentage: 0,
        },
        rating: 4.5,
        fragranceType: "",
        brand: ""
    },
];