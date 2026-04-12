import { Button } from '@/components/ui';
import { cn } from '@/libs/cn';
import type { Product } from '@/libs/types';
import { ResponsiveImage } from '@/components/widgets';

interface HeroProps {
  product: Product;
}

const Hero = ({
  product: { name, description, slug, image, isNew },
}: HeroProps) => {
  return (
    <header
      role='banner'
      className={cn(
        'flex',
        'items-center',
        'relative',

        'min-h-[calc(75vh+25%+2.5em)]',

        'bg-gray-900',
        'text-white',
      )}
    >
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
        )}
      >
        <div
          className={cn(
            'max-w-95',
            'absolute',
            'top-1/2',
            'left-1/2',
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
            <h1
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

                    'opacity-50',
                  )}
                >
                  New product
                </span>
              )}
              <span className={cn('text-2xl', 'md:text-4xl')}>{name}</span>
            </h1>
            <p
              className={cn(
                'text-base',

                'opacity-75',
              )}
            >
              {description}
            </p>
          </div>
          <Button
            variant={'primary'}
            asChild
          >
            <a href={slug}>See product</a>
          </Button>
        </div>
        <ResponsiveImage
          image={image}
          alt=''
          className={cn(
            'absolute',
            'top-0',
            'left-0',
            'w-full',
            'h-full',
            'object-cover',
            'bg-gray-700',
          )}
        />
      </div>
    </header>
  );
};

export default Hero;
