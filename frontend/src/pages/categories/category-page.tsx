import { useParams } from 'react-router-dom';

import { useGetCategoryProductsQuery } from '@/app/services/categories-api';
import {
  BestGear,
  CategoryListing,
  CategoryListSkeleton,
  ErrorMessage,
  ProductList,
  ProductListSkeleton,
} from '@/components/widgets';
import { cn } from '@/libs/cn';

import { HeaderSkeleton } from './header/header-skeleton';
import { Header } from './header/header';

const CategoryPage = () => {
  const { slug } = useParams() as { slug?: string };

  const { isLoading, isError, refetch, data } = useGetCategoryProductsQuery(
    slug!,
    { skip: !slug },
  );

  if (isLoading) {
    return (
      <div
        role='status'
        aria-live='polite'
        aria-label='Loading products...'
      >
        <HeaderSkeleton />
        <div>
          <div className={cn('wrapper', 'flow', 'flow-spacing')}>
            <CategoryListSkeleton />
            <ProductListSkeleton />
          </div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <ErrorMessage>
        <ErrorMessage.Description>
          We could not load products for "{slug}". Please try again.
        </ErrorMessage.Description>

        <ErrorMessage.Retry
          onClick={refetch}
          aria-label='Try again loading products'
        >
          Try again
        </ErrorMessage.Retry>
      </ErrorMessage>
    );
  }

  const { category } = data!;

  return (
    <>
      <Header title={category.name} />
      <div>
        <div className={cn('wrapper', 'flow', 'flow-spacing')}>
          <CategoryListing />
          <ProductList products={category.products!} />
          <BestGear />
        </div>
      </div>
    </>
  );
};

export default CategoryPage;
