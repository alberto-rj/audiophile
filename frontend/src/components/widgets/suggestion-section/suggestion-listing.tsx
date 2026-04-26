import SuggestionCard from './suggestion-card';
import type { BasicProduct } from '@/libs/types';
import { cn } from '@/libs/cn';

interface SuggestionListingProps {
  items: BasicProduct[];
}

const SuggestionListing = ({ items }: SuggestionListingProps) => {
  return (
    <ul
      role='list'
      className={cn(
        'grid',
        'grid-cols-[repeat(1,minmax(0,20.4375em))]',
        'gap-14',

        'md:grid-cols-[repeat(3,minmax(0,13.9375em))]',
        'md:gap-2.75',

        'lg:grid-cols-[repeat(3,minmax(0,21.875em))]',
        'lg:gap-7.5',
      )}
    >
      {items.map((item) => (
        <li key={item.slug}>
          <SuggestionCard product={item} />
        </li>
      ))}
    </ul>
  );
};

export default SuggestionListing;
