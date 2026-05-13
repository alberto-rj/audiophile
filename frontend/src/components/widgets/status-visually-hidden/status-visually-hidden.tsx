import { cn } from '@/libs/cn';

type StatusVisuallyHiddenProps = React.ComponentProps<'span'>;

const StatusVisuallyHidden = ({
  className,
  ...props
}: StatusVisuallyHiddenProps) => {
  return (
    <span
      {...props}
      role='status'
      aria-live='polite'
      aria-atomic={true}
      className={cn('sr-only', className)}
    />
  );
};

export default StatusVisuallyHidden;
