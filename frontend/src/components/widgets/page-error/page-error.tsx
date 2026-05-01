import { Link } from 'react-router-dom';
import type { FallbackProps } from 'react-error-boundary';

import { Button } from '@/components/ui';
import { cn } from '@/libs/cn';

const PageError = ({ resetErrorBoundary }: FallbackProps) => {
  const handleRetry = () => {
    resetErrorBoundary();
  };

  return (
    <main
      className={cn(
        'region',
        'wrapper',
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
          'gap-7',

          'md:gap-10',

          'lg:items-start',
        )}
      >
        <div
          className={cn(
            'max-inline-140',
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
              'text-2xl',

              'md:text-4xl',

              'text-black',
              'uppercase',
            )}
          >
            Oops! Something went wrong
          </h1>
          <p className={cn('max-inline-116')}>
            It looks like there was a small hiccup on our end. Don't worry, our
            team is already looking into it. In the meantime, try refreshing the
            page or back to homepage.
          </p>
        </div>
        <div className={cn('flex', 'flex-wrap', 'justify-center', 'gap-4')}>
          <Button
            variant={'secondary'}
            onClick={handleRetry}
            asChild
          >
            <Link to='/'>Try Again</Link>
          </Button>
          <Button
            variant={'primary'}
            asChild
          >
            <Link to='/'>Back to Home</Link>
          </Button>
        </div>
      </div>
    </main>
  );
};

export default PageError;
