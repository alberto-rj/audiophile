import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type { CartItem } from '@/libs/types';

interface CartState {
  items: CartItem[];
}

const initialState: CartState = {
  items: [],
};

const cartSlice = createSlice({
  name: 'card',
  initialState,
  reducers: {
    addItem: (state, action: PayloadAction<CartItem>) => {
      const foundItem = state.items.find(
        (item) => item.id === action.payload.id,
      );

      if (typeof foundItem === 'object') {
        foundItem.quantity += action.payload.quantity;
      } else {
        state.items.push(action.payload);
      }
    },

    removeItem: (state, action: PayloadAction<{ id: number }>) => {
      state.items = state.items.filter((item) => item.id !== action.payload.id);
    },

    updateQuantity: (
      state,
      action: PayloadAction<{ id: number; quantity: number }>,
    ) => {
      const foundItem = state.items.find(
        (item) => item.id === action.payload.id,
      );

      if (!foundItem) {
        return;
      }

      foundItem.quantity = action.payload.quantity;
    },

    clearCart(state) {
      state.items = [];
    },
  },
});

export const { addItem, removeItem, updateQuantity, clearCart } =
  cartSlice.actions;

export default cartSlice.reducer;
