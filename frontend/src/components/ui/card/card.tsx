import type { ReactNode } from 'react';

import { cn } from '@/libs/cn';
import { Slot } from '@radix-ui/react-slot';

interface CardProps {
  className?: string;
  children?: ReactNode;
  asChild?: boolean;
}

const Card = ({ asChild, className, children }: CardProps) => {
  const Comp = asChild ? Slot : 'div';

  return (
    <Comp
      className={cn(
        'inline-full',
        'rounded-lg',
        'overflow-hidden',
        'p-6',

        'bg-white',
        'shadow-sm',

        className,
      )}
    >
      {children}
    </Comp>
  );
};

export default Card;
