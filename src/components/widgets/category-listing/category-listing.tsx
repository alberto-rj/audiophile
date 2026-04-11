import { CategoryCard } from '@/components/widgets';
import { cn } from '@/libs/cn';

interface Category {
  image: string;
  category: string;
  slug: string;
}

interface CategoryCardProps {
  items: Category[];
}

const CategoryListing = ({ items }: CategoryCardProps) => {
  return (
    <ul
      role='list'
      className={cn(
        'w-full',
        'grid',
        'sm:grid-cols-[repeat(1,minmax(21.875em,1fr))]',
        'md:grid-cols-[repeat(2,minmax(21.875em,1fr))]',
        'lg:grid-cols-[repeat(3,minmax(21.875em,1fr))]',
        'gap-x-8',
        'gap-y-41',
        'pbs-25',
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
