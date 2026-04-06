import { cva, type VariantProps } from 'class-variance-authority';
import type { ButtonHTMLAttributes } from 'react';

import { cn } from '@/libs/cn';

const buttonVariants = cva(
  cn(
    'inline-flex',
    'gap-3',
    'justify-center',
    'cursor-pointer',
    'font-display',
    'uppercase',
    'outline-none',
    'border-none',
    'focus:ring-2',
    'focus-visible:ring-2',
  ),
  {
    variants: {
      variant: {
        primary: cn(
          'bg-primary-400',
          'text-white',
          'hover:bg-primary-200',
          'focus:ring-gray-200',
          'focus-visible:ring-gray-200',
        ),
        outline: cn(
          'bg-white',
          'text-black',
          'border-2',
          'border-solid',
          'border-black',
          'hover:bg-black',
          'hover:text-white',
        ),
        ghost: cn(
          '[&_svg]:fill-primary-400',
          'text-black',
          'opacity-50',
          'hover:text-primary-400',
          'hover:opacity-100',
          'focus:ring-primary-400',
          'focus:opacity-100',
          'focus-visible:ring-primary-400',
          'focus-visible:opacity-100',
        ),
      },

      size: {
        sm: cn('min-inline-20', 'px-4', 'py-2', 'text-xs'),
        md: cn('min-inline-40', 'px-8', 'py-4', 'text-xs'),
      },

      disabled: {
        true: cn('bg-gray-200', 'text-gray-400', 'cursor-not-allowed'),
      },
    },

    defaultVariants: {
      variant: 'primary',
      size: 'md',
      disabled: false,
    },
  },
);

type ButtonVariants = VariantProps<typeof buttonVariants>;

type ButtonProps = ButtonVariants &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'disabled' | 'size'>;

const Button = ({
  variant,
  size,
  disabled,
  className,
  children,
  ...props
}: ButtonProps) => {
  const buttonClasses = cn(
    buttonVariants({ variant, size, disabled }),
    className,
  );

  return (
    <button
      {...props}
      disabled={Boolean(disabled)}
      className={buttonClasses}
    >
      {children}
    </button>
  );
};

export default Button;
