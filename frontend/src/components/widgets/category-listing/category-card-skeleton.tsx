import { cn } from '@/libs/cn';
import { Skeleton } from '@/components/ui';

interface CategoryCardSkeletonProps {
  className?: string;
}

export const CategoryCardSkeleton = ({
  className,
}: CategoryCardSkeletonProps) => {
  return (
    <Skeleton
      className={cn(
        'inline-full',
        'flex',
        'flex-col',
        'justify-end',
        'gap-9',
        'p-6',
        'mbs-(--category-card-margin)',

        'lg:p-8',
        'lg:mbs-(--category-card-margin-lg)',

        'bg-gray-400',
        'rounded-lg',

        className,
      )}
    >
      {/* Image */}
      <Skeleton
        className={cn(
          'aspect-90/103',
          '-mbs-(--category-card-margin)',

          'lg:aspect-125/126',
          'lg:-mbs-(--category-card-margin-lg)',

          'bg-gray-700',
        )}
      />

      {/* Content */}
      <div className={cn('flex', 'flex-col', 'items-center', 'gap-4')}>
        {/* Title */}
        <Skeleton className={cn('h-5', 'w-24', 'bg-gray-700')} />

        {/* Button */}
        <Skeleton className={cn('h-4', 'w-20', 'bg-gray-700')} />
      </div>
    </Skeleton>
  );
};
