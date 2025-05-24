import { NavItem } from '@/types';

export const navItems: NavItem[] = [
  {
    title: 'Dashboard',
    url: '/dashboard/overview',
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
    title: 'Product Detail',
    url: '/dashboard/product-detail',
    icon: 'productDetail',
    shortcut: ['p', 'd'],
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
    title: 'Manage Category',
    url: '/dashboard/manage-category',
    icon: 'category',
    shortcut: ['m', 'c'],
    isActive: false,
    items: []
  }
];
