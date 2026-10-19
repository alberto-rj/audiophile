import { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { selectIsAuthenticated } from '@/app/features/auth';
import { useAddCartItemMutation } from '@/app/services/cart-api';
import { getPendingCartItem, removePendingCartItem } from '@/libs/helpers';

export function usePendingCartItem() {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const [addCartItem] = useAddCartItemMutation();

  useEffect(() => {
    if (!isAuthenticated) return;

    const pending = getPendingCartItem();

    if (!pending) return;

    removePendingCartItem();

    const handleAddCartItem = async () => {
      await addCartItem(pending).unwrap();
    };

    handleAddCartItem();
  }, [isAuthenticated, addCartItem]);
}
