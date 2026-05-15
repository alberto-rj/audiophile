import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { selectIsAuthenticated } from '@/app/features/auth';
import type { AppDispatch } from '@/app/store';
import { setIsCartModalOpen } from '@/app/features/cart';
import { Cart as CartIcon } from '@/assets/icons';
import { CartModal, SignInRequiredAlert } from '@/components/widgets';
import { cn } from '@/libs/cn';
import { useItemsCount } from '@/hooks';

import { CartBadge } from './cart-badge';

const CartModalTrigger = () => {
  const [isSignInAlertOpen, setIsSignInAlertOpen] = useState(false);

  const isAuthenticated = useSelector(selectIsAuthenticated);

  const dispatch = useDispatch<AppDispatch>();

  const itemsCount = useItemsCount();

  const handleViewCart = () => {
    if (!isAuthenticated) {
      setIsSignInAlertOpen(true);
      return;
    }

    dispatch(setIsCartModalOpen(true));
  };

  return (
    <>
      {!isAuthenticated && (
        <SignInRequiredAlert
          open={isSignInAlertOpen}
          onOpenChange={setIsSignInAlertOpen}
          description='Sign in to view your cart.'
        />
      )}
      {isAuthenticated && <CartModal />}
      <button
        type='button'
        onClick={handleViewCart}
        className={cn('relative')}
      >
        <span className={cn('sr-only')}>View cart - {itemsCount} item(s)</span>
        <CartIcon
          aria-hidden={true}
          focusable={false}
        />
        {itemsCount > 0 && <CartBadge itemsCount={itemsCount} />}
      </button>
    </>
  );
};

export default CartModalTrigger;
