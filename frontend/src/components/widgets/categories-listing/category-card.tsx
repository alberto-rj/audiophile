import type { ApiCategory } from '@audiophile/shared';
import { Link } from 'react-router-dom';

import { ArrowRight } from '@/assets/icons';
import { Button } from '@/components/ui';
import { cn } from '@/libs/cn';
import { createCategoryRoute } from '@/libs/app-routes';

import ResponsiveImage from '../responsive-image/responsive-image';

interface CategoryCardProps {
  category: ApiCategory;
  className?: string;
}

export const CategoryCard = ({
  category: { slug, image, name },
  className,
}: CategoryCardProps) => {
  return (
    <Link
      aria-label={`Shop - ${name}`}
      to={createCategoryRoute(slug)}
      className={cn(
        'inline-full',
        'flex',
        'flex-col',
        'justify-end',
        'p-6',
        'mbs-(--category-card-margin)',

        'lg:p-8',
        'lg:mbs-(--category-card-margin-lg)',

        'bg-gray-400',
        'rounded-lg',

        className,
      )}
    >
      <ResponsiveImage
        alt=""
        image={image}
        className={cn(
          'aspect-90/103',
          'object-cover',
          '-mbs-(--category-card-margin)',

          'lg:aspect-125/126',
          'lg:-mbs-(--category-card-margin-lg)',
        )}
        loading="lazy"
      />

      <div
        aria-hidden={true}
        className={cn('flex', 'flex-col', 'items-center', 'gap-4')}
      >
        <span className={cn('h6')}>{name}</span>
        <Button
          variant="link"
          asChild
        >
          <span>
            Shop{' '}
            <ArrowRight
              className={cn('text-primary-700')}
              focusable={false}
              aria-hidden={true}
            />
          </span>
        </Button>
      </div>
    </Link>
  );
};
