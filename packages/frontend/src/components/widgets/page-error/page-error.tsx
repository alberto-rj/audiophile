import { Link } from 'react-router-dom';

import { Button } from '@/components/ui';
import { APP_ROUTES } from '@/config/app-routes';
import { cn } from '@/libs/cn';

const PageError = () => {
  const handleRetry = () => {
    window.location.reload();
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
            Something went wrong
          </h1>
          <p className={cn('max-inline-116')}>
            Something went wrong on our end. Please try again or go back to the
            homepage.
          </p>
        </div>
        <div className={cn('flex', 'flex-wrap', 'justify-center', 'gap-4')}>
          <Button
            variant="outline"
            onClick={handleRetry}
          >
            Try again
          </Button>
          <Button
            variant="primary"
            asChild
          >
            <Link to={APP_ROUTES.home}>Go back home</Link>
          </Button>
        </div>
      </div>
    </main>
  );
};

export default PageError;
