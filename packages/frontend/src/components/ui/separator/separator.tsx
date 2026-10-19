import { cva, type VariantProps } from 'class-variance-authority';

import { cn } from '@/libs/cn';

const separatorVariants = cva('bg-gray-600', {
  variants: {
    orientation: {
      horizontal: cn('inline-full', 'block-px'),
      vertical: cn('inline-px', 'block-full'),
    },
  },

  defaultVariants: {
    orientation: 'horizontal',
  },
});

type SeparatorVariants = VariantProps<typeof separatorVariants>;

interface SeparatorProps extends SeparatorVariants {
  decorative?: boolean;
  className?: string;
}

const Separator = ({
  orientation,
  decorative = true,
  className,
}: SeparatorProps) => {
  const role = decorative ? undefined : 'separator';

  return (
    <div
      role={role}
      className={cn(
        separatorVariants({ orientation }),

        className,
      )}
    />
  );
};

export default Separator;
