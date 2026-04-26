import {
  BestGear,
  CategoryListing,
  SuggestionSection,
} from '@/components/widgets';
import { cn } from '@/libs/cn';
import Gallery from './gallery';
import ProductDetailedCard from './product-detailed-card';
import InTheBoxSection from './in-the-box-section';
import FeaturesSection from './features-section';
import { useGetProductBySlugQuery } from '@/app/services/products';
import { useParams } from 'react-router-dom';

const ProductPage = () => {
  const params = useParams();
  const { isLoading, isError, data } = useGetProductBySlugQuery(params.slug);

  if (isLoading) {
    return <p>Loading...</p>;
  }

  if (isError) {
    return <p>Error...</p>;
  }

  const product = data!;

  const WrapperBaseStyles = cn('wrapper');

  return (
    <div className={cn('flow', 'bg-white')}>
      <ProductDetailedCard
        product={product}
        className={cn(WrapperBaseStyles, 'flow-spacing')}
      />
      <div className={cn(WrapperBaseStyles, 'flow')}>
        <FeaturesSection
          content={{ title: 'Features', description: product.description }}
        />
        <InTheBoxSection
          content={{ title: 'In the box', items: product.includes }}
        />
      </div>
      <Gallery
        content={{ title: product.category, images: product.gallery }}
        className={cn(WrapperBaseStyles)}
      />
      <SuggestionSection
        items={product.others}
        title='You may also like'
        className={cn(WrapperBaseStyles)}
      />
      <div className={cn(WrapperBaseStyles)}>
        <CategoryListing />
      </div>

      <BestGear />
    </div>
  );
};

export default ProductPage;
