import {
  BestGear,
  CategoriesListing,
  FeatureProducts,
  Hero,
  SEO,
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
      <SEO
        metadata={{
          title: 'Premium Audio Equipment | Audiophile',
          description:
            'Discover premium headphones, earphones, speakers, and audio gear at Audiophile. Shop high-quality sound equipment designed for immersive listening experiences.',
        }}
      />
      <Hero product={heroNewProduct} />
      <div>
        <div className={cn('wrapper', 'flow', 'flow-spacing')}>
          <CategoriesListing />
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
