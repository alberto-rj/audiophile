import { useId } from 'react';

import mobile from '@/assets/images/image-best-gear-mobile.jpg';
import tablet from '@/assets/images/image-best-gear-tablet.jpg';
import desktop from '@/assets/images/image-best-gear-desktop.jpg';

import type { ResponsiveImageType } from '@/libs/types';
import { cn } from '@/libs/cn';
import { ResponsiveImage } from '@/components/widgets';

const bestGear: ResponsiveImageType = {
  mobile,
  tablet,
  desktop,
};

interface BestGearProps {
  className?: string;
}

const BestGear = ({ className }: BestGearProps) => {
  const headingId = useId();

  return (
    <section aria-labelledby={headingId}>
      <div
        className={cn(
          'flex',
          'flex-col',
          'gap-10',

          'lg:flex-row-reverse',
          'lg:justify-between',
          'lg:items-center',
          'lg:gap-31.25',
          className,
        )}
      >
        <ResponsiveImage
          alt='Person enjoying music with premium headphones'
          loading='lazy'
          image={bestGear}
          className={cn(
            'object-cover',
            'rounded-lg',
            'aspect-327/300',

            'md:aspect-689/300',

            'lg:aspect-540/588',
          )}
        />
        <div
          className={cn(
            'max-inline-143.25',
            'justify-self-center',
            'flex',
            'flex-col',
            'items-center',
            'text-center',
            'gap-8',

            'lg:max-w-111.25',
            'lg:items-start',
            'lg:text-start',
          )}
        >
          <h2
            id={headingId}
            className={cn(
              'uppercase',
              'text-xl',

              'md:text-3xl',

              'text-black',
            )}
          >
            Bringing you the <span className={'text-primary-400'}>best</span>{' '}
            audio gear
          </h2>
          <p>
            Located at the heart of New York City, Audiophile is the premier
            store for high end headphones, earphones, speakers, and audio
            accessories. We have a large showroom and luxury demonstration rooms
            available for you to browse and experience a wide range of our
            products. Stop by our store to meet some of the fantastic people who
            make Audiophile the best place to buy your portable audio equipment.
          </p>
        </div>
      </div>
    </section>
  );
};

export default BestGear;
