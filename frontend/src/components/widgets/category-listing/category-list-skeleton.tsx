import { cn } from '@/libs/cn';

import { CategoryCardSkeleton } from './category-card-skeleton';

interface CategoryListSkeletonProps {
  count?: number;
  className?: string;
}

export const CategoryListSkeleton = ({
  count = 3,
  className,
}: CategoryListSkeletonProps) => {
  return (
    <ul
      role='list'
      className={cn(
        'inline-full',
        'grid',
        'grid-cols-[repeat(1,minmax(0,20.4375em))]',
        'gap-4',

        'sm:grid-cols-[repeat(2,minmax(0,20.4375em))]',
        'sm:gap-2.5',

        'lg:grid-cols-[repeat(3,minmax(0,21.875em))]',
        'lg:gap-7.5',

        className,
      )}
    >
      {Array.from({ length: count }).map((_, index) => (
        <li key={index}>
          <CategoryCardSkeleton />
        </li>
      ))}
    </ul>
  );
};
