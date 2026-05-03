import { Outlet } from 'react-router-dom';

import { useSecondaryPage } from '@/hooks';
import { cn } from '@/libs/cn';

const AuthLayout = () => {
  useSecondaryPage();

  return (
    <main
      className={cn(
        'wrapper',
        'region',
        'min-block-screen',
        'flex',
        'justify-center',
        'items-center',
      )}
    >
      <Outlet />
    </main>
  );
};

export default AuthLayout;
