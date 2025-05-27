import {
  Product,
  Gender,
  Category,
  AvailabilityStatus,
  Fragrance
} from '@/types/product.types';

export const relatedProductData: Product[] = [
  {
    id: 12,
    title: 'Amber Glow Attar',
    srcUrl: '/images/pic12.png',
    gallery: ['/images/pic12.png', '/images/pic10.png', '/images/pic11.png'],
    brand: 'Amor Attar',
    price: 242,
    discountedPrice: 193.6,
    discount: {
      amount: 48.4,
      percentage: 20
    },
    rating: 4.0,
    description:
      'Amber Glow Attar is a luxurious and unique fragrance that combines the rich, warm notes of amber with the deep, mysterious notes of musk. This attar is perfect for those who want to make a bold statement and stand out from the crowd.',
    gender: ['Unisex'] as Gender[],
    categories: ['Attars', 'Best Sellers'] as Category[],
    colors: [
      {
        id: 'amber-amber',
        value: 'Amber',
        color: '#F59E0B',
        label: 'Amber'
      },
      {
        id: 'amber-pink',
        value: 'Pink',
        color: '#EC4899',
        label: 'Pink'
      },
      {
        id: 'amber-gold',
        value: 'Gold',
        color: '#FACC15',
        label: 'Gold'
      }
    ],
    selectedColor: {
      id: 'amber-amber',
      value: 'Amber',
      color: '#F59E0B',
      label: 'Amber'
    },
    volumeOptions: [
      { ml: 6, price: 242 },
      { ml: 12, price: 450 },
      { ml: 20, price: 750 }
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
    fragrance: ['Oriental', 'Woody'] as Fragrance[],
    availabilityStatus: 'In Stock' as AvailabilityStatus
  },
  {
    id: 13,
    title: 'Lavender Mist Perfume',
    srcUrl: '/images/pic13.png',
    gallery: ['/images/pic13.png', '/images/pic10.png', '/images/pic11.png'],
    brand: 'Amor Attar',
    price: 145,
    discountedPrice: 145,
    discount: {
      amount: 0,
      percentage: 0
    },
    rating: 3.5,
    description:
      'Lavender Mist Perfume is a luxurious and unique fragrance that combines the rich, warm notes of lavender with the deep, mysterious notes of musk. This attar is perfect for those who want to make a bold statement and stand out from the crowd.',
    gender: ['Women'] as Gender[],
    categories: ['Perfumes', 'New Arrivals'] as Category[],
    colors: [
      {
        id: 'lavender-purple',
        value: 'Purple',
        color: '#A855F7',
        label: 'Purple'
      },
      {
        id: 'lavender-pink',
        value: 'Pink',
        color: '#EC4899',
        label: 'Pink'
      },
      {
        id: 'lavender-gold',
        value: 'Gold',
        color: '#FACC15',
        label: 'Gold'
      }
    ],
    selectedColor: {
      id: 'lavender-purple',
      value: 'Purple',
      color: '#A855F7',
      label: 'Purple'
    },
    volumeOptions: [
      { ml: 6, price: 145 },
      { ml: 12, price: 280 },
      { ml: 20, price: 450 }
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
    fragrance: ['Floral', 'Fresh'] as Fragrance[],
    availabilityStatus: 'In Stock' as AvailabilityStatus
  },
  {
    id: 14,
    title: 'Vetiver Breeze Eau de Toilette',
    srcUrl: '/images/pic14.png',
    gallery: ['/images/pic14.png'],
    brand: 'Amor Attar',
    price: 180,
    discountedPrice: 180,
    discount: {
      amount: 0,
      percentage: 0
    },
    rating: 4.5,
    description:
      'Vetiver Breeze Eau de Toilette is a refreshing and sophisticated fragrance that combines the earthy notes of vetiver with citrus and woody undertones. Perfect for both casual and formal occasions.',
    gender: ['Men', 'Unisex'] as Gender[],
    categories: ['Perfumes', 'Best Sellers'] as Category[],
    colors: [
      {
        id: 'vetiver-green',
        value: 'Green',
        color: '#22C55E',
        label: 'Green'
      }
    ],
    selectedColor: {
      id: 'vetiver-green',
      value: 'Green',
      color: '#22C55E',
      label: 'Green'
    },
    volumeOptions: [
      { ml: 6, price: 180 },
      { ml: 12, price: 340 },
      { ml: 20, price: 550 }
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
    fragrance: ['Woody', 'Green'] as Fragrance[],
    availabilityStatus: 'In Stock' as AvailabilityStatus
  },
  {
    id: 15,
    title: 'Patchouli Essence Attar',
    srcUrl: '/images/pic15.png',
    gallery: ['/images/pic15.png'],
    brand: 'Amor Attar',
    price: 150,
    discountedPrice: 105,
    discount: {
      amount: 45,
      percentage: 30
    },
    rating: 5.0,
    description:
      'Patchouli Essence Attar is a rich and exotic fragrance that combines the deep, earthy notes of patchouli with subtle floral undertones. Perfect for those who appreciate unique and distinctive scents.',
    gender: ['Unisex'] as Gender[],
    categories: ['Attars', 'New Arrivals'] as Category[],
    colors: [
      {
        id: 'patchouli-brown',
        value: 'Brown',
        color: '#4F4631',
        label: 'Brown'
      }
    ],
    selectedColor: {
      id: 'patchouli-brown',
      value: 'Brown',
      color: '#4F4631',
      label: 'Brown'
    },
    volumeOptions: [
      { ml: 6, price: 150 },
      { ml: 12, price: 280 },
      { ml: 20, price: 450 }
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
    fragrance: ['Woody', 'Oriental'] as Fragrance[],
    availabilityStatus: 'In Stock' as AvailabilityStatus
  }
];
