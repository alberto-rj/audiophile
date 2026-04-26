import type { Decorator } from '@storybook/react-vite';
import { Provider } from 'react-redux';

import { store } from '@/app/store';
import { categoryApi } from '@/app/services/categories';
import { productApi } from '@/app/services/products';

export const StoreDecorator: Decorator = (Story, context) => {
  store.dispatch(categoryApi.util.resetApiState());
  store.dispatch(productApi.util.resetApiState());

  return (
    <Provider store={store}>
      <Story {...context} />
    </Provider>
  );
};
