import type { ComponentProps } from 'react';

import { cn } from '@/libs/cn';

type SkeletonProps = ComponentProps<'div'>;

const Skeleton = ({ className, ...props }: SkeletonProps) => {
  return (
    <div
      {...props}
      aria-hidden={true}
      className={cn(
        'bg-gray-600',
        'rounded-lg',

        'motion-safe:animate-pulse',

        className,
      )}
    />
  );
};

export default Skeleton;
