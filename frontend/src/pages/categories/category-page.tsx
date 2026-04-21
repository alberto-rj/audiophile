import { BestGear, CategoryListing, Header } from '@/components/widgets';
import { cn } from '@/libs/cn';
import { categoriesContent } from '@/libs/constants';

const CategoryPage = () => {
  return (
    <>
      <Header title='Category name' />
      <div className={cn('flow', 'bg-white')}>
        <div className={cn('wrapper', 'flow-spacing')}>
          <CategoryListing items={categoriesContent} />
        </div>
        <BestGear />
      </div>
    </>
  );
};

export default CategoryPage;
