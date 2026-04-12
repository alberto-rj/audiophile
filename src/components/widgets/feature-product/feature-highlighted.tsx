import { useId } from 'react';

import type { Product } from '@/libs/types';
import { cn } from '@/libs/cn';
import { ResponsiveImage } from '@/components/widgets';
import { Button } from '@/components/ui';

interface FeatureHighLightedProps {
  product: Product;
}

const FeatureHighLighted = ({
  product: { name, description, slug, image },
}: FeatureHighLightedProps) => {
  const headingId = useId();

  return (
    <section
      aria-describedby={headingId}
      className={cn('')}
    >
      <ResponsiveImage
        alt=''
        image={image}
        className={cn('')}
      />
      <div>
        <div>
          <h2 id={headingId}>{name}</h2>
          <p>{description}</p>
        </div>
        <Button
          variant={'outline'}
          asChild
        >
          <a href={slug}>See product</a>
        </Button>
      </div>
    </section>
  );
};

export default FeatureHighLighted;
