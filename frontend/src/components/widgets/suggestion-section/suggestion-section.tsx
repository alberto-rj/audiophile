import { useId } from 'react';

import type { SuggestionCardContent } from '@/libs/types';

import SuggestionListing from './suggestion-listing';
import { cn } from '@/libs/cn';

interface SuggestionSectionProps {
  title: string;
  items: SuggestionCardContent[];
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
        'wrapper',
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
          'uppercase',
          'text-lg',
          'text-center',

          'md:text-2xl',
        )}
      >
        {title}
      </h2>
      <SuggestionListing items={items} />
    </section>
  );
};

export default SuggestionSection;
