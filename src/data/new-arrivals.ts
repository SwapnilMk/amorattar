import {
  Product,
  Gender,
  ProductCategory,
  AvailabilityStatus,
  Fragrance
} from '@/types/product.types';

export const newArrivalsData: Product[] = [
  {
    id: '1',
    title: 'Jasmine Bloom Perfume',
    srcUrl: '/images/pic1.png',
    gallery: ['/images/pic1.png', '/images/pic10.png', '/images/pic11.png'],
    brand: 'Amor Attar',
    price: 120,
    discountedPrice: 120,
    discount: 0,
    rating: 4.5,
    description:
      'Jasmine Bloom Perfume is a luxurious and unique fragrance that combines the rich, warm notes of jasmine with the deep, mysterious notes of musk. This attar is perfect for those who want to make a bold statement and stand out from the crowd.',
    gender: ['Women'] as Gender[],
    categories: [
      {
        id: '19',
        productId: '1',
        categoryId: '19',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        category: {
          id: '19',
          name: 'Perfumes',
          slug: 'perfumes',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
      },
      {
        id: '20',
        productId: '1',
        categoryId: '20',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        category: {
          id: '20',
          name: 'New Arrivals',
          slug: 'new-arrivals',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
      }
    ],
    colors: [
      {
        id: 'jasmine-pink',
        value: 'Pink',
        color: '#EC4899',
        label: 'Pink'
      },
      {
        id: 'jasmine-white',
        value: 'White',
        color: '#FFFFFF',
        label: 'White'
      },
      {
        id: 'jasmine-gold',
        value: 'Gold',
        color: '#FACC15',
        label: 'Gold'
      }
    ],
    selectedColor: {
      id: 'jasmine-pink',
      value: 'Pink',
      color: '#EC4899',
      label: 'Pink'
    },
    volumeOptions: [
      { ml: 6, price: 120 },
      { ml: 12, price: 220 },
      { ml: 20, price: 380 }
    ],
    selectedVolume: { ml: 6, price: 120 },
    isSale: false,
    specifications: [
      { key: 'Fragrance Type', value: 'Perfume' },
      { key: 'Longevity', value: '6-8 hours' },
      { key: 'Sillage', value: 'Moderate' },
      { key: 'Ingredients', value: 'Natural Jasmine Extract, Essential Oils' },
      { key: 'Country of Origin', value: 'India' }
    ],
    fragrance: ['Floral', 'Musky'] as Fragrance[],
    availabilityStatus: 'In Stock' as AvailabilityStatus,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '2',
    title: 'Oud Mystique Attar',
    srcUrl: '/images/pic2.png',
    gallery: ['/images/pic2.png'],
    brand: 'Amor Attar',
    price: 260,
    discountedPrice: 208,
    discount: 20,
    rating: 3.5,
    description:
      'Oud Mystique Attar is a luxurious and unique fragrance that combines the rich, warm notes of oud with the deep, mysterious notes of musk. This attar is perfect for those who want to make a bold statement and stand out from the crowd.',
    gender: ['Men', 'Unisex'] as Gender[],
    categories: [
      {
        id: '21',
        productId: '2',
        categoryId: '21',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        category: {
          id: '21',
          name: 'Attars',
          slug: 'attars',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
      },
      {
        id: '22',
        productId: '2',
        categoryId: '22',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        category: {
          id: '22',
          name: 'New Arrivals',
          slug: 'new-arrivals',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
      }
    ],
    colors: [
      {
        id: 'oud-brown',
        value: 'Brown',
        color: '#4F4631',
        label: 'Brown'
      },
      {
        id: 'oud-black',
        value: 'Black',
        color: '#000000',
        label: 'Black'
      },
      {
        id: 'oud-gold',
        value: 'Gold',
        color: '#FACC15',
        label: 'Gold'
      }
    ],
    selectedColor: {
      id: 'oud-brown',
      value: 'Brown',
      color: '#4F4631',
      label: 'Brown'
    },
    volumeOptions: [
      { ml: 6, price: 260 },
      { ml: 12, price: 480 },
      { ml: 20, price: 780 }
    ],
    selectedVolume: { ml: 6, price: 260 },
    isSale: true,
    specifications: [
      { key: 'Fragrance Type', value: 'Attar' },
      { key: 'Longevity', value: '10-12 hours' },
      { key: 'Sillage', value: 'Strong' },
      { key: 'Ingredients', value: 'Pure Oud Oil, Natural Essential Oils' },
      { key: 'Country of Origin', value: 'UAE' }
    ],
    fragrance: ['Woody', 'Oriental'] as Fragrance[],
    availabilityStatus: 'In Stock' as AvailabilityStatus,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  },
  {
    id: '3',
    title: 'Lemon Grove Spray',
    srcUrl: '/images/pic4.png',
    gallery: ['/images/pic4.png', '/images/pic10.png', '/images/pic11.png'],
    brand: 'Amor Attar',
    price: 160,
    discountedPrice: 144,
    discount: 10,
    rating: 4.5,
    description:
      'Lemon Grove Spray is a refreshing and invigorating fragrance that combines the zesty notes of lemon with subtle floral undertones. Perfect for daily wear and special occasions.',
    gender: ['Unisex'] as Gender[],
    categories: [
      {
        id: '23',
        productId: '3',
        categoryId: '23',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        category: {
          id: '23',
          name: 'Perfumes',
          slug: 'perfumes',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
      },
      {
        id: '24',
        productId: '3',
        categoryId: '24',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        category: {
          id: '24',
          name: 'New Arrivals',
          slug: 'new-arrivals',
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        }
      }
    ],
    colors: [
      {
        id: 'lemon-yellow',
        value: 'Yellow',
        color: '#FACC15',
        label: 'Yellow'
      },
      {
        id: 'lemon-green',
        value: 'Green',
        color: '#22C55E',
        label: 'Green'
      },
      {
        id: 'lemon-blue',
        value: 'Blue',
        color: '#3B82F6',
        label: 'Blue'
      }
    ],
    selectedColor: {
      id: 'lemon-yellow',
      value: 'Yellow',
      color: '#FACC15',
      label: 'Yellow'
    },
    volumeOptions: [
      { ml: 6, price: 160 },
      { ml: 12, price: 300 },
      { ml: 20, price: 480 }
    ],
    selectedVolume: { ml: 6, price: 160 },
    isSale: true,
    specifications: [
      { key: 'Fragrance Type', value: 'Spray' },
      { key: 'Longevity', value: '4-6 hours' },
      { key: 'Sillage', value: 'Light to Moderate' },
      { key: 'Ingredients', value: 'Natural Lemon Extract, Essential Oils' },
      { key: 'Country of Origin', value: 'Italy' }
    ],
    fragrance: ['Citrus', 'Fresh'] as Fragrance[],
    availabilityStatus: 'In Stock' as AvailabilityStatus,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];
