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
    <ul className={cn('flex gap-8 items-center')}>
      {items.map(({ image, category, slug }) => (
        <li
          key={category}
          className={cn('flex-1 basis-87.5')}
        >
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
