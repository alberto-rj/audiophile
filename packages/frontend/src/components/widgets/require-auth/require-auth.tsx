import type { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

import { selectIsAuthenticated } from '@/app/features/auth';
import { APP_ROUTES } from '@/config/app-routes';

interface RequireAuthProps {
  children: ReactNode;
}

const RequireAuth = ({ children }: RequireAuthProps) => {
  const isAuthenticated = useSelector(selectIsAuthenticated);
  const location = useLocation();

  if (!isAuthenticated) {
    return (
      <Navigate
        to={APP_ROUTES.login}
        state={{ from: location }}
        replace
      />
    );
  }

  return <>{children}</>;
};

export default RequireAuth;
