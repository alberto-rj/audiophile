import type { LabelHTMLAttributes } from 'react';

import { cn } from '@/libs/cn';

interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  isInvalid?: boolean;
}

const Label = ({ isInvalid = false, className, ...props }: LabelProps) => {
  return (
    <label
      {...props}
      className={cn(
        'text-3xs',
        {
          'text-danger-400': isInvalid,
          'text-black': !isInvalid,
        },
        className,
      )}
    />
  );
};

export default Label;
