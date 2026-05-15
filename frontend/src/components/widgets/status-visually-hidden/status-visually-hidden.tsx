import { cn } from '@/libs/cn';

type StatusVisuallyHiddenProps = React.ComponentProps<'div'>;

const StatusVisuallyHidden = ({
  className,
  ...props
}: StatusVisuallyHiddenProps) => {
  return (
    <div
      {...props}
      role='status'
      aria-live='polite'
      aria-atomic={true}
      className={cn('sr-only', className)}
    />
  );
};

export default StatusVisuallyHidden;
