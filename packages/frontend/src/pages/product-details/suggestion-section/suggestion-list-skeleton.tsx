import { cn } from '@/libs/cn';

import SuggestionCardSkeleton from './suggestion-card-skeleton';

interface SuggestionListSkeletonProps {
  itemsCount?: number;
}

export const SuggestionListSkeleton = ({
  itemsCount = 3,
}: SuggestionListSkeletonProps) => {
  return (
    <ul
      aria-hidden={true}
      className={cn(
        'grid',
        'grid-cols-[repeat(1,minmax(0,20.4375em))]',
        'gap-14',

        'md:grid-cols-[repeat(3,minmax(0,13.9375em))]',
        'md:gap-2.75',

        'lg:grid-cols-[repeat(3,minmax(0,21.875em))]',
        'lg:gap-7.5',
      )}
    >
      {new Array(itemsCount).fill(null).map((_, index) => (
        <li key={index}>
          <SuggestionCardSkeleton />
        </li>
      ))}
    </ul>
  );
};
