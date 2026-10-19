import { Spinner } from '@/components/ui';
import { StatusVisuallyHidden } from '@/components/widgets';
import { cn } from '@/libs/cn';

const PageLoader = () => {
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
      <StatusVisuallyHidden>Loading your experience...</StatusVisuallyHidden>
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
          size="lg"
          className={cn('mx-auto')}
        />
        <p
          className={cn(
            'text-md',

            'text-black',
          )}
        >
          Preparing everything for you...
        </p>
      </div>
    </main>
  );
};

export default PageLoader;
