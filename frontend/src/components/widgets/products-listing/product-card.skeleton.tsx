import { Skeleton } from '@/components/ui';
import { cn } from '@/libs/cn';

interface ProductCardSkeletonProps {
  className?: string;
  isReversed?: boolean;
}

const ProductCardSkeleton = ({
  className,
  isReversed,
}: ProductCardSkeletonProps) => {
  return (
    <div
      aria-hidden={true}
      className={cn(
        'inline-full',
        'flex',
        'flex-col',
        'items-center',
        'gap-8',

        'md:gap-13',

        {
          'lg:flex-row': !isReversed,
          'lg:flex-row-reverse': isReversed,
        },
        'lg:justify-between',
        'lg:gap-31.25',
        className,
      )}
    >
      {/* Image skeleton */}
      <div
        className={cn(
          'grid',
          'grid-cols-[repeat(1,minmax(0,20.4375em))]',
          'grid-rows-[repeat(1,22em)]',

          'md:grid-cols-[repeat(1,minmax(0,43.0625em))]',
          'md:grid-rows-[repeat(1,22em)]',

          'lg:grid-cols-[repeat(1,minmax(0,33.75em))]',
          'lg:grid-rows-[repeat(1,35em)]',
        )}
      >
        <Skeleton
          className={cn(
            'inline-full',
            'aspect-327/352',

            'md:aspect-689/352',

            'lg:aspect-540/560',

            'object-cover',
            'rounded-lg',
          )}
        />
      </div>

      {/* Content container skeleton */}
      <div
        className={cn(
          'flex',
          'flex-col',
          'items-center',
          'gap-6',
          'text-center',

          'md:max-inline-143',

          'lg:max-inline-111.25',
          'lg:items-start',
          'lg:gap-10',
          'lg:text-start',
        )}
      >
        {/* Text block wrapper */}
        <div className={cn('flex', 'flex-col', 'gap-8')}>
          {/* Title group */}
          <div className={cn('flex', 'flex-col', 'gap-4')}>
            {/* "New product" label skeleton */}
            <Skeleton className={cn('h-4', 'w-24')} />

            {/* Title skeleton */}
            <Skeleton
              className={cn(
                'h-6',
                'w-48',

                'xs:h-8',
                'xs:w-64',
              )}
            />
          </div>

          {/* Description skeleton */}
          <div className={cn('flex', 'flex-col', 'gap-2')}>
            <Skeleton className={cn('h-4', 'w-full')} />
            <Skeleton className={cn('h-4', 'w-full')} />
            <Skeleton className={cn('h-4', 'w-5/6')} />
          </div>
        </div>

        {/* Button skeleton */}
        <Skeleton className={cn('h-12', 'w-40')} />
      </div>
    </div>
  );
};

export default ProductCardSkeleton;
