import { Skeleton } from '@/components/ui';
import { cn } from '@/libs/cn';

interface HeaderSkeletonProps {
  className?: string;
}

const HeaderSkeleton = ({ className }: HeaderSkeletonProps) => {
  return (
    <header
      aria-hidden={true}
      className={cn(
        'inline-full',
        'flex',
        'justify-center',
        'items-center',
        'py-8',

        'lg:py-24.5',

        'bg-black',
        className,
      )}
    >
      {/* Title skeleton */}
      <Skeleton
        className={cn(
          'h-6',
          'w-40',

          'md:h-8',
          'md:w-64',
        )}
      />
    </header>
  );
};

export default HeaderSkeleton;
