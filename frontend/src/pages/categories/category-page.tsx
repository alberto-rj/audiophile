import { useParams } from 'react-router-dom';

import { useGetProductsByCategorySlugQuery } from '@/app/services/categories';
import {
  BestGear,
  CategoryListing,
  ErrorMessage,
  Header,
  ProductCard,
} from '@/components/widgets';
import { cn } from '@/libs/cn';
import type { Product } from '@/libs/types';

interface ProductListProps {
  products: Product[];
}

function ProductList({ products }: ProductListProps) {
  return (
    <ul
      role='list'
      className={cn('flow')}
    >
      {products.map(({ id, image, name, description, isNew, slug }, i) => (
        <li key={id}>
          <ProductCard
            content={{
              image,
              title: name,
              description,
              isNew,
              slug: slug,
              isReversed: i % 2 !== 0,
            }}
          />
        </li>
      ))}
    </ul>
  );
}

const CategoryPage = () => {
  const slug = useParams()?.slug;

  const { isLoading, isError, refetch, data } =
    useGetProductsByCategorySlugQuery(slug!, { skip: !slug });

  if (isLoading) {
    return <p>Loading products...</p>;
  }

  if (isError) {
    return (
      <ErrorMessage>
        <ErrorMessage.Description>
          Failed to load products.
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
