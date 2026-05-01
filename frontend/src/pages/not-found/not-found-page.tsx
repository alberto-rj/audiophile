import { Link } from 'react-router-dom';

import { Button } from '@/components/ui';
import { cn } from '@/libs/cn';

const NotFoundPage = () => {
  return (
    <main
      className={cn(
        'region',
        'min-block-screen',
        'flex',
        'justify-center',
        'items-center',
      )}
    >
      <div className={cn('wrapper')}>
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
              Oops! We can’t seem to find that page
            </h1>
            <p className={cn('max-inline-116')}>
              It looks like the link you followed might be broken or the page
              has been moved. Don't worry, it happens to the best of us!
            </p>
          </div>
          <Button
            variant={'primary'}
            asChild
          >
            <Link to='/'>Back to Homepage</Link>
          </Button>
        </div>
      </div>
    </main>
  );
};

export default NotFoundPage;
