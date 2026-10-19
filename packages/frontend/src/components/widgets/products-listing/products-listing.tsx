import type { ApiProductFindManyQuery } from '@audiophile/shared';

import { useGetProductsQuery } from '@/app/services/products-api';

import ErrorMessage from '../error-message/error-message';

import { ProductListSkeleton } from './product-list-skeleton';
import { ProductList } from './product-list';

interface ProductsQueryProps {
  filters?: Partial<ApiProductFindManyQuery>;
}

const ProductsQuery = ({ filters }: ProductsQueryProps) => {
  const { isLoading, isError, refetch, data } = useGetProductsQuery(filters);

  if (isLoading) {
    return <ProductListSkeleton />;
  }

  if (isError || !data) {
    return (
      <ErrorMessage>
        <ErrorMessage.Description>
          We couldn't load products for this category. Please try again.
        </ErrorMessage.Description>
        <ErrorMessage.Retry onClick={refetch}>Try again</ErrorMessage.Retry>
      </ErrorMessage>
    );
  }

  const { results: products } = data;

  return <ProductList products={products} />;
};

interface ProductListingProps {
  filters?: Partial<ApiProductFindManyQuery>;
}

export const ProductsListing = ({ filters }: ProductListingProps) => {
  return <ProductsQuery filters={filters} />;
};
