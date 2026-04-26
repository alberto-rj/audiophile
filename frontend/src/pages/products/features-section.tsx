import { Fragment, useId } from 'react';

import type { FeaturesSectionContent } from '@/libs/types';
import { cn } from '@/libs/cn';

interface FeaturesSectionProps {
  content: FeaturesSectionContent;
  className?: string;
}

const FeaturesSection = ({
  content: { title, description },
  className,
}: FeaturesSectionProps) => {
  const headingId = useId();

  return (
    <section
      aria-labelledby={headingId}
      className={cn(
        'flex',
        'flex-col',
        'gap-6',

        'md:gap-8',
        className,
      )}
    >
      <h2
        id={headingId}
        className={cn('uppercase', 'text-2xl')}
      >
        {title}
      </h2>
      <p className={cn('text-base', 'text-black-o-50')}>
        {renderTextWithNewlines(description)}
      </p>
    </section>
  );
};

function renderTextWithNewlines(text: string) {
  return text.split('\n').map((item, index) => (
    <Fragment key={index}>
      {item}
      <br />
    </Fragment>
  ));
}

export default FeaturesSection;
