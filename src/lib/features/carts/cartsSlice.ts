import { compareArrays } from '@/lib/utils';
import { Discount } from '@/types/product.types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

const calcAdjustedTotalPrice = (
  totalPrice: number,
  data: CartItem,
  quantity?: number
): number => {
  return (
    (data.discount > 0
      ? data.discountedPrice
      : data.price) * (quantity ? quantity : data.quantity)
  );
};

export type RemoveCartItem = {
  id: number;
  attributes: string[];
};

export interface CartItem {
  id: string;
  title: string;
  srcUrl: string;
  price: number;
  discountedPrice: number;
  discount: number;
  quantity: number;
  selectedColor: {
    id: string;
    value: string;
    color: string;
    label: string;
  };
  selectedVolume: {
    ml: number;
    price: number;
  };
}

export interface CartState {
  items: CartItem[];
  totalPrice: number;
  adjustedTotalPrice: number;
}

const initialState: CartState = {
  items: [],
  totalPrice: 0,
  adjustedTotalPrice: 0
};

const calculateTotals = (items: CartItem[]) => {
  const totalPrice = items.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const adjustedTotalPrice = items.reduce(
    (total, item) => total + item.discountedPrice * item.quantity,
    0
  );
  return { totalPrice, adjustedTotalPrice };
};

const cartsSlice = createSlice({
  name: 'carts',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const existingItem = state.items.find(
        (item) =>
          item.id === action.payload.id &&
          item.selectedColor.id === action.payload.selectedColor.id &&
          item.selectedVolume.ml === action.payload.selectedVolume.ml
      );

      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }

      const { totalPrice, adjustedTotalPrice } = calculateTotals(state.items);
      state.totalPrice = totalPrice;
      state.adjustedTotalPrice = adjustedTotalPrice;
    },
    removeCartItem: (
      state,
      action: PayloadAction<{
        id: string;
        selectedColor: CartItem['selectedColor'];
        selectedVolume: CartItem['selectedVolume'];
      }>
    ) => {
      const index = state.items.findIndex(
        (item) =>
          item.id === action.payload.id &&
          item.selectedColor.id === action.payload.selectedColor.id &&
          item.selectedVolume.ml === action.payload.selectedVolume.ml
      );

      if (index !== -1 && state.items[index].quantity > 1) {
        state.items[index].quantity -= 1;
        const { totalPrice, adjustedTotalPrice } = calculateTotals(state.items);
        state.totalPrice = totalPrice;
        state.adjustedTotalPrice = adjustedTotalPrice;
      }
    },
    remove: (
      state,
      action: PayloadAction<{
        id: string;
        selectedColor: CartItem['selectedColor'];
        selectedVolume: CartItem['selectedVolume'];
        quantity: number;
      }>
    ) => {
      state.items = state.items.filter(
        (item) =>
          !(
            item.id === action.payload.id &&
            item.selectedColor.id === action.payload.selectedColor.id &&
            item.selectedVolume.ml === action.payload.selectedVolume.ml
          )
      );

      const { totalPrice, adjustedTotalPrice } = calculateTotals(state.items);
      state.totalPrice = totalPrice;
      state.adjustedTotalPrice = adjustedTotalPrice;
    },
    clearCart: (state) => {
      state.items = [];
      state.totalPrice = 0;
      state.adjustedTotalPrice = 0;
    }
  }
});

export const { addToCart, removeCartItem, remove, clearCart } = cartsSlice.actions;
export default cartsSlice.reducer;
