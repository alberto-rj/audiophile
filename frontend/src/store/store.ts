import { configureStore } from '@reduxjs/toolkit';

import cartReducer from './cart-slice';

const rawCartState = localStorage.getItem('cart');

let preloadedState = undefined;

if (typeof rawCartState === 'string') {
  preloadedState = {
    cart: JSON.parse(rawCartState),
  };
}

export const store = configureStore({
  reducer: {
    cart: cartReducer,
  },
  preloadedState,
});

store.subscribe(() => {
  const cartState = store.getState().cart;
  const rawCartState = JSON.stringify(cartState);
  localStorage.setItem('cart', rawCartState);
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
