import { useSelector } from 'react-redux';

import { selectIsAuthenticated } from '@/app/features/auth';
import { useGetCartQuery } from '@/app/services/cart-api';
import { getItemsCount } from '@/libs/helpers';

export const useItemsCount = () => {
  const isAuthenticated = useSelector(selectIsAuthenticated);

  const { data } = useGetCartQuery(undefined, { skip: !isAuthenticated });

  if (!isAuthenticated) {
    return 0;
  }

  return getItemsCount(data?.cart.items ?? []);
};
