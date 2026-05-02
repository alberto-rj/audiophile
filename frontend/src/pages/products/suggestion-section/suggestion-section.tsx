import { useId } from 'react';

import type { BasicProduct } from '@/libs/types';
import { cn } from '@/libs/cn';

import SuggestionList from './suggestion-list';

interface SuggestionSectionProps {
  title: string;
  items: BasicProduct[];
  className?: string;
}

const SuggestionSection = ({
  title,
  items,
  className,
}: SuggestionSectionProps) => {
  const headingId = useId();

  return (
    <section
      aria-labelledby={headingId}
      className={cn(
        'flex',
        'flex-col',
        'items-center',
        'gap-10',

        'md:gap-14',

        'lg:gap-16',

        className,
      )}
    >
      <h2
        id={headingId}
        className={cn(
          'text-lg',
          'text-center',

          'md:text-2xl',

          'text-black',
          'uppercase',
        )}
      >
        {title}
      </h2>
      <SuggestionList items={items} />
    </section>
  );
};

export default SuggestionSection;
