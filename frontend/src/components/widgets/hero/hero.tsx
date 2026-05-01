import { Link } from 'react-router-dom';

import { Button } from '@/components/ui';
import { ResponsiveImage } from '@/components/widgets';
import { cn } from '@/libs/cn';
import type { Product } from '@/libs/types';
import { createProductRoute } from '@/libs/app-routes';

interface HeroProps {
  product: Product;
}

const Hero = ({
  product: { name, description, slug, image, isNew },
}: HeroProps) => {
  return (
    <header
      className={cn(
        'relative',
        'min-block-150',

        'md:min-block-182',

        'bg-gray-900',
        'text-white',
      )}
    >
      <ResponsiveImage
        image={image}
        alt=''
        className={cn(
          'absolute',
          'inset-0',
          'inline-full',
          'block-full',
          'object-cover',
        )}
      />
      <div
        className={cn(
          'wrapper',
          'flex',
          'flex-col',
          'items-center',
          'justify-center',

          'md:justify-start',

          'lg:flex-row',
          'lg:justify-between',

          'py-28',
          'md:py-40',
          'lg:py-48',
        )}
      >
        <div
          className={cn(
            'max-inline-116',
            'absolute',
            'inset-bs-1/2',
            'inset-s-1/2',
            '-translate-1/2',
            'z-2',

            'flex',
            'flex-col',
            'items-center',
            'gap-7',

            'md:gap-10',

            'lg:items-start',
            'lg:static',
            'lg:translate-none',
          )}
        >
          <div
            className={cn(
              'flex',
              'flex-col',
              'items-center',
              'text-center',
              'gap-6',

              'lg:text-start',
              'lg:items-start',
            )}
          >
            <div
              className={cn(
                'flex',
                'flex-col',
                'items-center',
                'gap-4',

                'md:gap-6',

                'lg:items-start',
              )}
            >
              {isNew && (
                <span
                  className={cn(
                    'uppercase',
                    'text-sm',

                    'text-white/50',
                  )}
                >
                  New product
                </span>
              )}
              <h1
                className={cn(
                  'text-2xl',

                  'md:text-4xl',

                  'uppercase',
                )}
              >
                {name}
              </h1>
            </div>
            <p className={cn('text-white/75')}>{description}</p>
          </div>
          <Button
            variant={'primary'}
            asChild
          >
            <Link to={createProductRoute(slug)}>See product</Link>
          </Button>
        </div>
      </div>
    </header>
  );
};

export default Hero;
