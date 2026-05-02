import { cn } from '@/libs/cn';
import type { Category } from '@/libs/types';

import { CategoryCard } from './category-card';

interface CategoryListProps {
  items: Category[];
}

export const CategoryList = ({ items }: CategoryListProps) => {
  return (
    <ul
      role='list'
      className={cn(
        'inline-full',
        'grid',
        'grid-cols-[repeat(1,minmax(0,20.4375em))]',
        'gap-4',

        'sm:grid-cols-[repeat(2,minmax(0,20.4375em))]',
        'sm:gap-2.5',

        'lg:grid-cols-[repeat(3,minmax(0,21.875em))]',
        'lg:gap-7.5',
      )}
    >
      {items.map((category) => (
        <li key={category.slug}>
          <CategoryCard category={category} />
        </li>
      ))}
    </ul>
  );
};
