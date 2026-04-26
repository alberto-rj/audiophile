import { Link } from 'react-router-dom';

import { ArrowRight } from '@/assets/icons';
import { Button } from '@/components/ui';
import { cn } from '@/libs/cn';
import type { Category } from '@/libs/types';

interface CategoryCardProps {
  category: Category;
}

const CategoryCard = ({
  category: { slug, image, name },
}: CategoryCardProps) => {
  return (
    <Link
      to={`/categories/${slug}`}
      className={cn(
        'relative',
        'inline-grid',
        'items-end',
        'justify-center',
        'w-full',
        'min-h-51',
        'px-8',
        'pb-7.5',
        'rounded-lg',
        'bg-gray-400',
      )}
    >
      <span className={cn('sr-only')}>Shop {name}</span>
      <img
        alt=''
        src={image}
        className={cn(
          'absolute',
          'top-0',
          'left-1/2',
          '-translate-x-1/2',
          '-translate-y-1/2',
          'size-50',
          'object-cover',
        )}
        width={200}
        height={200}
        loading='lazy'
      />
      <div
        aria-hidden={true}
        className={cn('grid', 'gap-4')}
      >
        <span className={cn('text-md', 'uppercase')}>{name}</span>
        <Button
          variant='link'
          asChild
        >
          <span>
            Shop <ArrowRight />
          </span>
        </Button>
      </div>
    </Link>
  );
};

export default CategoryCard;
