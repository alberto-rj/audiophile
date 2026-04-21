import { Outlet } from 'react-router-dom';

import { Footer, Navbar } from '@/components/widgets';
import { cn } from '@/libs/cn';

const MainLayout = () => {
  return (
    <>
      <div
        className={cn(
          'w-full',
          'min-h-screen',
          'flex',
          'flex-col',
          'justify-between',
        )}
      >
        <Navbar />
        <div className={cn('flow')}>
          <main>
            <Outlet />
          </main>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default MainLayout;
