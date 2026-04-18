import {
  BestGear,
  CategoryListing,
  Footer,
  Header,
  Navbar,
} from '@/components/widgets';
import { cn } from '@/libs/cn';
import { categoriesContent } from '@/libs/constants';

const CategoryPage = () => {
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
        <Header title='Category name' />
        <div className={cn('flow')}>
          <main className={cn('flow', 'bg-white')}>
            <div className={cn('wrapper', 'flow-spacing')}>
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

export default CategoryPage;
