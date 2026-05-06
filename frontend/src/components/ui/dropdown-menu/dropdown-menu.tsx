import * as RadixDropdownMenu from '@radix-ui/react-dropdown-menu';
import type { ComponentProps, ComponentPropsWithRef } from 'react';

import { cn } from '@/libs/cn';

/* Trigger (start) */
type DropdownMenuTriggerProps = ComponentProps<
  typeof RadixDropdownMenu.Trigger
>;

const DropdownMenuTrigger = ({ ...props }: DropdownMenuTriggerProps) => {
  return <RadixDropdownMenu.Trigger {...props} />;
};
/* Trigger (end) */

/* Portal (start) */
type DropdownMenuPortalProps = ComponentProps<typeof RadixDropdownMenu.Portal>;

const DropdownMenuPortal = ({ ...props }: DropdownMenuPortalProps) => {
  return <RadixDropdownMenu.Portal {...props} />;
};
/* Portal (end) */

/* Content (start) */
type DropdownMenuContentProps = ComponentProps<
  typeof RadixDropdownMenu.Content
>;

const DropdownMenuContent = ({
  sideOffset = 8,
  className,
  ...props
}: DropdownMenuContentProps) => {
  return (
    <RadixDropdownMenu.Content
      {...props}
      sideOffset={sideOffset}
      className={cn(
        'min-inline-55',
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

/* Item (start) */
type DropdownMenuItemProps = ComponentPropsWithRef<
  typeof RadixDropdownMenu.Item
>;

const DropdownMenuItem = ({ className, ...props }: DropdownMenuItemProps) => {
  return (
    <RadixDropdownMenu.Item
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
type DropdownMenuLabelProps = ComponentProps<typeof RadixDropdownMenu.Label>;

const DropdownMenuLabel = ({ className, ...props }: DropdownMenuLabelProps) => {
  return (
    <RadixDropdownMenu.Label
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
type DropdownMenuSeparatorProps = ComponentProps<
  typeof RadixDropdownMenu.Separator
>;

const DropdownMenuSeparator = ({
  className,
  ...props
}: DropdownMenuSeparatorProps) => {
  return (
    <RadixDropdownMenu.Separator
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
type DropdownMenuProps = ComponentProps<typeof RadixDropdownMenu.Root>;

const DropdownMenu = ({ ...props }: DropdownMenuProps) => {
  return <RadixDropdownMenu.Root {...props} />;
};
/* Root (end) */

DropdownMenu.Trigger = DropdownMenuTrigger;
DropdownMenu.Portal = DropdownMenuPortal;
DropdownMenu.Content = DropdownMenuContent;
DropdownMenu.Item = DropdownMenuItem;
DropdownMenu.Label = DropdownMenuLabel;
DropdownMenu.Separator = DropdownMenuSeparator;

export default DropdownMenu;
