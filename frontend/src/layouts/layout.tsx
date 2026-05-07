import type { ReactNode } from 'react';

import { Footer, Navbar } from '@/components/widgets';
import { cn } from '@/libs/cn';

interface LayoutCenteredOnScreenPropsProps {
  children: ReactNode;
}

export const LayoutCenteredOnScreen = ({
  children,
}: LayoutCenteredOnScreenPropsProps) => {
  return (
    <main
      className={cn(
        'region',
        'wrapper',
        'inline-full',
        'min-block-screen',
        'flex',
        'justify-center',
        'items-center',
      )}
    >
      {children}
    </main>
  );
};

interface LayoutLandingProps {
  children: ReactNode;
}

export const LayoutLanding = ({ children }: LayoutLandingProps) => {
  return (
    <div
      className={cn(
        'inline-full',
        'min-block-screen',
        'flex',
        'flex-col',
        'justify-between',
      )}
    >
      <Navbar />
      <div className={cn('flow')}>
        <main>{children}</main>
        <Footer />
      </div>
    </div>
  );
};
