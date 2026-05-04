import { configureStore } from '@reduxjs/toolkit';

import {
  authReducer,
  selectAccessToken,
  storeAccessToken,
} from '@/app/features/auth';
import { cartReducer } from '@/app/features/cart';
import { authApi } from '@/app/services/auth-api';
import { productApi } from '@/app/services/products-api';
import { categoryApi } from '@/app/services/categories-api';
import { ordersApi } from '@/app/services/orders-api';
import { usersApi } from '@/app/services/users-api';

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
    [categoryApi.reducerPath]: categoryApi.reducer,
    [productApi.reducerPath]: productApi.reducer,
    [ordersApi.reducerPath]: ordersApi.reducer,
    cart: cartReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(usersApi.middleware)
      .concat(categoryApi.middleware)
      .concat(productApi.middleware)
      .concat(ordersApi.middleware);
  },
});

store.subscribe(() => {
  const cartState = store.getState().cart;
  const rawCartState = JSON.stringify(cartState);
  localStorage.setItem('cart', rawCartState);

  const token = selectAccessToken(store.getState());

  if (typeof token === 'string') {
    storeAccessToken(token);
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
