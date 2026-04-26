import { useGetCategoriesQuery } from '@/app/services/categories';
import { CategoryCard } from '@/components/widgets';
import { cn } from '@/libs/cn';

const CategoryListing = () => {
  const { isLoading, isError, data: categories } = useGetCategoriesQuery();

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error</p>;
  }

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
      {categories?.map((category) => (
        <li key={category.slug}>
          <CategoryCard category={category} />
        </li>
      ))}
    </ul>
  );
};

export default CategoryListing;
