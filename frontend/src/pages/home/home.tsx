import {
  BestGear,
  CategoryListing,
  FeatureProducts,
  Hero,
} from '@/components/widgets';
import { cn } from '@/libs/cn';
import {
  featureHighLightedContent,
  featureLandscapeContent,
  featurePortraitContent,
  heroNewProduct,
} from '@/libs/constants';

function Home() {
  return (
    <>
      <Hero product={heroNewProduct} />
      <div className={cn('bg-white')}>
        <div className={cn('wrapper', 'flow', 'flow-spacing')}>
          <CategoryListing />
          <FeatureProducts
            highLightedContent={featureHighLightedContent}
            portraitContent={featurePortraitContent}
            landscapeContent={featureLandscapeContent}
          />
          <BestGear />
        </div>
      </div>
    </>
  );
}

export default Home;
