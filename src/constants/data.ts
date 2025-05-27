import { NavItem } from '@/types';

export const navItems: NavItem[] = [
  {
    title: 'Dashboard',
    url: '/dashboard',
    icon: 'dashboard',
    isActive: false,
    shortcut: ['d', 'd'],
    items: []
  },
  {
    title: 'Product List',
    url: '/dashboard/product-list',
    icon: 'productList',
    shortcut: ['p', 'l'],
    isActive: false,
    items: []
  },
  {
    title: 'Add Product',
    url: '/dashboard/add-product',
    icon: 'addProduct',
    shortcut: ['a', 'p'],
    isActive: false,
    items: []
  },
  {
    title: 'Reviews',
    url: '/dashboard/reviews',
    icon: 'reviews',
    shortcut: ['r', 'v'],
    isActive: false,
    items: []
  },
  {
    title: 'Manage Category',
    url: '/dashboard/manage-category',
    icon: 'category',
    shortcut: ['m', 'c'],
    isActive: false,
    items: []
  }
];
