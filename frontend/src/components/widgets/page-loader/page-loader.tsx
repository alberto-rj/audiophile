import { useId } from 'react';

import { Spinner } from '@/components/ui';
import { cn } from '@/libs/cn';

const PageLoader = () => {
  const descriptionId = useId();

  return (
    <main
      className={cn(
        'wrapper',
        'region',
        'min-block-screen',
        'flex',
        'justify-center',
        'items-center',
      )}
    >
      <div
        className={cn(
          'flex',
          'flex-col',
          'items-center',
          'gap-8',
          'text-center',

          'md:gap-10',
        )}
      >
        <Spinner
          variant='primary'
          size='lg'
          aria-labelledby={descriptionId}
          className={cn('mx-auto')}
        />

        <p
          id={descriptionId}
          className={cn('text-md')}
        >
          Preparing everything for you...
        </p>
      </div>
    </main>
  );
};

export default PageLoader;
