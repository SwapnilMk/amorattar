import {
  Product,
  Gender,
  AvailabilityStatus,
  Fragrance
} from '@/types/product.types';

export const topSellingData: Product[] = [
  {
    id: '1',
    title: 'Royal Oud Attar',
    srcUrl: '/images/pic1.png',
    gallery: ['/images/pic1.png', '/images/pic2.png', '/images/pic3.png'],
    brand: 'Amor Attar',
    price: 299,
    discountedPrice: 239.2,
    discount: 20,
    rating: 4.8,
    description:
      'Royal Oud Attar is a luxurious and unique fragrance that combines the rich, warm notes of oud with the deep, mysterious notes of musk. This attar is perfect for those who want to make a bold statement and stand out from the crowd.',
    gender: ['Men', 'Unisex'] as Gender[],
    categories: ['Attars', 'Best Sellers'],
    colors: [
      {
        id: 'royal-oud-brown',
        value: 'Brown',
        color: '#4F4631',
        label: 'Brown'
      },
      {
        id: 'royal-oud-gold',
        value: 'Gold',
        color: '#FACC15',
        label: 'Gold'
      }
    ],
    selectedColor: {
      id: 'royal-oud-brown',
      value: 'Brown',
      color: '#4F4631',
      label: 'Brown'
    },
    volumeOptions: [
      { ml: 6, price: 299, discount: 20, discountedPrice: 239.2 },
      { ml: 12, price: 550, discount: 20, discountedPrice: 440 },
      { ml: 20, price: 900, discount: 20, discountedPrice: 720 }
    ],
    selectedVolume: { ml: 6, price: 299, discount: 20, discountedPrice: 239.2 },
    isSale: true,
    specifications: [
      { key: 'Fragrance Type', value: 'Attar' },
      { key: 'Longevity', value: '8-10 hours' },
      { key: 'Sillage', value: 'Strong' },
      { key: 'Ingredients', value: 'Pure Oud Oil, Natural Essential Oils' },
      { key: 'Country of Origin', value: 'India' }
    ],
    fragrance: ['Woody', 'Oriental'] as Fragrance[],
    availabilityStatus: 'In Stock' as AvailabilityStatus,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '2',
    title: 'Rose Gold Perfume',
    srcUrl: '/images/pic2.png',
    gallery: ['/images/pic2.png', '/images/pic1.png', '/images/pic3.png'],
    brand: 'Amor Attar',
    price: 199,
    discountedPrice: 199,
    discount: 0,
    rating: 4.5,
    description:
      'Rose Gold Perfume is a luxurious and unique fragrance that combines the rich, warm notes of rose with the deep, mysterious notes of musk. This perfume is perfect for those who want to make a bold statement and stand out from the crowd.',
    gender: ['Women'] as Gender[],
    categories: ['Perfumes', 'Best Sellers'],
    colors: [
      {
        id: 'rose-gold-pink',
        value: 'Pink',
        color: '#EC4899',
        label: 'Pink'
      },
      {
        id: 'rose-gold-gold',
        value: 'Gold',
        color: '#FACC15',
        label: 'Gold'
      }
    ],
    selectedColor: {
      id: 'rose-gold-pink',
      value: 'Pink',
      color: '#EC4899',
      label: 'Pink'
    },
    volumeOptions: [
      { ml: 6, price: 199, discount: 0, discountedPrice: 199 },
      { ml: 12, price: 380, discount: 0, discountedPrice: 380 },
      { ml: 20, price: 600, discount: 0, discountedPrice: 600 }
    ],
    selectedVolume: { ml: 6, price: 199, discount: 0, discountedPrice: 199 },
    isSale: false,
    specifications: [
      { key: 'Fragrance Type', value: 'Perfume' },
      { key: 'Longevity', value: '6-8 hours' },
      { key: 'Sillage', value: 'Moderate' },
      { key: 'Ingredients', value: 'Essential Oils, Alcohol Base' },
      { key: 'Country of Origin', value: 'France' }
    ],
    fragrance: ['Floral', 'Oriental'] as Fragrance[],
    availabilityStatus: 'In Stock' as AvailabilityStatus,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '3',
    title: 'Musk Mystique Eau de Parfum',
    srcUrl: '/images/pic3.png',
    gallery: ['/images/pic3.png', '/images/pic1.png', '/images/pic2.png'],
    brand: 'Amor Attar',
    price: 249,
    discountedPrice: 199.2,
    discount: 20,
    rating: 4.7,
    description:
      'Musk Mystique Eau de Parfum is a luxurious and unique fragrance that combines the rich, warm notes of musk with the deep, mysterious notes of amber. This perfume is perfect for those who want to make a bold statement and stand out from the crowd.',
    gender: ['Unisex'] as Gender[],
    categories: ['Perfumes', 'Best Sellers'],
    colors: [
      {
        id: 'musk-mystique-black',
        value: 'Black',
        color: '#000000',
        label: 'Black'
      },
      {
        id: 'musk-mystique-gold',
        value: 'Gold',
        color: '#FACC15',
        label: 'Gold'
      }
    ],
    selectedColor: {
      id: 'musk-mystique-black',
      value: 'Black',
      color: '#000000',
      label: 'Black'
    },
    volumeOptions: [
      { ml: 6, price: 249, discount: 20, discountedPrice: 199.2 },
      { ml: 12, price: 450, discount: 20, discountedPrice: 360 },
      { ml: 20, price: 750, discount: 20, discountedPrice: 600 }
    ],
    selectedVolume: { ml: 6, price: 249, discount: 20, discountedPrice: 199.2 },
    isSale: true,
    specifications: [
      { key: 'Fragrance Type', value: 'Eau de Parfum' },
      { key: 'Longevity', value: '8-10 hours' },
      { key: 'Sillage', value: 'Strong' },
      { key: 'Ingredients', value: 'Essential Oils, Alcohol Base' },
      { key: 'Country of Origin', value: 'France' }
    ],
    fragrance: ['Oriental', 'Woody'] as Fragrance[],
    availabilityStatus: 'In Stock' as AvailabilityStatus,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '5',
    title: 'Rose Attar Elegance',
    srcUrl: '/images/pic5.png',
    gallery: ['/images/pic5.png', '/images/pic10.png', '/images/pic11.png'],
    brand: 'Amor Attar',
    price: 232,
    discountedPrice: 185.6,
    discount: 20,
    rating: 5.0,
    description:
      'Rose Attar Elegance is a luxurious and unique fragrance that combines the rich, warm notes of rose with the deep, mysterious notes of musk. This attar is perfect for those who want to make a bold statement and stand out from the crowd.',
    gender: ['Women', 'Unisex'] as Gender[],
    categories: ['Attars', 'Best Sellers'],
    colors: [
      {
        id: 'rose-attar-red',
        value: 'Red',
        color: '#EF4444',
        label: 'Red'
      },
      {
        id: 'rose-attar-pink',
        value: 'Pink',
        color: '#EC4899',
        label: 'Pink'
      },
      {
        id: 'rose-attar-gold',
        value: 'Gold',
        color: '#FACC15',
        label: 'Gold'
      }
    ],
    selectedColor: {
      id: 'rose-attar-red',
      value: 'Red',
      color: '#EF4444',
      label: 'Red'
    },
    volumeOptions: [
      { ml: 6, price: 232, discount: 20, discountedPrice: 185.6 },
      { ml: 12, price: 420, discount: 20, discountedPrice: 336 },
      { ml: 20, price: 680, discount: 20, discountedPrice: 544 }
    ],
    selectedVolume: { ml: 6, price: 232, discount: 20, discountedPrice: 185.6 },
    isSale: true,
    specifications: [
      { key: 'Fragrance Type', value: 'Attar' },
      { key: 'Longevity', value: '8-10 hours' },
      { key: 'Sillage', value: 'Moderate to Strong' },
      { key: 'Ingredients', value: 'Pure Rose Oil, Natural Essential Oils' },
      { key: 'Country of Origin', value: 'India' }
    ],
    fragrance: ['Floral', 'Oriental'] as Fragrance[],
    availabilityStatus: 'In Stock' as AvailabilityStatus,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '6',
    title: 'Sandalwood Bliss Perfume',
    srcUrl: '/images/pic6.png',
    gallery: ['/images/pic6.png', '/images/pic10.png', '/images/pic11.png'],
    brand: 'Amor Attar',
    price: 145,
    discountedPrice: 145,
    discount: 0,
    rating: 4.0,
    description:
      'Sandalwood Bliss Perfume is a luxurious and unique fragrance that combines the rich, warm notes of sandalwood with the deep, mysterious notes of musk. This attar is perfect for those who want to make a bold statement and stand out from the crowd.',
    gender: ['Men', 'Unisex'] as Gender[],
    categories: ['Perfumes', 'Best Sellers'],
    colors: [
      {
        id: 'sandalwood-bliss-brown',
        value: 'Brown',
        color: '#4F4631',
        label: 'Brown'
      },
      {
        id: 'sandalwood-bliss-pink',
        value: 'Pink',
        color: '#EC4899',
        label: 'Pink'
      },
      {
        id: 'sandalwood-bliss-gold',
        value: 'Gold',
        color: '#FACC15',
        label: 'Gold'
      }
    ],
    selectedColor: {
      id: 'sandalwood-bliss-brown',
      value: 'Brown',
      color: '#4F4631',
      label: 'Brown'
    },
    volumeOptions: [
      { ml: 6, price: 145, discount: 0, discountedPrice: 145 },
      { ml: 12, price: 280, discount: 0, discountedPrice: 280 },
      { ml: 20, price: 450, discount: 0, discountedPrice: 450 }
    ],
    selectedVolume: { ml: 6, price: 145, discount: 0, discountedPrice: 145 },
    isSale: false,
    specifications: [
      { key: 'Fragrance Type', value: 'Perfume' },
      { key: 'Longevity', value: '6-8 hours' },
      { key: 'Sillage', value: 'Moderate' },
      { key: 'Ingredients', value: 'Pure Sandalwood Oil, Essential Oils' },
      { key: 'Country of Origin', value: 'India' }
    ],
    fragrance: ['Woody', 'Oriental'] as Fragrance[],
    availabilityStatus: 'In Stock' as AvailabilityStatus,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '7',
    title: 'Citrus Zest Spray',
    srcUrl: '/images/pic7.png',
    gallery: ['/images/pic7.png'],
    brand: 'Amor Attar',
    price: 80,
    discountedPrice: 80,
    discount: 0,
    rating: 3.0,
    description:
      'Citrus Zest Spray is a refreshing and energizing fragrance that combines the vibrant notes of citrus fruits with a subtle woody base. Perfect for daily wear and casual occasions.',
    gender: ['Unisex'] as Gender[],
    categories: ['Perfumes', 'Best Sellers'],
    colors: [
      {
        id: 'citrus-zest-orange',
        value: 'Orange',
        color: '#F97316',
        label: 'Orange'
      }
    ],
    selectedColor: {
      id: 'citrus-zest-orange',
      value: 'Orange',
      color: '#F97316',
      label: 'Orange'
    },
    volumeOptions: [
      { ml: 6, price: 80, discount: 0, discountedPrice: 80 },
      { ml: 12, price: 150, discount: 0, discountedPrice: 150 },
      { ml: 20, price: 240, discount: 0, discountedPrice: 240 }
    ],
    selectedVolume: { ml: 6, price: 80, discount: 0, discountedPrice: 80 },
    isSale: false,
    specifications: [
      { key: 'Fragrance Type', value: 'Spray' },
      { key: 'Longevity', value: '4-5 hours' },
      { key: 'Sillage', value: 'Light' },
      { key: 'Ingredients', value: 'Natural Citrus Extracts, Essential Oils' },
      { key: 'Country of Origin', value: 'Italy' }
    ],
    fragrance: ['Citrus', 'Woody'] as Fragrance[],
    availabilityStatus: 'In Stock' as AvailabilityStatus,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '8',
    title: 'Oud Royale Attar',
    srcUrl: '/images/pic8.png',
    gallery: ['/images/pic8.png'],
    brand: 'Amor Attar',
    price: 210,
    discountedPrice: 210,
    discount: 0,
    rating: 4.5,
    description:
      'Oud Royale Attar is a luxurious and unique fragrance that combines the rich, warm notes of oud with the deep, mysterious notes of musk. This attar is perfect for those who want to make a bold statement and stand out from the crowd.',
    gender: ['Men', 'Unisex'] as Gender[],
    categories: ['Attars', 'Best Sellers'],
    colors: [
      {
        id: 'oud-royale-brown',
        value: 'Brown',
        color: '#2C2416',
        label: 'Brown'
      }
    ],
    selectedColor: {
      id: 'oud-royale-brown',
      value: 'Brown',
      color: '#2C2416',
      label: 'Brown'
    },
    volumeOptions: [
      { ml: 6, price: 210, discount: 0, discountedPrice: 210 },
      { ml: 12, price: 400, discount: 0, discountedPrice: 400 },
      { ml: 20, price: 650, discount: 0, discountedPrice: 650 }
    ],
    selectedVolume: { ml: 6, price: 210, discount: 0, discountedPrice: 210 },
    isSale: false,
    specifications: [
      { key: 'Fragrance Type', value: 'Attar' },
      { key: 'Longevity', value: '10-12 hours' },
      { key: 'Sillage', value: 'Strong' },
      { key: 'Ingredients', value: 'Pure Oud Oil, Natural Essential Oils' },
      { key: 'Country of Origin', value: 'UAE' }
    ],
    fragrance: ['Oriental', 'Woody'] as Fragrance[],
    availabilityStatus: 'In Stock' as AvailabilityStatus,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];
