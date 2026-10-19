import { Slot } from '@radix-ui/react-slot';
import type { ComponentProps } from 'react';

import { Card } from '@/components/ui';
import { cn } from '@/libs/cn';

type FormCardProps = ComponentProps<typeof Card>;

const FormCard = ({ className, ...props }: FormCardProps) => {
  return (
    <Card
      {...props}
      className={cn(
        'max-inline-110',
        'flex',
        'flex-col',
        'gap-8',
        'p-6',

        'md:p-8',

        'lg:p-12',

        className,
      )}
    />
  );
};

type FormCardTitleProps = ComponentProps<'h1'> & {
  asChild?: boolean;
};

const FormCardTitle = ({
  asChild,
  className,
  ...props
}: FormCardTitleProps) => {
  const Comp = asChild ? Slot : 'h1';

  return (
    <Comp
      {...props}
      className={cn(
        'text-xl',

        'lg:text-2xl',

        'text-black',
        'uppercase',

        className,
      )}
    />
  );
};

type FormCardDescriptionProps = ComponentProps<'p'> & {
  asChild?: boolean;
};

const FormCardDescription = ({
  asChild,
  className,
  ...props
}: FormCardDescriptionProps) => {
  const Comp = asChild ? Slot : 'p';

  return (
    <Comp
      {...props}
      className={cn(className)}
    />
  );
};

type FormCardHeaderProps = ComponentProps<'div'> & {
  asChild?: boolean;
};

const FormCardHeader = ({
  asChild,
  className,
  ...props
}: FormCardHeaderProps) => {
  const Comp = asChild ? Slot : 'div';

  return (
    <Comp
      {...props}
      className={cn('flex', 'flex-col', 'gap-3', className)}
    />
  );
};

type FormCardBodyProps = ComponentProps<'div'> & {
  asChild?: boolean;
};

const FormCardBody = ({ asChild, className, ...props }: FormCardBodyProps) => {
  const Comp = asChild ? Slot : 'div';

  return (
    <Comp
      {...props}
      className={cn(className)}
    />
  );
};

type FormCardFooterProps = ComponentProps<'div'> & {
  asChild?: boolean;
};

const FormCardFooter = ({
  asChild,
  className,
  ...props
}: FormCardFooterProps) => {
  const Comp = asChild ? Slot : 'div';

  return (
    <Comp
      {...props}
      className={cn(className)}
    />
  );
};

FormCard.Header = FormCardHeader;

FormCard.Title = FormCardTitle;

FormCard.Description = FormCardDescription;

FormCard.Body = FormCardBody;

FormCard.Footer = FormCardFooter;

export default FormCard;
