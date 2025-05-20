import { Product } from '@/types/product.types';

export const newArrivalsData: Product[] = [
  {
    id: 1,
    title: 'Jasmine Bloom Perfume',
    srcUrl: '/images/pic1.png',
    gallery: ['/images/pic1.png', '/images/pic10.png', '/images/pic11.png'],
    price: 120,
    discountedPrice: 120,
    discount: {
      amount: 0,
      percentage: 0
    },
    rating: 4.5,
    description:
      'Jasmine Bloom Perfume is a luxurious and unique fragrance that combines the rich, warm notes of jasmine with the deep, mysterious notes of musk. This attar is perfect for those who want to make a bold statement and stand out from the crowd.',
    gender: ['female'],
    colors: [
      {
        name: 'Pink',
        code: 'bg-pink-500',
        imageUrl: '/images/pic1.png'
      },
      {
        name: 'White',
        code: 'bg-white',
        imageUrl: '/images/pic1-white.png'
      },
      {
        name: 'Gold',
        code: 'bg-yellow-400',
        imageUrl: '/images/pic1-gold.png'
      }
    ],
    selectedColor: {
      name: 'Pink',
      code: 'bg-pink-500',
      imageUrl: '/images/pic1.png'
    },
    volumeOptions: [
      { ml: 6, price: 120, stock: 15 },
      { ml: 12, price: 220, stock: 10 },
      { ml: 20, price: 380, stock: 8 }
    ],
    quantity: 1,
    isSale: false,
    specifications: {
      'Fragrance Type': 'Perfume',
      Longevity: '6-8 hours',
      Sillage: 'Moderate',
      Ingredients: 'Natural Jasmine Extract, Essential Oils',
      'Country of Origin': 'India'
    },
    isInStock: true,
    isOutOfStock: false
  },
  {
    id: 2,
    title: 'Oud Mystique Attar',
    srcUrl: '/images/pic2.png',
    gallery: ['/images/pic2.png'],
    price: 260,
    discountedPrice: 208,
    discount: {
      amount: 52,
      percentage: 20
    },
    rating: 3.5,
    description:
      'Oud Mystique Attar is a luxurious and unique fragrance that combines the rich, warm notes of oud with the deep, mysterious notes of musk. This attar is perfect for those who want to make a bold statement and stand out from the crowd.',
    gender: ['male', 'unisex'],
    colors: [
      {
        name: 'Brown',
        code: 'bg-[#4F4631]',
        imageUrl: '/images/pic2.png'
      },
      {
        name: 'Black',
        code: 'bg-black',
        imageUrl: '/images/pic2-black.png'
      },
      {
        name: 'Gold',
        code: 'bg-yellow-400',
        imageUrl: '/images/pic2-gold.png'
      }
    ],
    selectedColor: {
      name: 'Brown',
      code: 'bg-[#4F4631]',
      imageUrl: '/images/pic2.png'
    },
    volumeOptions: [
      { ml: 6, price: 260, stock: 12 },
      { ml: 12, price: 480, stock: 8 },
      { ml: 20, price: 780, stock: 5 }
    ],
    quantity: 1,
    isSale: true,
    specifications: {
      'Fragrance Type': 'Attar',
      Longevity: '10-12 hours',
      Sillage: 'Strong',
      Ingredients: 'Pure Oud Oil, Natural Essential Oils',
      'Country of Origin': 'UAE'
    },
    isInStock: true,
    isOutOfStock: false
  },
  {
    id: 3,
    title: 'Lemon Grove Spray',
    srcUrl: '/images/pic4.png',
    gallery: ['/images/pic4.png', '/images/pic10.png', '/images/pic11.png'],
    price: 160,
    discountedPrice: 144,
    discount: {
      amount: 16,
      percentage: 10
    },
    rating: 4.5,
    description:
      'Lemon Grove Spray is a refreshing and invigorating fragrance that combines the zesty notes of lemon with subtle floral undertones. Perfect for daily wear and special occasions.',
    gender: ['unisex'],
    colors: [
      {
        name: 'Yellow',
        code: 'bg-yellow-400',
        imageUrl: '/images/pic4.png'
      },
      {
        name: 'Green',
        code: 'bg-green-500',
        imageUrl: '/images/pic4-green.png'
      },
      {
        name: 'Blue',
        code: 'bg-blue-500',
        imageUrl: '/images/pic4-blue.png'
      }
    ],
    selectedColor: {
      name: 'Yellow',
      code: 'bg-yellow-400',
      imageUrl: '/images/pic4.png'
    },
    volumeOptions: [
      { ml: 6, price: 160, stock: 20 },
      { ml: 12, price: 300, stock: 15 },
      { ml: 20, price: 480, stock: 10 }
    ],
    quantity: 1,
    isSale: true,
    specifications: {
      'Fragrance Type': 'Spray',
      Longevity: '4-6 hours',
      Sillage: 'Light to Moderate',
      Ingredients: 'Natural Lemon Extract, Essential Oils',
      'Country of Origin': 'Italy'
    },
    isInStock: true,
    isOutOfStock: false
  }
];
