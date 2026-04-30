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
    'text-2xs',
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

          'bg-primary-400',
          'text-white',

          'hover:bg-primary-200',
        ),

        secondary: cn(
          'min-inline-40',
          'px-8',
          'py-4',

          'bg-black',
          'text-white',

          'hover:bg-gray-800',
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
          '[&_svg]:fill-primary-400',
          'text-black-o-50',
          'p-0',

          'hover:text-primary-400',
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
  const buttonClasses = cn(buttonVariants({ variant }), className);

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
