import { Slot } from '@radix-ui/react-slot';
import { cva, type VariantProps } from 'class-variance-authority';
import type { ButtonHTMLAttributes } from 'react';

import { cn } from '@/libs/cn';

const buttonVariants = cva(
  cn(
    'inline-flex',
    'gap-3',
    'justify-center',
    'items-center',
    'cursor-pointer',
    'font-display',
    'uppercase',
    'outline-none',
    'border-none',
    'focus:ring-2',
    'focus-visible:ring-2',
    'focus:ring-gray-900',
    'focus-visible:ring-gray-900',
    'disabled:bg-black',
    'disabled:text-gray-200',
    'disabled:opacity-25',
    'disabled:cursor-not-allowed',
    'disabled:pointer-events-none',
  ),
  {
    variants: {
      variant: {
        primary: cn('bg-primary-400', 'text-white', 'hover:bg-primary-200'),
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
          'text-black-o-50',
          'hover:text-primary-400',
        ),
      },

      size: {
        sm: cn('min-inline-20', 'px-4', 'py-2', 'text-xs'),
        md: cn('min-inline-40', 'px-8', 'py-4', 'text-xs'),
      },
    },

    defaultVariants: {
      variant: 'primary',
      size: 'md',
    },
  },
);

type ButtonVariants = VariantProps<typeof buttonVariants>;

interface ButtonProps
  extends
    ButtonVariants,
    Omit<ButtonHTMLAttributes<HTMLButtonElement>, 'size'> {
  asChild?: boolean;
}

const Button = ({
  asChild = false,
  variant,
  size,
  className,
  children,
  ...props
}: ButtonProps) => {
  const Comp = asChild ? Slot : 'button';
  const buttonClasses = cn(buttonVariants({ variant, size }), className);

  return (
    <Comp
      className={buttonClasses}
      {...props}
    >
      {children}
    </Comp>
  );
};

export default Button;
