import {
  BestGear,
  CategoryListing,
  Footer,
  Navbar,
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
    <>
      <div
        className={cn(
          'w-full',
          'min-h-screen',
          'flex',
          'flex-col',
          'justify-between',
        )}
      >
        <Navbar />
        <div className={cn('flow')}>
          <main className={cn('flow', 'bg-white')}>
            <ProductDetailedCard
              content={productDetailedCardContent}
              className={cn(WrapperBaseStyles, 'flow-spacing')}
            />
            <div className={cn(WrapperBaseStyles, 'flex', 'flex-col', 'gap-6')}>
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
          </main>
          <Footer />
        </div>
      </div>
    </>
  );
};

export default ProductPage;
