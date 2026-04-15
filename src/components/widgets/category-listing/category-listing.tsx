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
        'grid-cols-[repeat(1,minmax(100%,327px))]',
        'md:grid-cols-[repeat(3,minmax(100%,223px))]',
        'lg:grid-cols-[repeat(3,minmax(0,350px))]',
        'gap-x-8',
        'gap-y-41',
        'pbs-25',

        'md:gap-x-2.5',

        'lg:gap-x-7.5',
      )}
    >
      {items.map(({ image, category, slug }) => (
        <li key={category}>
          <CategoryCard
            category={category}
            image={image}
            slug={slug}
          />
        </li>
      ))}
    </ul>
  );
};

export default CategoryListing;
