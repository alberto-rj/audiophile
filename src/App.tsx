import {
  BestGear,
  CategoryListing,
  FeatureHighLighted,
  FeatureLandscape,
  FeaturePortrait,
  Footer,
  Hero,
  Navbar,
} from '@/components/widgets';
import { cn } from '@/libs/cn';
import { newProduct } from '@/libs/mocks';
import {
  categoriesContent,
  featureHighLightedContent,
  featureLandscapeContent,
  featurePortraitContent,
} from '@/libs/constants';

function App() {
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
        <Hero product={newProduct} />
        <main className={cn('bg-white')}>
          <div className={cn('region', 'wrapper')}>
            <CategoryListing items={categoriesContent} />
          </div>
          <div
            className={cn(
              'region',
              'wrapper',
              'grid',
              'gap-6',

              'md:gap-8',

              'md:gap-12',
            )}
          >
            <FeatureHighLighted content={featureHighLightedContent} />
            <FeatureLandscape content={featureLandscapeContent} />
            <FeaturePortrait content={featurePortraitContent} />
          </div>
          <BestGear />
        </main>
        <Footer />
      </div>
    </>
  );
}

export default App;
