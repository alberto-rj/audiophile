import { cva, type VariantProps } from 'class-variance-authority';
import type { ComponentProps } from 'react';

import { cn } from '@/libs/cn';

const spinnerVariants = cva(
  cn(
    'rounded-full',

    'motion-safe:animate-spin',
  ),
  {
    variants: {
      variant: {
        primary: cn('border-gray-300', 'border-bs-primary-400'),

        secondary: cn('border-gray-300', 'border-bs-gray-900'),

        danger: cn('border-gray-300', 'border-bs-danger-400'),
      },

      size: {
        sm: cn('inline-5', 'block-5', 'border-2'),

        md: cn('inline-10', 'block-10', 'border-4'),

        lg: cn('inline-20', 'block-20', 'border-8'),
      },
    },

    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  },
);

type SpinnerProps = ComponentProps<'div'> &
  VariantProps<typeof spinnerVariants>;

const Spinner = ({ className, variant, size, ...props }: SpinnerProps) => {
  return (
    <div
      {...props}
      aria-hidden={true}
      className={cn(
        spinnerVariants({
          variant,
          size,
        }),
        className,
      )}
    />
  );
};

export default Spinner;
