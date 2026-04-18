import {
  BestGear,
  CategoryListing,
  FeatureProducts,
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

function Home() {
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
        <div className={cn('flow')}>
          <main className={cn('flow', 'bg-white')}>
            <div className={cn('wrapper', 'flow-spacing')}>
              <CategoryListing items={categoriesContent} />
            </div>
            <FeatureProducts
              highLightedContent={featureHighLightedContent}
              portraitContent={featurePortraitContent}
              landscapeContent={featureLandscapeContent}
            />
            <BestGear />
          </main>
          <Footer />
        </div>
      </div>
    </>
  );
}

export default Home;
