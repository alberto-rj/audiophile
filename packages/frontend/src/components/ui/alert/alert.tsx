import type { ComponentProps } from 'react';
import * as AlertDialog from '@radix-ui/react-alert-dialog';

import { cn } from '@/libs/cn';

/* portal (start) */
type AlertPortalProps = ComponentProps<typeof AlertDialog.Portal>;

const AlertPortal = ({ ...props }: AlertPortalProps) => {
  return <AlertDialog.Portal {...props} />;
};
/* portal (end) */

/* Overlay (start) */
type AlertOverlayProps = ComponentProps<typeof AlertDialog.Overlay>;

const AlertOverlay = ({ className, ...props }: AlertOverlayProps) => {
  return (
    <AlertDialog.Overlay
      {...props}
      className={cn(
        'fixed',
        'z-200',
        'inset-0',

        'bg-black/40',

        className,
      )}
    />
  );
};
/* Overlay (end) */

/* trigger (start) */
type AlertTriggerProps = ComponentProps<typeof AlertDialog.Trigger>;

const AlertTrigger = ({ ...props }: AlertTriggerProps) => {
  return <AlertDialog.Trigger {...props} />;
};
/* trigger (end) */

/* title (start) */
type AlertTitleProps = ComponentProps<typeof AlertDialog.Title>;

const AlertTitle = ({ ...props }: AlertTitleProps) => {
  return <AlertDialog.Title {...props} />;
};
/* title (end) */

/* description (start) */
type AlertDescriptionProps = ComponentProps<typeof AlertDialog.Description>;

const AlertDescription = ({ ...props }: AlertDescriptionProps) => {
  return <AlertDialog.Description {...props} />;
};
/* description (end) */

/* cancel (start) */
type AlertCancelProps = ComponentProps<typeof AlertDialog.Cancel>;

const AlertCancel = ({ ...props }: AlertCancelProps) => {
  return <AlertDialog.Cancel {...props} />;
};
/* cancel (end) */

/* action (start) */
type AlertActionProps = ComponentProps<typeof AlertDialog.Action>;

const AlertAction = ({ ...props }: AlertActionProps) => {
  return <AlertDialog.Action {...props} />;
};
/* action (end) */

/* content (start) */
type AlertContentProps = ComponentProps<typeof AlertDialog.Content>;

const AlertContent = ({ className, ...props }: AlertContentProps) => {
  return (
    <AlertDialog.Content
      {...props}
      className={cn(
        'inline-[90vw]',
        'max-inline-125',
        'max-block-[85vh]',
        'fixed',
        'inset-bs-1/2',
        'inset-s-1/2',
        '-translate-x-1/2',
        '-translate-y-1/2',
        'z-300',
        'p-6',

        'shadow-md',
        'rounded-lg',
        'bg-white',

        'focus:outline-none',

        className,
      )}
    />
  );
};
/* content (end) */

/* root (start) */
type AlertProps = ComponentProps<typeof AlertDialog.Root>;

const Alert = ({ ...props }: AlertProps) => {
  return <AlertDialog.Root {...props} />;
};
/* root (end) */

Alert.Portal = AlertPortal;
Alert.Overlay = AlertOverlay;
Alert.Trigger = AlertTrigger;
Alert.Content = AlertContent;
Alert.Title = AlertTitle;
Alert.Description = AlertDescription;
Alert.Cancel = AlertCancel;
Alert.Action = AlertAction;

export default Alert;
