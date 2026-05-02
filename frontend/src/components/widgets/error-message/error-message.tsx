import type { ComponentProps } from 'react';

import { Button } from '@/components/ui';
import { cn } from '@/libs/cn';

type ErrorMessageRetryProps = ComponentProps<typeof Button>;

const ErrorMessageRetry = ({ ...props }: ErrorMessageRetryProps) => {
  return <Button {...props} />;
};

type ErrorMessageDescriptionProps = ComponentProps<'p'>;

const ErrorMessageDescription = ({
  ...props
}: ErrorMessageDescriptionProps) => {
  return <p {...props} />;
};

type ErrorMessageProps = ComponentProps<'div'>;

const ErrorMessage = ({ className, ...props }: ErrorMessageProps) => {
  return (
    <div
      {...props}
      role='alert'
      aria-live='polite'
      className={cn(
        'flex',
        'flex-col',
        'items-center',
        'gap-7',
        'text-center',

        'md:gap-10',

        className,
      )}
    />
  );
};

ErrorMessage.Description = ErrorMessageDescription;
ErrorMessage.Retry = ErrorMessageRetry;

export default ErrorMessage;
