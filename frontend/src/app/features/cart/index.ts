import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type { RootState } from '@/app/store';
import type { CartItem } from '@/libs/types';

interface CartState {
  items: CartItem[];
}

function getPersistedCartState(): CartState {
  const rawCartState = localStorage.getItem('cart');

  const fallbackCartState: CartState = {
    items: [],
  };

  if (rawCartState === null) {
    return fallbackCartState;
  }

  return JSON.parse(rawCartState) as CartState;
}

const initialState = getPersistedCartState();

const cartSlice = createSlice({
  name: 'cart',
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
      const { id, quantity } = action.payload;

      const foundItem = state.items.find((item) => item.id === id);

      if (!foundItem) {
        return;
      }

      if (quantity === 0) {
        state.items = state.items.filter((item) => item.id !== id);
      } else if (quantity > 0) {
        foundItem.quantity = quantity;
      }
    },

    clearCart(state) {
      state.items = [];
    },
  },
});

export const { addItem, removeItem, updateQuantity, clearCart } =
  cartSlice.actions;

export const cartReducer = cartSlice.reducer;

export const selectItems = (state: RootState) => {
  return state.cart.items;
};

export const selectItemsCount = (state: RootState) => {
  return selectItems(state).reduce((sum, item) => sum + item.quantity, 0);
};

export const selectItemById = (id: number) => (state: RootState) => {
  return selectItems(state).find((item) => item.id === id);
};

export const selectSubtotal = (state: RootState) => {
  return selectItems(state).reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );
};

export const selectShipping = () => {
  return 50;
};

export const selectVAT = (state: RootState) => {
  return Math.round(selectSubtotal(state) * 0.2);
};

export const selectGrandTotal = (state: RootState) => {
  return selectSubtotal(state) + selectShipping() + selectVAT(state);
};
