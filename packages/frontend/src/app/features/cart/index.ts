import { createSlice, type PayloadAction } from '@reduxjs/toolkit';

import type { RootState } from '@/app/store';

interface CartState {
  isCartModalOpen: boolean;
}

const initialState: CartState = {
  isCartModalOpen: false,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setIsCartModalOpen: (state, { payload }: PayloadAction<boolean>) => {
      state.isCartModalOpen = payload;
    },
  },
});

export const { setIsCartModalOpen } = cartSlice.actions;

export const cartReducer = cartSlice.reducer;

export const selectIsCartModalOpen = (state: RootState) => {
  return state.cart.isCartModalOpen;
};
