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

  const { isLoading, isError, data } = useGetProductsByCategorySlugQuery(
    slug!,
    { skip: !slug },
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
        <div className={cn('bg-white')}>
          <div className={cn('wrapper', 'flow', 'flow-spacing')}>
            <CategoryListing />
            <ProductList products={category.items} />
            <BestGear />
          </div>
        </div>
      </>
    );
  }
};

export default CategoryPage;
