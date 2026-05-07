import type { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

import { selectItems } from '@/app/features/cart';
import { APP_ROUTES } from '@/config/app-routes';

interface RequireCartProps {
  children: ReactNode;
}

const RequireCart = ({ children }: RequireCartProps) => {
  const items = useSelector(selectItems);

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
