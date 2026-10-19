import type { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';

import { APP_ROUTES } from '@/config/app-routes';
import { cart } from '@/libs/mocks/cart';

interface RequireCartProps {
  children: ReactNode;
}

const RequireCart = ({ children }: RequireCartProps) => {
  const items = cart.items;

  if (items.length === 0) {
    return (
      <Navigate
        to={APP_ROUTES.home}
        replace
      />
    );
  }

  return <>{children}</>;
};

export default RequireCart;
