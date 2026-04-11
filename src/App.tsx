import { CategoryListing, Footer, Navbar } from '@/components/widgets';

import headphones from '@/assets/shared/desktop/image-category-thumbnail-headphones.png';
import earphones from '@/assets/shared/desktop/image-category-thumbnail-earphones.png';
import speakers from '@/assets/shared/desktop/image-category-thumbnail-speakers.png';
import { cn } from '@/libs/cn';

function App() {
  return (
    <>
      <div className={cn('w-full min-h-screen flex flex-col justify-between')}>
        <Navbar />
        <main className={cn('bg-gray-900 hidden')}>
          <div className={cn('wrapper')}>
            <CategoryListing
              items={[
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
              ]}
            />
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}

export default App;
