import { useId } from 'react';

import { useGetCategoriesQuery } from '@/app/services/categories-api';
import { ErrorMessage } from '@/components/widgets';
import { cn } from '@/libs/cn';

import { CategoryListSkeleton } from './category-list-skeleton';
import { CategoryList } from './category-list';

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
          We couldn't load categories. Please try again.
        </ErrorMessage.Description>

        <ErrorMessage.Retry
          onClick={refetch}
          aria-label='Try again loading categories'
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
