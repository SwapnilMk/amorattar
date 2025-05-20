import { Product } from '@/types/product.types';

export const topSellingData: Product[] = [
  {
    id: 5,
    title: 'Rose Attar Elegance',
    srcUrl: '/images/pic5.png',
    gallery: ['/images/pic5.png', '/images/pic10.png', '/images/pic11.png'],
    price: 232,
    discountedPrice: 185.6,
    discount: {
      amount: 46.4,
      percentage: 20
    },
    rating: 5.0,
    description:
      'Rose Attar Elegance is a luxurious and unique fragrance that combines the rich, warm notes of rose with the deep, mysterious notes of musk. This attar is perfect for those who want to make a bold statement and stand out from the crowd.',
    gender: ['female', 'unisex'],
    colors: [
      {
        name: 'Red',
        code: 'bg-red-500',
        imageUrl: '/images/pic5.png'
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
      name: 'Red',
      code: 'bg-red-500',
      imageUrl: '/images/pic5.png'
    },
    volumeOptions: [
      { ml: 6, price: 232, stock: 20 },
      { ml: 12, price: 420, stock: 15 },
      { ml: 20, price: 680, stock: 10 }
    ],
    quantity: 1,
    isSale: true,
    specifications: {
      'Fragrance Type': 'Attar',
      Longevity: '8-10 hours',
      Sillage: 'Moderate to Strong',
      Ingredients: 'Pure Rose Oil, Natural Essential Oils',
      'Country of Origin': 'India'
    },
    isInStock: true,
    isOutOfStock: false
  },
  {
    id: 6,
    title: 'Sandalwood Bliss Perfume',
    srcUrl: '/images/pic6.png',
    gallery: ['/images/pic6.png', '/images/pic10.png', '/images/pic11.png'],
    price: 145,
    discountedPrice: 145,
    discount: {
      amount: 0,
      percentage: 0
    },
    rating: 4.0,
    description:
      'Sandalwood Bliss Perfume is a luxurious and unique fragrance that combines the rich, warm notes of sandalwood with the deep, mysterious notes of musk. This attar is perfect for those who want to make a bold statement and stand out from the crowd.',
    gender: ['male', 'unisex'],
    colors: [
      {
        name: 'Brown',
        code: 'bg-[#4F4631]',
        imageUrl: '/images/pic6.png'
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
      name: 'Brown',
      code: 'bg-[#4F4631]',
      imageUrl: '/images/pic6.png'
    },
    volumeOptions: [
      { ml: 6, price: 145, stock: 25 },
      { ml: 12, price: 280, stock: 20 },
      { ml: 20, price: 450, stock: 15 }
    ],
    quantity: 1,
    isSale: false,
    specifications: {
      'Fragrance Type': 'Perfume',
      Longevity: '6-8 hours',
      Sillage: 'Moderate',
      Ingredients: 'Pure Sandalwood Oil, Essential Oils',
      'Country of Origin': 'India'
    },
    isInStock: true,
    isOutOfStock: false
  },
  {
    id: 7,
    title: 'Citrus Zest Spray',
    srcUrl: '/images/pic7.png',
    gallery: ['/images/pic7.png'],
    price: 80,
    discountedPrice: 80,
    discount: {
      amount: 0,
      percentage: 0
    },
    rating: 3.0,
    description:
      'Citrus Zest Spray is a refreshing and energizing fragrance that combines the vibrant notes of citrus fruits with a subtle woody base. Perfect for daily wear and casual occasions.',
    gender: ['unisex'],
    colors: [
      {
        name: 'Orange',
        code: 'bg-orange-500',
        imageUrl: '/images/pic7.png'
      }
    ],
    selectedColor: {
      name: 'Orange',
      code: 'bg-orange-500',
      imageUrl: '/images/pic7.png'
    },
    volumeOptions: [
      { ml: 6, price: 80, stock: 30 },
      { ml: 12, price: 150, stock: 25 },
      { ml: 20, price: 240, stock: 20 }
    ],
    quantity: 1,
    isSale: false,
    specifications: {
      'Fragrance Type': 'Spray',
      Longevity: '4-5 hours',
      Sillage: 'Light',
      Ingredients: 'Natural Citrus Extracts, Essential Oils',
      'Country of Origin': 'Italy'
    },
    isInStock: true,
    isOutOfStock: false
  },
  {
    id: 8,
    title: 'Oud Royale Attar',
    srcUrl: '/images/pic8.png',
    gallery: ['/images/pic8.png'],
    price: 210,
    discountedPrice: 210,
    discount: {
      amount: 0,
      percentage: 0
    },
    rating: 4.5,
    description:
      'Oud Royale Attar is a luxurious and unique fragrance that combines the rich, warm notes of oud with the deep, mysterious notes of musk. This attar is perfect for those who want to make a bold statement and stand out from the crowd.',
    gender: ['male', 'unisex'],
    colors: [
      {
        name: 'Dark Brown',
        code: 'bg-[#2C2416]',
        imageUrl: '/images/pic8.png'
      }
    ],
    selectedColor: {
      name: 'Dark Brown',
      code: 'bg-[#2C2416]',
      imageUrl: '/images/pic8.png'
    },
    volumeOptions: [
      { ml: 6, price: 210, stock: 15 },
      { ml: 12, price: 400, stock: 10 },
      { ml: 20, price: 650, stock: 8 }
    ],
    quantity: 1,
    isSale: false,
    specifications: {
      'Fragrance Type': 'Attar',
      Longevity: '10-12 hours',
      Sillage: 'Strong',
      Ingredients: 'Pure Oud Oil, Natural Essential Oils',
      'Country of Origin': 'UAE'
    },
    isInStock: true,
    isOutOfStock: false
  }
];
