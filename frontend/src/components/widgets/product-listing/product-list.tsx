import { cn } from '@/libs/cn';
import type { Product } from '@/libs/types';

import { ProductCard } from './product-card';

interface ProductListProps {
  products: Product[];
}

export function ProductList({ products }: ProductListProps) {
  return products.length === 0 ? (
    <p>We have no products yet.</p>
  ) : (
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
