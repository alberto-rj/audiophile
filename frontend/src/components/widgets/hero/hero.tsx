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
      className={cn(
        'flex',
        'items-center',
        'relative',

        'min-h-150',
        'md:min-h-182',

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
          'w-full',
          'h-full',
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

                    'opacity-50',
                  )}
                >
                  New product
                </span>
              )}
              <h1 className={cn('text-2xl', 'md:text-4xl')}>{name}</h1>
            </div>
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
      </div>
    </header>
  );
};

export default Hero;
