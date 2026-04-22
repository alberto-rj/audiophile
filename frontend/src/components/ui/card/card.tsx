import type { ReactNode } from 'react';

import { cn } from '@/libs/cn';

interface CardProps {
  className?: string;
  children?: ReactNode;
}

const Card = ({ className, children }: CardProps) => {
  return (
    <div
      className={cn(
        'w-full',
        'rounded-lg',
        'overflow-hidden',
        'p-6',

        'bg-white',

        className,
      )}
    >
      {children}
    </div>
  );
};

export default Card;
