import { Link } from 'react-router-dom';

import { Button } from '@/components/ui';
import { SEO } from '@/components/widgets';
import { APP_ROUTES } from '@/config/app-routes';
import { cn } from '@/libs/cn';

const NotFoundPage = () => {
  return (
    <>
      <SEO
        metadata={{
          title: 'Page Not Found | Audiophile',
          description:
            'The page you are looking for does not exist or may have been moved. Return to Audiophile homepage to continue browsing premium audio products.',
        }}
      />
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
              Page not found
            </h1>
            <p className={cn('max-inline-116')}>
              The page you're looking for doesn't exist or has been moved.
            </p>
          </div>
          <Button
            variant={'primary'}
            asChild
          >
            <Link to={APP_ROUTES.home}>Go back home</Link>
          </Button>
        </div>
      </main>
    </>
  );
};

export default NotFoundPage;
