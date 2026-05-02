import { useGetCategoriesQuery } from '@/app/services/categories';
import { ErrorMessage } from '@/components/widgets';

import { CategoryList } from './category-list';
import { CategoryListSkeleton } from './category-list-skeleton';

const CategoryListing = () => {
  const {
    isLoading,
    isError,
    refetch,
    data: categories,
  } = useGetCategoriesQuery();

  if (isLoading) {
    return (
      <div
        role='status'
        aria-label='Loading categories...'
      >
        <CategoryListSkeleton />
      </div>
    );
  }

  if (isError) {
    return (
      <ErrorMessage>
        <ErrorMessage.Description>
          Failed to load categories.
        </ErrorMessage.Description>
        <ErrorMessage.Retry
          onClick={refetch}
          aria-label='Try again - reload categories'
        >
          Try again
        </ErrorMessage.Retry>
      </ErrorMessage>
    );
  }

  const items = categories!;

  return <CategoryList items={items} />;
};

export default CategoryListing;
