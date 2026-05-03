import { useGetCategoriesQuery } from '@/app/services/categories';
import { ErrorMessage } from '@/components/widgets';

import { CategoryList } from './category-list';
import { CategoryListSkeleton } from './category-list-skeleton';
import { useId } from 'react';
import { cn } from '@/libs/cn';

const CategoryListing = () => {
  const headingId = useId();

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

  return (
    <section aria-labelledby={headingId}>
      <h2
        id={headingId}
        className={cn('sr-only')}
      >
        Our categories
      </h2>
      <CategoryList items={items} />
    </section>
  );
};

export default CategoryListing;
