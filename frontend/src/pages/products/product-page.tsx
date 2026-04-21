import {
  BestGear,
  CategoryListing,
  SuggestionSection,
} from '@/components/widgets';
import { cn } from '@/libs/cn';
import {
  categoriesContent,
  featuresSectionContent,
  galleryContent,
  inTheBoxSectionContent,
  productDetailedCardContent,
  suggestionItems,
} from '@/libs/constants';

import Gallery from './gallery';
import ProductDetailedCard from './product-detailed-card';
import InTheBoxSection from './in-the-box-section';
import FeaturesSection from './features-section';

const ProductPage = () => {
  const WrapperBaseStyles = cn('wrapper');

  return (
    <div className={cn('flow', 'bg-white')}>
      <ProductDetailedCard
        content={productDetailedCardContent}
        className={cn(WrapperBaseStyles, 'flow-spacing')}
      />
      <div className={cn(WrapperBaseStyles, 'flow')}>
        <FeaturesSection content={featuresSectionContent} />
        <InTheBoxSection content={inTheBoxSectionContent} />
      </div>
      <Gallery
        content={galleryContent}
        className={cn(WrapperBaseStyles)}
      />
      <SuggestionSection
        items={suggestionItems}
        title='You may also like'
        className={cn(WrapperBaseStyles)}
      />
      <div className={cn(WrapperBaseStyles)}>
        <CategoryListing items={categoriesContent} />
      </div>

      <BestGear />
    </div>
  );
};

export default ProductPage;
