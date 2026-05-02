import { Skeleton } from '@/components/ui';
import { cn } from '@/libs/cn';

interface ProductDetailedCardSkeletonProps {
  className?: string;
}

const ProductDetailedCardSkeleton = ({
  className,
}: ProductDetailedCardSkeletonProps) => {
  return (
    <div
      aria-hidden={true}
      className={cn(
        'inline-full',
        'flex',
        'flex-col',
        'gap-10',

        'md:flex-row',
        'md:items-start',
        'md:justify-between',
        'md:gap-17.25',

        'lg:gap-31.25',

        className,
      )}
    >
      {/* Image skeleton */}
      <Skeleton
        className={cn(
          'inline-full',
          'aspect-327/327',

          'md:aspect-280/560',

          'lg:aspect-540/560',

          'rounded-lg',
        )}
      />

      {/* Content container skeleton */}
      <div
        className={cn(
          'inline-full',
          'flex',
          'flex-col',
          'gap-8',

          'md:gap-12',
          'md:self-center',
        )}
      >
        {/* Text content wrapper */}
        <div
          className={cn(
            'max-inline-111.5',
            'flex',
            'flex-col',
            'gap-6',

            'md:gap-8',
          )}
        >
          {/* Title group */}
          <div className={cn('flex', 'flex-col', 'gap-6')}>
            {/* "New product" label skeleton */}
            <Skeleton className={cn('h-4', 'w-28')} />

            {/* Product title skeleton */}
            <Skeleton
              className={cn(
                'h-6',
                'w-48',

                'lg:h-8',
                'lg:w-64',
              )}
            />
          </div>

          {/* Description skeleton */}
          <div className={cn('flex', 'flex-col', 'gap-2')}>
            <Skeleton className={cn('h-4', 'w-full')} />
            <Skeleton className={cn('h-4', 'w-full')} />
            <Skeleton className={cn('h-4', 'w-5/6')} />
          </div>

          {/* Price skeleton */}
          <Skeleton className={cn('h-5', 'w-24')} />
        </div>

        {/* Actions container skeleton */}
        <div className={cn('flex', 'flex-wrap', 'items-center', 'gap-4')}>
          {/* Quantity selector skeleton */}
          <Skeleton
            className={cn(
              'h-12',
              'w-30', // match max-inline-30
            )}
          />

          {/* Add to cart button skeleton */}
          <Skeleton className={cn('h-12', 'w-40')} />
        </div>
      </div>
    </div>
  );
};

export default ProductDetailedCardSkeleton;
