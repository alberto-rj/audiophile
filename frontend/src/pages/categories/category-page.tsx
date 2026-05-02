import { useParams } from 'react-router-dom';

import { useGetProductsByCategorySlugQuery } from '@/app/services/categories';
import {
  BestGear,
  CategoryListing,
  CategoryListSkeleton,
  ErrorMessage,
  Header,
  HeaderSkeleton,
  ProductList,
  ProductListSkeleton,
} from '@/components/widgets';
import { cn } from '@/libs/cn';

const CategoryPage = () => {
  const slug = useParams()?.slug;

  const { isLoading, isError, refetch, data } =
    useGetProductsByCategorySlugQuery(slug!, { skip: !slug });

  if (isLoading) {
    return (
      <div
        role='status'
        aria-label='Loading products...'
      >
        <HeaderSkeleton />
        <div className={cn('bg-white')}>
          <div className={cn('wrapper', 'flow', 'flow-spacing')}>
            <CategoryListSkeleton />
            <ProductListSkeleton />
            <BestGear />
          </div>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <ErrorMessage>
        <ErrorMessage.Description>
          Failed to load products from category {`"${slug}"`}.
        </ErrorMessage.Description>
        <ErrorMessage.Retry
          onClick={refetch}
          aria-label='Try again - reload products'
        >
          Try again
        </ErrorMessage.Retry>
      </ErrorMessage>
    );
  }

  const category = data!;

  return (
    <>
      <Header title={category.name} />
      <div className={cn('bg-white')}>
        <div className={cn('wrapper', 'flow', 'flow-spacing')}>
          <CategoryListing />
          <ProductList products={category.items} />
          <BestGear />
        </div>
      </div>
    </>
  );
};

export default CategoryPage;
