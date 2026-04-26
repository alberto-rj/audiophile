import { useId } from 'react';

import mobile from '@/assets/shared/mobile/image-best-gear.jpg';
import tablet from '@/assets/shared/tablet/image-best-gear.jpg';
import desktop from '@/assets/shared/desktop/image-best-gear.jpg';

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
    <section
      aria-labelledby={headingId}
      className={cn('bg-white', 'text-black')}
    >
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
          className={cn('max-w-full', 'h-auto', 'object-cover', 'rounded-lg')}
        />
        <div
          className={cn(
            'max-w-143.25',
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
            )}
          >
            Bringing you the <span className={'text-primary-400'}>best</span>{' '}
            audio gear
          </h2>
          <p className='text-base text-black-o-50'>
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
