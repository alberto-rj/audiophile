import { configureStore } from '@reduxjs/toolkit';

import { cartReducer } from '@/app/features/cart';
import { productApi } from '@/app/services/products';
import { categoryApi } from '@/app/services/categories';

export const store = configureStore({
  reducer: {
    [categoryApi.reducerPath]: categoryApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
    cart: cartReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware()
      .concat(categoryApi.middleware)
      .concat(productApi.middleware);
  },
});

store.subscribe(() => {
  const cartState = store.getState().cart;
  const rawCartState = JSON.stringify(cartState);
  localStorage.setItem('cart', rawCartState);
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
