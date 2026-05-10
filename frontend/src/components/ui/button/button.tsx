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
    'text-2xs',

    'cursor-pointer',
    'font-display',
    'uppercase',

    'disabled:bg-black',
    'disabled:text-gray-200',
    'disabled:opacity-25',
    'disabled:cursor-not-allowed',
    'disabled:pointer-events-none',
    'disabled:select-none',
  ),
  {
    variants: {
      variant: {
        primary: cn(
          'min-inline-40',
          'px-8',
          'py-4',

          'bg-primary-700',
          'text-white',

          'hover:bg-primary-800',
        ),

        secondary: cn(
          'min-inline-40',
          'px-8',
          'py-4',

          'bg-secondary-700',
          'text-white',

          'hover:bg-secondary-800',
        ),

        outline: cn(
          'min-inline-40',
          'px-8',
          'py-4',

          'bg-transparent',
          'text-black',
          'border',
          'border-black',

          'hover:bg-black',
          'hover:text-white',
        ),

        link: cn(
          '[&_svg]:fill-primary-700',

          'hover:text-primary-700',
        ),
      },
    },

    defaultVariants: {
      variant: 'primary',
    },
  },
);

type ButtonVariants = VariantProps<typeof buttonVariants>;

interface ButtonProps
  extends ButtonVariants, ButtonHTMLAttributes<HTMLButtonElement> {
  asChild?: boolean;
}

const Button = ({
  asChild = false,
  variant,
  className,
  children,
  ...props
}: ButtonProps) => {
  const Comp = asChild ? Slot : 'button';

  return (
    <Comp
      {...props}
      className={cn(buttonVariants({ variant }), className)}
    >
      {children}
    </Comp>
  );
};

export default Button;
