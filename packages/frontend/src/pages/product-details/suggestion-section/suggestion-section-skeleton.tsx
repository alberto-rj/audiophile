import { cn } from '@/libs/cn';

import { Skeleton } from '@/components/ui';
import { SuggestionListSkeleton } from './suggestion-list-skeleton';

interface SuggestionSectionSkeletonProps {
  className?: string;
  itemsCount?: number;
}

export const SuggestionSectionSkeleton = ({
  className,
  itemsCount,
}: SuggestionSectionSkeletonProps) => {
  return (
    <div
      aria-hidden={true}
      className={cn(
        'flex',
        'flex-col',
        'items-center',
        'gap-10',

        'md:gap-14',

        'lg:gap-16',

        className,
      )}
    >
      {/* Title skeleton */}
      <Skeleton
        className={cn(
          'h-6',
          'w-48',

          'md:h-8',
          'md:w-64',
        )}
      />

      {/* List skeleton */}
      <SuggestionListSkeleton itemsCount={itemsCount} />
    </div>
  );
};
