import { useParams } from 'react-router-dom';

import { useGetProductsByCategorySlugQuery } from '@/app/services/categories';
import {
  BestGear,
  CategoryListing,
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
      className={cn('flex', 'flex-col', 'gap-8')}
    >
      {products.map(({ id, image, name, description, isNew, slug }, i) => (
        <li
          key={id}
          className={cn('my-16')}
        >
          <ProductCard
            key={id}
            content={{
              image,
              title: name,
              description,
              isNew,
              slug: slug,
              isReversed: i % 2 === 0,
            }}
          />
        </li>
      ))}
    </ul>
  );
}

const CategoryPage = () => {
  const params = useParams<string>();

  const { isLoading, isError, data } = useGetProductsByCategorySlugQuery(
    params.slug,
  );

  if (isLoading) {
    return <p>Loading...</p>;
  } else if (isError) {
    return <p>Something went wrong</p>;
  } else {
    const category = data!;

    return (
      <>
        <Header title={category.name} />
        <div className={cn('flow', 'bg-white')}>
          <div className={cn('wrapper', 'flow-spacing')}>
            <CategoryListing />
            <ProductList products={category.items} />
          </div>
          <BestGear />
        </div>
      </>
    );
  }
};

export default CategoryPage;
