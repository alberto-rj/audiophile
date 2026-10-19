import { configureStore } from '@reduxjs/toolkit';

import {
  authReducer,
  selectAccessToken,
  storeAccessToken,
} from '@/app/features/auth';
import { cartReducer } from '@/app/features/cart';
import { authApi } from '@/app/services/auth-api';
import { cartApi } from '@/app/services/cart-api';
import { categoriesApi } from '@/app/services/categories-api';
import { ordersApi } from '@/app/services/orders-api';
import { productsApi } from '@/app/services/products-api';
import { usersApi } from '@/app/services/users-api';

export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [usersApi.reducerPath]: usersApi.reducer,
    [categoriesApi.reducerPath]: categoriesApi.reducer,
    [productsApi.reducerPath]: productsApi.reducer,
    [cartApi.reducerPath]: cartApi.reducer,
    [ordersApi.reducerPath]: ordersApi.reducer,
    cart: cartReducer,
    auth: authReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware()
      .concat(authApi.middleware)
      .concat(usersApi.middleware)
      .concat(categoriesApi.middleware)
      .concat(productsApi.middleware)
      .concat(cartApi.middleware)
      .concat(ordersApi.middleware);
  },
});

store.subscribe(() => {
  const token = selectAccessToken(store.getState());

  if (typeof token === 'string') {
    storeAccessToken(token);
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
