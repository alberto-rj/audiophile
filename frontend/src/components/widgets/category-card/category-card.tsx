import { Link } from 'react-router-dom';

import { ArrowRight } from '@/assets/icons';
import { Button } from '@/components/ui';
import { cn } from '@/libs/cn';
import type { Category } from '@/libs/types';
import { createCategoryRoute } from '@/libs/app-routes';

interface CategoryCardProps {
  category: Category;
  className?: string;
}

const CategoryCard = ({
  category: { slug, image, name },
  className,
}: CategoryCardProps) => {
  return (
    <Link
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
      <span className={cn('sr-only')}>Shop {name}</span>
      <img
        alt=''
        src={image}
        className={cn(
          'aspect-90/103',
          'object-cover',
          '-mbs-(--category-card-margin)',

          'lg:aspect-125/126',
          'lg:-mbs-(--category-card-margin-lg)',
        )}
        loading='lazy'
      />
      <div
        aria-hidden={true}
        className={cn('flex', 'flex-col', 'items-center', 'gap-4')}
      >
        <span className={cn('h6')}>{name}</span>
        <Button
          variant='link'
          asChild
        >
          <span>
            Shop{' '}
            <ArrowRight
              focusable={false}
              aria-hidden={true}
            />
          </span>
        </Button>
      </div>
    </Link>
  );
};

export default CategoryCard;
