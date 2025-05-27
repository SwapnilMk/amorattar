import {
  Product,
  Gender,
  Category,
  AvailabilityStatus,
  Fragrance
} from '@/types/product.types';

export const newArrivalsData: Product[] = [
  {
    id: 1,
    title: 'Jasmine Bloom Perfume',
    srcUrl: '/images/pic1.png',
    gallery: ['/images/pic1.png', '/images/pic10.png', '/images/pic11.png'],
    brand: 'Amor Attar',
    price: 120,
    discountedPrice: 120,
    discount: {
      amount: 0,
      percentage: 0
    },
    rating: 4.5,
    description:
      'Jasmine Bloom Perfume is a luxurious and unique fragrance that combines the rich, warm notes of jasmine with the deep, mysterious notes of musk. This attar is perfect for those who want to make a bold statement and stand out from the crowd.',
    gender: ['Women'] as Gender[],
    categories: ['Perfumes', 'New Arrivals'] as Category[],
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
    quantity: 1,
    isSale: false,
    specifications: {
      'Fragrance Type': 'Perfume',
      Longevity: '6-8 hours',
      Sillage: 'Moderate',
      Ingredients: 'Natural Jasmine Extract, Essential Oils',
      'Country of Origin': 'India'
    },
    fragrance: ['Floral', 'Musky'] as Fragrance[],
    availabilityStatus: 'In Stock' as AvailabilityStatus
  },
  {
    id: 2,
    title: 'Oud Mystique Attar',
    srcUrl: '/images/pic2.png',
    gallery: ['/images/pic2.png'],
    brand: 'Amor Attar',
    price: 260,
    discountedPrice: 208,
    discount: {
      amount: 52,
      percentage: 20
    },
    rating: 3.5,
    description:
      'Oud Mystique Attar is a luxurious and unique fragrance that combines the rich, warm notes of oud with the deep, mysterious notes of musk. This attar is perfect for those who want to make a bold statement and stand out from the crowd.',
    gender: ['Men', 'Unisex'] as Gender[],
    categories: ['Attars', 'New Arrivals'] as Category[],
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
    quantity: 1,
    isSale: true,
    specifications: {
      'Fragrance Type': 'Attar',
      Longevity: '10-12 hours',
      Sillage: 'Strong',
      Ingredients: 'Pure Oud Oil, Natural Essential Oils',
      'Country of Origin': 'UAE'
    },
    fragrance: ['Woody', 'Oriental'] as Fragrance[],
    availabilityStatus: 'In Stock' as AvailabilityStatus
  },
  {
    id: 3,
    title: 'Lemon Grove Spray',
    srcUrl: '/images/pic4.png',
    gallery: ['/images/pic4.png', '/images/pic10.png', '/images/pic11.png'],
    brand: 'Amor Attar',
    price: 160,
    discountedPrice: 144,
    discount: {
      amount: 16,
      percentage: 10
    },
    rating: 4.5,
    description:
      'Lemon Grove Spray is a refreshing and invigorating fragrance that combines the zesty notes of lemon with subtle floral undertones. Perfect for daily wear and special occasions.',
    gender: ['Unisex'] as Gender[],
    categories: ['Perfumes', 'New Arrivals'] as Category[],
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
    quantity: 1,
    isSale: true,
    specifications: {
      'Fragrance Type': 'Spray',
      Longevity: '4-6 hours',
      Sillage: 'Light to Moderate',
      Ingredients: 'Natural Lemon Extract, Essential Oils',
      'Country of Origin': 'Italy'
    },
    fragrance: ['Citrus', 'Fresh'] as Fragrance[],
    availabilityStatus: 'In Stock' as AvailabilityStatus
  }
];
