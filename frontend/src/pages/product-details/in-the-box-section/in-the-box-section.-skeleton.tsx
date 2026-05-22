import { Skeleton } from '@/components/ui';
import { cn } from '@/libs/cn';

interface InTheBoxSectionSkeletonProps {
  className?: string;
  itemsCount?: number;
}

const InTheBoxSectionSkeleton = ({
  className,
  itemsCount = 5,
}: InTheBoxSectionSkeletonProps) => {
  return (
    <div
      aria-hidden={true}
      className={cn(
        'flex',
        'flex-col',
        'gap-6',

        'md:flex-row',
        'md:items-start',
        'md:justify-between',
        'md:gap-2.75',

        'lg:flex-col',
        'lg:gap-8',

        className,
      )}
    >
      {/* Title skeleton */}
      <Skeleton
        className={cn(
          'h-6',
          'w-40',

          'md:h-8',
          'md:w-48',
        )}
      />

      {/* Items list skeleton */}
      <ul className={cn('flex', 'flex-col', 'gap-2')}>
        {new Array(itemsCount).fill(null).map((_, index) => (
          <li
            key={index}
            className={cn(
              'flex',
              'items-center',
              'gap-5.25',

              'md:gap-6',
            )}
          >
            {/* Quantity skeleton (e.g. "2x") */}
            <Skeleton className={cn('h-4', 'w-8')} />

            {/* Item name skeleton */}
            <Skeleton
              className={cn(
                'h-4',
                { 'w-32': index % 2 === 0 },
                { 'w-40': index % 2 !== 0 },
              )}
            />
          </li>
        ))}
      </ul>
    </div>
  );
};

export default InTheBoxSectionSkeleton;
