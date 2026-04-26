import {
  BestGear,
  CategoryListing,
  FeatureProducts,
  Hero,
} from '@/components/widgets';
import { cn } from '@/libs/cn';
import { newProduct } from '@/libs/mocks';
import {
  featureHighLightedContent,
  featureLandscapeContent,
  featurePortraitContent,
} from '@/libs/constants';

function Home() {
  return (
    <>
      <Hero product={newProduct} />
      <div className={cn('flow', 'bg-white')}>
        <div className={cn('wrapper', 'flow-spacing')}>
          <CategoryListing />
        </div>
        <FeatureProducts
          highLightedContent={featureHighLightedContent}
          portraitContent={featurePortraitContent}
          landscapeContent={featureLandscapeContent}
        />
      </div>
      <BestGear />
    </>
  );
}

export default Home;
