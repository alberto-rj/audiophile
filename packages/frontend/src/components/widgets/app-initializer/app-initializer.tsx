import type { ReactNode } from 'react';

import { useCredentials, usePendingCartItem } from '@/hooks';

interface AppInitializerProps {
  children: ReactNode;
}

const AppInitializer = ({ children }: AppInitializerProps) => {
  useCredentials();

  usePendingCartItem();

  return <>{children}</>;
};

export default AppInitializer;
