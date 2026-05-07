import * as RadixSelect from '@radix-ui/react-select';
import type { ComponentProps, ComponentPropsWithRef } from 'react';

import { cn } from '@/libs/cn';

/* Trigger (start) */
type SelectTriggerProps = ComponentProps<typeof RadixSelect.Trigger>;

const SelectTrigger = ({ ...props }: SelectTriggerProps) => {
  return <RadixSelect.Trigger {...props} />;
};
/* Trigger (end) */

/* Value (start) */
type SelectValueProps = ComponentProps<typeof RadixSelect.Value>;

const SelectValue = ({ ...props }: SelectValueProps) => {
  return <RadixSelect.Value {...props} />;
};
/* Value (end) */

/* Icon (start) */
type SelectIconProps = ComponentProps<typeof RadixSelect.Icon>;

const SelectIcon = ({ ...props }: SelectIconProps) => {
  return <RadixSelect.Icon {...props} />;
};
/* Icon (end) */

/* Portal (start) */
type SelectPortalProps = ComponentProps<typeof RadixSelect.Portal>;

const SelectPortal = ({ ...props }: SelectPortalProps) => {
  return <RadixSelect.Portal {...props} />;
};
/* Portal (end) */

/* Content (start) */
type SelectContentProps = ComponentProps<typeof RadixSelect.Content>;

const SelectContent = ({
  className,
  position = 'popper',
  sideOffset = 8,
  ...props
}: SelectContentProps) => {
  return (
    <RadixSelect.Content
      {...props}
      position={position}
      sideOffset={sideOffset}
      className={cn(
        'overflow-hidden',
        'p-1',
        'inline-(--radix-select-trigger-width)',
        'max-block-(--radix-select-content-available-height)',

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
        'relative',
        'flex',
        'items-center',
        'ps-6',
        'pe-9',
        'py-3',
        'text-xs',

        'text-black',
        'cursor-pointer',
        'select-none',
        'rounded-lg',
        'outline-none',

        'data-highlighted:bg-primary-400',
        'data-highlighted:text-white',

        'data-disabled:text-black/50',
        'data-disabled:cursor-not-allowed',
        'data-disabled:pointer-events-none',

        className,
      )}
    />
  );
};
/* Item (end) */

/* ItemText (start) */
type SelectItemTextProps = ComponentPropsWithRef<typeof RadixSelect.ItemText>;

const SelectItemText = ({ ...props }: SelectItemTextProps) => {
  return <RadixSelect.ItemText {...props} />;
};
/* ItemText (end) */

/* ItemIndicator (start) */
type SelectItemIndicatorProps = ComponentPropsWithRef<
  typeof RadixSelect.ItemIndicator
>;

const SelectItemIndicator = ({
  className,
  ...props
}: SelectItemIndicatorProps) => {
  return (
    <RadixSelect.ItemIndicator
      {...props}
      className={cn(
        'absolute',
        'inset-s-0',
        'inline-6',
        'inline-flex',
        'justify-center',
        'items-center',

        className,
      )}
    />
  );
};
/* ItemText (end) */

/* Label (start) */
type SelectLabelProps = ComponentProps<typeof RadixSelect.Label>;

const SelectLabel = ({ className, ...props }: SelectLabelProps) => {
  return (
    <RadixSelect.Label
      {...props}
      className={cn(
        'px-6',
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
Select.Value = SelectValue;
Select.Icon = SelectIcon;
Select.Portal = SelectPortal;
Select.ScrollUpButton = SelectScrollUpButton;
Select.ScrollDownButton = SelectScrollDownButton;
Select.Content = SelectContent;
Select.Viewport = SelectViewport;
Select.Group = SelectGroup;
Select.Item = SelectItem;
Select.ItemText = SelectItemText;
Select.ItemIndicator = SelectItemIndicator;
Select.Label = SelectLabel;
Select.Separator = SelectSeparator;

export default Select;
