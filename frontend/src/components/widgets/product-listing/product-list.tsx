import type { ApiProduct } from '@audiophile/shared';
import { cn } from '@/libs/cn';

import { ProductCard } from './product-card';

interface ProductListProps {
  products: ApiProduct[];
}

export function ProductList({ products }: ProductListProps) {
  return products.length === 0 ? (
    <p className={cn('text-center')}>We have no products yet.</p>
  ) : (
    <ul
      role="list"
      className={cn('flow')}
    >
      {products.map((product, i) => (
        <li key={product.slug}>
          <ProductCard
            content={product}
            isReversed={i % 2 !== 0}
          />
        </li>
      ))}
    </ul>
  );
}
