import { Product } from '@/types/product.types';

export const relatedProductData: Product[] = [
  {
    id: 12,
    title: 'Amber Glow Attar',
    srcUrl: '/images/pic12.png',
    gallery: ['/images/pic12.png', '/images/pic10.png', '/images/pic11.png'],
    price: 242,
    discountedPrice: 193.6,
    discount: {
      amount: 48.4,
      percentage: 20
    },
    rating: 4.0,
    description:
      'Amber Glow Attar is a luxurious and unique fragrance that combines the rich, warm notes of amber with the deep, mysterious notes of musk. This attar is perfect for those who want to make a bold statement and stand out from the crowd.',
    gender: ['unisex'],
    colors: [
      {
        name: 'Amber',
        code: 'bg-amber-500',
        imageUrl: '/images/pic12.png'
      },
      {
        name: 'Pink',
        code: 'bg-pink-500',
        imageUrl: '/images/pic10.png'
      },
      {
        name: 'Gold',
        code: 'bg-yellow-400',
        imageUrl: '/images/pic11.png'
      }
    ],
    selectedColor: {
      name: 'Amber',
      code: 'bg-amber-500',
      imageUrl: '/images/pic12.png'
    },
    volumeOptions: [
      { ml: 6, price: 242, stock: 10 },
      { ml: 12, price: 450, stock: 15 },
      { ml: 20, price: 750, stock: 8 }
    ],
    quantity: 1,
    isSale: true,
    specifications: {
      'Fragrance Type': 'Attar',
      Longevity: '8-10 hours',
      Sillage: 'Moderate',
      Ingredients: 'Natural Essential Oils',
      'Country of Origin': 'India'
    },
    isInStock: true,
    isOutOfStock: false
  },
  {
    id: 13,
    title: 'Lavender Mist Perfume',
    srcUrl: '/images/pic13.png',
    gallery: ['/images/pic13.png', '/images/pic10.png', '/images/pic11.png'],
    price: 145,
    discountedPrice: 145,
    discount: {
      amount: 0,
      percentage: 0
    },
    rating: 3.5,
    description:
      'Lavender Mist Perfume is a luxurious and unique fragrance that combines the rich, warm notes of lavender with the deep, mysterious notes of musk. This attar is perfect for those who want to make a bold statement and stand out from the crowd.',
    gender: ['female'],
    colors: [
      {
        name: 'Purple',
        code: 'bg-purple-500',
        imageUrl: '/images/pic13.png'
      },
      {
        name: 'Pink',
        code: 'bg-pink-500',
        imageUrl: '/images/pic10.png'
      },
      {
        name: 'Gold',
        code: 'bg-yellow-400',
        imageUrl: '/images/pic11.png'
      }
    ],
    selectedColor: {
      name: 'Purple',
      code: 'bg-purple-500',
      imageUrl: '/images/pic13.png'
    },
    volumeOptions: [
      { ml: 6, price: 145, stock: 20 },
      { ml: 12, price: 280, stock: 15 },
      { ml: 20, price: 450, stock: 10 }
    ],
    quantity: 1,
    isSale: false,
    specifications: {
      'Fragrance Type': 'Perfume',
      Longevity: '6-8 hours',
      Sillage: 'Light to Moderate',
      Ingredients: 'Essential Oils, Alcohol Base',
      'Country of Origin': 'France'
    },
    isInStock: true,
    isOutOfStock: false
  },
  {
    id: 14,
    title: 'Vetiver Breeze Eau de Toilette',
    srcUrl: '/images/pic14.png',
    gallery: ['/images/pic14.png'],
    price: 180,
    discountedPrice: 180,
    discount: {
      amount: 0,
      percentage: 0
    },
    rating: 4.5,
    description:
      'Vetiver Breeze Eau de Toilette is a refreshing and sophisticated fragrance that combines the earthy notes of vetiver with citrus and woody undertones. Perfect for both casual and formal occasions.',
    gender: ['male', 'unisex'],
    colors: [
      {
        name: 'Green',
        code: 'bg-green-500',
        imageUrl: '/images/pic14.png'
      }
    ],
    selectedColor: {
      name: 'Green',
      code: 'bg-green-500',
      imageUrl: '/images/pic14.png'
    },
    volumeOptions: [
      { ml: 6, price: 180, stock: 18 },
      { ml: 12, price: 340, stock: 12 },
      { ml: 20, price: 550, stock: 8 }
    ],
    quantity: 1,
    isSale: false,
    specifications: {
      'Fragrance Type': 'Eau de Toilette',
      Longevity: '5-7 hours',
      Sillage: 'Moderate',
      Ingredients: 'Vetiver Oil, Essential Oils',
      'Country of Origin': 'France'
    },
    isInStock: true,
    isOutOfStock: false
  },
  {
    id: 15,
    title: 'Patchouli Essence Attar',
    srcUrl: '/images/pic15.png',
    gallery: ['/images/pic15.png'],
    price: 150,
    discountedPrice: 105,
    discount: {
      amount: 45,
      percentage: 30
    },
    rating: 5.0,
    description:
      'Patchouli Essence Attar is a rich and exotic fragrance that combines the deep, earthy notes of patchouli with subtle floral undertones. Perfect for those who appreciate unique and distinctive scents.',
    gender: ['unisex'],
    colors: [
      {
        name: 'Brown',
        code: 'bg-[#4F4631]',
        imageUrl: '/images/pic15.png'
      }
    ],
    selectedColor: {
      name: 'Brown',
      code: 'bg-[#4F4631]',
      imageUrl: '/images/pic15.png'
    },
    volumeOptions: [
      { ml: 6, price: 150, stock: 15 },
      { ml: 12, price: 280, stock: 10 },
      { ml: 20, price: 450, stock: 8 }
    ],
    quantity: 1,
    isSale: true,
    specifications: {
      'Fragrance Type': 'Attar',
      Longevity: '8-10 hours',
      Sillage: 'Strong',
      Ingredients: 'Pure Patchouli Oil, Natural Essential Oils',
      'Country of Origin': 'India'
    },
    isInStock: true,
    isOutOfStock: false
  }
];
