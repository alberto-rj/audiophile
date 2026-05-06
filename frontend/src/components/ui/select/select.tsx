import * as RadixSelect from '@radix-ui/react-select';
import type { ComponentProps, ComponentPropsWithRef } from 'react';

import { cn } from '@/libs/cn';

/* Trigger (start) */
type SelectTriggerProps = ComponentProps<typeof RadixSelect.Trigger>;

const SelectTrigger = ({ ...props }: SelectTriggerProps) => {
  return <RadixSelect.Trigger {...props} />;
};
/* Trigger (end) */

/* Portal (start) */
type SelectPortalProps = ComponentProps<typeof RadixSelect.Portal>;

const SelectPortal = ({ ...props }: SelectPortalProps) => {
  return <RadixSelect.Portal {...props} />;
};
/* Portal (end) */

/* Content (start) */
type SelectContentProps = ComponentProps<typeof RadixSelect.Content>;

const SelectContent = ({
  sideOffset = 8,
  className,
  ...props
}: SelectContentProps) => {
  return (
    <RadixSelect.Content
      {...props}
      sideOffset={sideOffset}
      className={cn(
        'overflow-hidden',
        'p-1',

        'bg-white',
        'shadow-md',
        'rounded-lg',

        className,
      )}
    />
  );
};
/* Content (end) */

/* ScrollUp Button (start) */
type SelectScrollUpButtonProps = ComponentProps<
  typeof RadixSelect.ScrollUpButton
>;

const SelectScrollUpButton = ({ ...props }: SelectScrollUpButtonProps) => {
  return <RadixSelect.ScrollUpButton {...props} />;
};
/* ScrollUp Button (end) */

/* ScrollDown Button (start) */
type SelectScrollDownButtonProps = ComponentProps<
  typeof RadixSelect.ScrollDownButton
>;

const SelectScrollDownButton = ({ ...props }: SelectScrollDownButtonProps) => {
  return <RadixSelect.ScrollDownButton {...props} />;
};
/* ScrollDown Button (end) */

/* Viewport (start) */
type SelectViewportProps = ComponentProps<typeof RadixSelect.Viewport>;

const SelectViewport = ({ className, ...props }: SelectViewportProps) => {
  return (
    <RadixSelect.Viewport
      {...props}
      className={cn('p-1', className)}
    />
  );
};
/* Viewport (end) */

/* Group (start) */
type SelectGroupProps = ComponentProps<typeof RadixSelect.Group>;

const SelectGroup = ({ ...props }: SelectGroupProps) => {
  return <RadixSelect.Group {...props} />;
};
/* Group (end) */

/* Item (start) */
type SelectItemProps = ComponentPropsWithRef<typeof RadixSelect.Item>;

const SelectItem = ({ className, ...props }: SelectItemProps) => {
  return (
    <RadixSelect.Item
      {...props}
      className={cn(
        'ps-6',
        'py-3',
        'text-xs',

        'text-black',
        'cursor-pointer',
        'select-none',
        'rounded-lg',

        'focus:outline-none',
        'focus:bg-primary-400',
        'focus:text-white',

        'focus-visible:outline-none',
        'focus-visible:bg-primary-400',
        'focus-visible:text-white',

        'data-disabled:text-black/50',
        'data-disabled:cursor-not-allowed',
        'data-disabled:pointer-events-none',

        className,
      )}
    />
  );
};
/* Item (end) */

/* Label (start) */
type SelectLabelProps = ComponentProps<typeof RadixSelect.Label>;

const SelectLabel = ({ className, ...props }: SelectLabelProps) => {
  return (
    <RadixSelect.Label
      {...props}
      className={cn(
        'ps-6',
        'py-3',
        'text-xs',

        className,
      )}
    />
  );
};
/* Label (end) */

/* Separator (start) */
type SelectSeparatorProps = ComponentProps<typeof RadixSelect.Separator>;

const SelectSeparator = ({ className, ...props }: SelectSeparatorProps) => {
  return (
    <RadixSelect.Separator
      {...props}
      className={cn(
        'block-px',
        'm-1',

        'bg-gray-300',

        className,
      )}
    />
  );
};
/* Separator (end) */

/* Root (start) */
type SelectProps = ComponentProps<typeof RadixSelect.Root>;

const Select = ({ ...props }: SelectProps) => {
  return <RadixSelect.Root {...props} />;
};
/* Root (end) */

Select.Trigger = SelectTrigger;
Select.Portal = SelectPortal;
Select.ScrollUpButton = SelectScrollUpButton;
Select.ScrollDownButton = SelectScrollDownButton;
Select.Content = SelectContent;
Select.Viewport = SelectViewport;
Select.Group = SelectGroup;
Select.Item = SelectItem;
Select.Label = SelectLabel;
Select.Separator = SelectSeparator;

export default Select;
