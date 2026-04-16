import { CategoryCard } from '@/components/widgets';
import { cn } from '@/libs/cn';
import type { CategoryContent } from '@/libs/types';

interface CategoryCardProps {
  items: CategoryContent[];
}

const CategoryListing = ({ items }: CategoryCardProps) => {
  return (
    <ul
      role='list'
      className={cn(
        'w-full',
        'grid',
        'grid-cols-[repeat(1,minmax(0,20.4375em))]',
        'gap-x-8',
        'gap-y-41',
        'pbs-25',

        'sm:grid-cols-[repeat(2,minmax(0,20.4375em))]',
        'sm:gap-x-2.5',

        'lg:grid-cols-[repeat(3,minmax(0,21.875em))]',
        'lg:gap-x-7.5',
      )}
    >
      {items.map((content) => (
        <li key={content.slug}>
          <CategoryCard content={content} />
        </li>
      ))}
    </ul>
  );
};

export default CategoryListing;
