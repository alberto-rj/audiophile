import type { ComponentProps } from 'react';
import * as Dialog from '@radix-ui/react-dialog';

import { cn } from '@/libs/cn';

/* portal (start) */
type ModalPortalProps = ComponentProps<typeof Dialog.Portal>;

const ModalPortal = ({ ...props }: ModalPortalProps) => {
  return <Dialog.Portal {...props} />;
};
/* portal (end) */

/* Overlay (start) */
type ModalOverlayProps = ComponentProps<typeof Dialog.Overlay>;

const ModalOverlay = ({ className, ...props }: ModalOverlayProps) => {
  return (
    <Dialog.Overlay
      {...props}
      className={cn('fixed', 'inset-0', 'bg-black/40', className)}
    />
  );
};
/* Overlay (end) */

/* trigger (start) */
type ModalTriggerProps = ComponentProps<typeof Dialog.Trigger>;

const ModalTrigger = ({ ...props }: ModalTriggerProps) => {
  return <Dialog.Trigger {...props} />;
};
/* trigger (end) */

/* title (start) */
type ModalTitleProps = ComponentProps<typeof Dialog.Title>;

const ModalTitle = ({ ...props }: ModalTitleProps) => {
  return <Dialog.Title {...props} />;
};
/* title (end) */

/* description (start) */
type ModalDescriptionProps = ComponentProps<typeof Dialog.Description>;

const ModalDescription = ({ ...props }: ModalDescriptionProps) => {
  return <Dialog.Description {...props} />;
};
/* description (end) */

/* close (start) */
type ModalCloseProps = ComponentProps<typeof Dialog.Close>;

const ModalClose = ({ ...props }: ModalCloseProps) => {
  return <Dialog.Close {...props} />;
};
/* close (end) */

/* content (start) */
type ModalContentProps = ComponentProps<typeof Dialog.Content>;

const ModalContent = ({ className, ...props }: ModalContentProps) => {
  return (
    <Dialog.Content
      {...props}
      className={cn('fixed', 'rounded-lg', 'bg-white', className)}
    />
  );
};
/* content (end) */

/* root (start) */
type ModalProps = ComponentProps<typeof Dialog.Root>;

const Modal = ({ ...props }: ModalProps) => {
  return (
    <Dialog.Root
      {...props}
      modal={true}
    />
  );
};
/* root (end) */

Modal.Portal = ModalPortal;
Modal.Overlay = ModalOverlay;
Modal.Trigger = ModalTrigger;
Modal.Content = ModalContent;
Modal.Title = ModalTitle;
Modal.Description = ModalDescription;
Modal.Close = ModalClose;

export default Modal;
