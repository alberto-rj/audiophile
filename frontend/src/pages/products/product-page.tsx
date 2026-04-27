import { useParams } from 'react-router-dom';

import { BestGear, CategoryListing } from '@/components/widgets';
import { cn } from '@/libs/cn';
import { useGetProductBySlugQuery } from '@/app/services/products';

import ProductDetailedCard from './product-detailed-card';
import FeaturesSection from './features-section';
import InTheBoxSection from './in-the-box-section';
import Gallery from './gallery';
import SuggestionSection from './suggestion-section/suggestion-section';

const ProductPage = () => {
  const params = useParams();

  const { isLoading, isError, data } = useGetProductBySlugQuery(params.slug!);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error...</p>;
  }

  const product = data!;

  return (
    <div className={cn('bg-white')}>
      <div className={cn('wrapper', 'flow')}>
        <ProductDetailedCard
          product={product}
          className={cn('flow-spacing')}
        />
        <div
          className={cn(
            'flex',
            'flex-col',
            'gap-22',

            'lg:flex-row',
            'lg:justify-between',
            'lg:items-start',
            'lg:gap-8',
          )}
        >
          <FeaturesSection
            content={{ title: 'Features', description: product.features }}
            className={cn('lg:max-inline-158.75')}
          />
          <InTheBoxSection
            content={{ title: 'In the box', items: product.includes }}
          />
        </div>
        <Gallery
          content={{ title: product.category, images: product.gallery }}
        />
        <SuggestionSection
          title='You may also like'
          items={product.others}
        />
        <CategoryListing />

        <BestGear />
      </div>
    </div>
  );
};

export default ProductPage;
