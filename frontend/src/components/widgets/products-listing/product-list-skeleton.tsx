import { cn } from '@/libs/cn';

import ProductCardSkeleton from './product-card.skeleton';

interface ProductListSkeletonProps {
  count?: number;
  className?: string;
}

export const ProductListSkeleton = ({
  count = 3,
  className,
}: ProductListSkeletonProps) => {
  return (
    <ul
      aria-hidden={true}
      className={cn(
        'flow',
        'inline-full',

        className,
      )}
    >
      {[...Array(count)].map((_, index) => (
        <li
          key={index}
          className={cn('inline-full')}
        >
          <ProductCardSkeleton isReversed={index % 2 !== 0} />
        </li>
      ))}
    </ul>
  );
};
