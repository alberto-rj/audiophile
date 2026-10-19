import type { Decorator } from '@storybook/react-vite';
import { Provider } from 'react-redux';

import { authApi } from '@/app/services/auth-api';
import { cartApi } from '@/app/services/cart-api';
import { categoriesApi } from '@/app/services/categories-api';
import { ordersApi } from '@/app/services/orders-api';
import { productsApi } from '@/app/services/products-api';
import { usersApi } from '@/app/services/users-api';
import { store } from '@/app/store';

export const StoreDecorator: Decorator = (Story, context) => {
  const apiList = [
    authApi,
    cartApi,
    categoriesApi,
    ordersApi,
    productsApi,
    usersApi,
  ];

  apiList.forEach((api) => store.dispatch(api.util.resetApiState()));

  return (
    <Provider store={store}>
      <Story {...context} />
    </Provider>
  );
};
