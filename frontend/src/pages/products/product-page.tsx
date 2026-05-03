import { useParams } from 'react-router-dom';

import { useGetProductBySlugQuery } from '@/app/services/products';
import {
  BestGear,
  CategoryListing,
  ErrorMessage,
  GoBack,
} from '@/components/widgets';
import { cn } from '@/libs/cn';
import type { Product } from '@/libs/types';

import ProductDetailsCard from './product-details-card/product-details-card';
import FeaturesSection from './features-section/features-section';
import InTheBoxSection from './in-the-box-section/in-the-box-section';
import Gallery from './gallery/gallery';
import SuggestionSection from './suggestion-section/suggestion-section';
import ProductDetailsCardSkeleton from './product-details-card/product-details-card-skeleton';
import FeaturesSectionSkeleton from './features-section/features-section-skeleton';
import InTheBoxSectionSkeleton from './in-the-box-section/in-the-box-section.-skeleton';
import GallerySkeleton from './gallery/gallery-skeleton';
import { SuggestionSectionSkeleton } from './suggestion-section/suggestion-section-skeleton';

const ProductDetailsSkeleton = () => {
  return (
    <>
      <ProductDetailsCardSkeleton />
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
        <FeaturesSectionSkeleton
          lines={10}
          className={cn('lg:max-inline-158.75')}
        />
        <InTheBoxSectionSkeleton itemsCount={10} />
      </div>
      <GallerySkeleton />
      <SuggestionSectionSkeleton />
    </>
  );
};

interface ProductDetailsProps {
  product: Product;
}

const ProductDetails = ({ product }: ProductDetailsProps) => {
  return (
    <>
      <ProductDetailsCard product={product} />
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
      <Gallery content={{ title: product.category, images: product.gallery }} />
      <SuggestionSection
        title='You may also like'
        items={product.others}
      />
    </>
  );
};

const ProductDetailsFetching = () => {
  const slug = useParams()?.slug;
  const {
    isLoading,
    isError,
    refetch,
    data: product,
  } = useGetProductBySlugQuery(slug!, {
    skip: !slug,
  });

  if (isLoading) {
    return (
      <>
        <p
          role='status'
          aria-live='polite'
          className={cn('sr-only')}
        >
          Loading product details...
        </p>
        <ProductDetailsSkeleton />
      </>
    );
  }

  if (isError) {
    return (
      <ErrorMessage>
        <ErrorMessage.Description>
          Failed to load product details for {`"${slug}"`}.
        </ErrorMessage.Description>
        <ErrorMessage.Retry
          onClick={refetch}
          aria-label='Try again - reload product details'
        >
          Try again
        </ErrorMessage.Retry>
      </ErrorMessage>
    );
  }

  return <ProductDetails product={product!} />;
};

const ProductPage = () => {
  return (
    <div>
      <GoBack>
        <GoBack.Control />
      </GoBack>
      <div className={cn('wrapper', 'flow')}>
        <ProductDetailsFetching />
        <CategoryListing />
        <BestGear />
      </div>
    </div>
  );
};

export default ProductPage;
