import { useParams } from 'react-router-dom';

import { useGetCategoryBySlugQuery } from '@/app/services/categories-api';
import {
  BestGear,
  CategoriesListing,
  CategoryListSkeleton,
  ErrorMessage,
  ProductsListing,
  ProductListSkeleton,
  SEO,
  StatusVisuallyHidden,
} from '@/components/widgets';
import { cn } from '@/libs/cn';

import { HeaderSkeleton } from './header/header-skeleton';
import { Header } from './header/header';

const CategoryPage = () => {
  const { slug } = useParams() as { slug?: string };

  const { isLoading, isError, refetch, data } = useGetCategoryBySlugQuery(
    slug!,
    { skip: !slug },
  );

  if (isLoading) {
    return (
      <>
        <StatusVisuallyHidden>Loading products...</StatusVisuallyHidden>
        <HeaderSkeleton />
        <div>
          <div className={cn('wrapper', 'flow', 'flow-spacing')}>
            <CategoryListSkeleton />
            <ProductListSkeleton />
          </div>
        </div>
      </>
    );
  }

  if (isError || !data || !data.results[0]) {
    return (
      <ErrorMessage>
        <ErrorMessage.Description>
          We couldn't load this category. Please try again.
        </ErrorMessage.Description>
        <ErrorMessage.Retry onClick={refetch}>Try again</ErrorMessage.Retry>
      </ErrorMessage>
    );
  }

  const category = data.results[0];

  return (
    <>
      <SEO
        metadata={{
          title: `Shop ${category.name} | Audiophile`,
          description: `Explore premium ${category.name} at Audiophile. Find high-quality audio equipment designed for immersive sound experiences.`,
        }}
      />
      <Header title={category.name} />
      <div>
        <div className={cn('wrapper', 'flow', 'flow-spacing')}>
          <CategoriesListing />
          <ProductsListing filters={{ categoryId: category.id }} />
          <BestGear />
        </div>
      </div>
    </>
  );
};

export default CategoryPage;
