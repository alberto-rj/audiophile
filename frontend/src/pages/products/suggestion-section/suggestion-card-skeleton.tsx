import { Skeleton } from '@/components/ui';
import { cn } from '@/libs/cn';

interface SuggestionCardSkeletonProps {
  className?: string;
}

const SuggestionCardSkeleton = ({ className }: SuggestionCardSkeletonProps) => {
  return (
    <article
      aria-hidden={true}
      className={cn(
        'w-full',
        'flex',
        'flex-col',
        'items-center',
        'gap-8',

        'md:gap-10',
        'overflow-hidden',
        className,
      )}
    >
      {/* Image skeleton */}
      <Skeleton
        className={cn(
          'w-full',
          'rounded-lg',

          'aspect-327/120',

          'md:aspect-223/318',

          'lg:aspect-350/318',
        )}
      />

      {/* Content skeleton */}
      <div className={cn('flex', 'flex-col', 'items-center', 'gap-8')}>
        {/* Title skeleton */}
        <Skeleton
          className={cn(
            'h-5',
            'w-32',

            'md:w-40',
          )}
        />

        {/* Button skeleton */}
        <Skeleton className={cn('h-12', 'w-40')} />
      </div>
    </article>
  );
};

export default SuggestionCardSkeleton;
