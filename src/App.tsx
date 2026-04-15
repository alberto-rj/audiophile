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

import headphones from '@/assets/shared/desktop/image-category-thumbnail-headphones.png';
import earphones from '@/assets/shared/desktop/image-category-thumbnail-earphones.png';
import speakers from '@/assets/shared/desktop/image-category-thumbnail-speakers.png';
import { cn } from '@/libs/cn';
import { newProduct } from '@/libs/mocks';
import {
  featureHighLightedContent,
  featureLandscapeContent,
  featurePortraitContent,
} from '@/libs/constants';

const items = [
  { category: 'Headphones', image: headphones, slug: '#' },
  { category: 'Speakers', image: speakers, slug: '#' },
  { category: 'Earphones', image: earphones, slug: '#' },
  { category: 'Headphones', image: headphones, slug: '#' },
  { category: 'Speakers', image: speakers, slug: '#' },
  { category: 'Earphones', image: earphones, slug: '#' },
  { category: 'Headphones', image: headphones, slug: '#' },
  { category: 'Speakers', image: speakers, slug: '#' },
  { category: 'Earphones', image: earphones, slug: '#' },
  { category: 'Earphones', image: earphones, slug: '#' },
  { category: 'Headphones', image: headphones, slug: '#' },
  { category: 'Speakers', image: speakers, slug: '#' },
  { category: 'Earphones', image: earphones, slug: '#' },
  { category: 'Headphones', image: headphones, slug: '#' },
  { category: 'Speakers', image: speakers, slug: '#' },
];

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
          <div className={cn('wrapper', 'hidden')}>
            <CategoryListing items={items} />
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
