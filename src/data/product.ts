import {
  Product,
  Gender,
  ProductCategory,
  AvailabilityStatus,
  Fragrance
} from '@/types/product.types';

export const relatedProductData: Product[] = [
  {
    id: '12',
    title: 'Amber Glow Attar',
    srcUrl: '/images/pic12.png',
    gallery: ['/images/pic12.png', '/images/pic10.png', '/images/pic11.png'],
    brand: 'Amor Attar',
    price: 242,
    discountedPrice: 193.6,
    discount: 20,
    rating: 4.0,
    description:
      'Amber Glow Attar is a luxurious and unique fragrance that combines the rich, warm notes of amber with the deep, mysterious notes of musk. This attar is perfect for those who want to make a bold statement and stand out from the crowd.',
    gender: ['Unisex'] as Gender[],
    categories: [
      {
        id: '1',
        productId: '12',
        categoryId: '1',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        category: {
          id: '1',
          name: 'Attars',
          slug: 'attars',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
      },
      {
        id: '2',
        productId: '12',
        categoryId: '2',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        category: {
          id: '2',
          name: 'Best Sellers',
          slug: 'best-sellers',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
      }
    ],
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
    selectedVolume: { ml: 6, price: 242 },
    isSale: true,
    specifications: [
      { key: 'Fragrance Type', value: 'Attar' },
      { key: 'Longevity', value: '8-10 hours' },
      { key: 'Sillage', value: 'Moderate' },
      { key: 'Ingredients', value: 'Natural Essential Oils' },
      { key: 'Country of Origin', value: 'India' }
    ],
    fragrance: ['Oriental', 'Woody'] as Fragrance[],
    availabilityStatus: 'In Stock' as AvailabilityStatus,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '13',
    title: 'Lavender Mist Perfume',
    srcUrl: '/images/pic13.png',
    gallery: ['/images/pic13.png', '/images/pic10.png', '/images/pic11.png'],
    brand: 'Amor Attar',
    price: 145,
    discountedPrice: 145,
    discount: 0,
    rating: 3.5,
    description:
      'Lavender Mist Perfume is a luxurious and unique fragrance that combines the rich, warm notes of lavender with the deep, mysterious notes of musk. This attar is perfect for those who want to make a bold statement and stand out from the crowd.',
    gender: ['Women'] as Gender[],
    categories: [
      {
        id: '3',
        productId: '13',
        categoryId: '3',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        category: {
          id: '3',
          name: 'Perfumes',
          slug: 'perfumes',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
      },
      {
        id: '4',
        productId: '13',
        categoryId: '4',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        category: {
          id: '4',
          name: 'New Arrivals',
          slug: 'new-arrivals',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
      }
    ],
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
    selectedVolume: { ml: 6, price: 145 },
    isSale: false,
    specifications: [
      { key: 'Fragrance Type', value: 'Perfume' },
      { key: 'Longevity', value: '6-8 hours' },
      { key: 'Sillage', value: 'Light to Moderate' },
      { key: 'Ingredients', value: 'Essential Oils, Alcohol Base' },
      { key: 'Country of Origin', value: 'France' }
    ],
    fragrance: ['Floral', 'Fresh'] as Fragrance[],
    availabilityStatus: 'In Stock' as AvailabilityStatus,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '14',
    title: 'Vetiver Breeze Eau de Toilette',
    srcUrl: '/images/pic14.png',
    gallery: ['/images/pic14.png'],
    brand: 'Amor Attar',
    price: 180,
    discountedPrice: 180,
    discount: 0,
    rating: 4.5,
    description:
      'Vetiver Breeze Eau de Toilette is a refreshing and sophisticated fragrance that combines the earthy notes of vetiver with citrus and woody undertones. Perfect for both casual and formal occasions.',
    gender: ['Men', 'Unisex'] as Gender[],
    categories: [
      {
        id: '5',
        productId: '14',
        categoryId: '5',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        category: {
          id: '5',
          name: 'Perfumes',
          slug: 'perfumes',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
      },
      {
        id: '6',
        productId: '14',
        categoryId: '6',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        category: {
          id: '6',
          name: 'Best Sellers',
          slug: 'best-sellers',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
      }
    ],
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
    selectedVolume: { ml: 6, price: 180 },
    isSale: false,
    specifications: [
      { key: 'Fragrance Type', value: 'Eau de Toilette' },
      { key: 'Longevity', value: '5-7 hours' },
      { key: 'Sillage', value: 'Moderate' },
      { key: 'Ingredients', value: 'Vetiver Oil, Essential Oils' },
      { key: 'Country of Origin', value: 'France' }
    ],
    fragrance: ['Woody', 'Green'] as Fragrance[],
    availabilityStatus: 'In Stock' as AvailabilityStatus,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '15',
    title: 'Patchouli Essence Attar',
    srcUrl: '/images/pic15.png',
    gallery: ['/images/pic15.png'],
    brand: 'Amor Attar',
    price: 150,
    discountedPrice: 105,
    discount: 30,
    rating: 5.0,
    description:
      'Patchouli Essence Attar is a rich and exotic fragrance that combines the deep, earthy notes of patchouli with subtle floral undertones. Perfect for those who appreciate unique and distinctive scents.',
    gender: ['Unisex'] as Gender[],
    categories: [
      {
        id: '7',
        productId: '15',
        categoryId: '7',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        category: {
          id: '7',
          name: 'Attars',
          slug: 'attars',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
      },
      {
        id: '8',
        productId: '15',
        categoryId: '8',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        category: {
          id: '8',
          name: 'New Arrivals',
          slug: 'new-arrivals',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
      }
    ],
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
    selectedVolume: { ml: 6, price: 150 },
    isSale: true,
    specifications: [
      { key: 'Fragrance Type', value: 'Attar' },
      { key: 'Longevity', value: '8-10 hours' },
      { key: 'Sillage', value: 'Strong' },
      {
        key: 'Ingredients',
        value: 'Pure Patchouli Oil, Natural Essential Oils'
      },
      { key: 'Country of Origin', value: 'India' }
    ],
    fragrance: ['Woody', 'Oriental'] as Fragrance[],
    availabilityStatus: 'In Stock' as AvailabilityStatus,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];
