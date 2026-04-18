import { useId } from 'react';

import type { InTheBoxSectionContent } from '@/libs/types';
import { cn } from '@/libs/cn';

interface InTheBoxSectionProps {
  content: InTheBoxSectionContent;
  className?: string;
}

const InTheBoxSection = ({
  content: { title, items },
  className,
}: InTheBoxSectionProps) => {
  const headingId = useId();

  return (
    <section
      aria-labelledby={headingId}
      className={cn(
        'flex',
        'flex-col',
        'gap-6',

        'md:flex-row',
        'md:items-start',
        'md:justify-between',
        'md:gap-2.75',

        'lg:flex-col',
        'lg:gap-8',
        className,
      )}
    >
      <h2
        id={headingId}
        className={cn('uppercase', 'text-2xl')}
      >
        {title}
      </h2>
      <ul
        role='list'
        className={cn('flex', 'flex-col', 'gap-2')}
      >
        {items.map(({ item, quantity }) => (
          <li
            key={item}
            className={cn(
              'flex',
              'items-center',
              'gap-5.25',
              'text-base',

              'md:gap-6',

              'text-black-o-50',
            )}
          >
            <span className={cn('sr-only')}>{quantity} times</span>
            <span
              className={cn('uppercase', 'text-primary-400')}
              aria-hidden={true}
            >
              {quantity}x
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ul>
    </section>
  );
};

export default InTheBoxSection;
