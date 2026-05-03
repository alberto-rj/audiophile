import { Skeleton } from '@/components/ui';
import { cn } from '@/libs/cn';

interface FeaturesSectionSkeletonProps {
  className?: string;
  lines?: number;
}

const FeaturesSectionSkeleton = ({
  className,
  lines = 4,
}: FeaturesSectionSkeletonProps) => {
  return (
    <div
      aria-hidden={true}
      className={cn(
        'flex',
        'flex-col',
        'gap-6',

        'md:gap-8',

        className,
      )}
    >
      {/* Title skeleton */}
      <Skeleton
        className={cn(
          'h-6',
          'w-40',

          'md:h-8',
          'md:w-56',
        )}
      />

      {/* Description skeleton (multi-line to simulate line breaks) */}
      <div className={cn('flex', 'flex-col', 'gap-2')}>
        {[...Array(lines)].map((_, index) => (
          <Skeleton
            key={index}
            className={cn('h-4', index === lines - 1 ? 'w-5/6' : 'w-full')}
          />
        ))}
      </div>
    </div>
  );
};

export default FeaturesSectionSkeleton;
