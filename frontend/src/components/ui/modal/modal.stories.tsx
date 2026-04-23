import type { Meta, StoryObj } from '@storybook/react-vite';
import { fn } from 'storybook/test';

import { Button, Modal } from '@/components/ui';
import { useId, useState } from 'react';
import { cn } from '@/libs/cn';

type StoryProps = React.ComponentProps<typeof Modal>;

const meta = {
  title: 'ui/Modal',
  component: Modal,
  tags: ['autodocs'],
  args: {
    onOpenChange: fn(),
  },
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<StoryProps>;

export default meta;

type Story = StoryObj<typeof meta>;

const modalContentBaseClasses = cn(
  'left-1/2',
  'top-1/2',
  '-translate-x-1/2',
  '-translate-y-1/2',
  'p-4',
  'space-y-4',
  'w-[80vw]',
  'h-[80vh]',
);

export const Default: Story = {
  render: (modalProps) => {
    const headingId = useId();

    return (
      <Modal {...modalProps}>
        <Modal.Trigger asChild>
          <Button type='button'>Open modal</Button>
        </Modal.Trigger>

        <Modal.Portal>
          <Modal.Overlay />

          <Modal.Content
            aria-labelledby={headingId}
            className={cn(modalContentBaseClasses)}
          >
            <Modal.Title id={headingId}>Default</Modal.Title>

            <Modal.Description>Modal description</Modal.Description>

            <Modal.Close asChild>
              <Button
                type='button'
                variant='secondary'
              >
                Close modal
              </Button>
            </Modal.Close>
          </Modal.Content>
        </Modal.Portal>
      </Modal>
    );
  },
};

export const Controlled = {
  render: () => {
    const headingId = useId();
    const [open, setOpen] = useState<boolean>(false);

    return (
      <Modal
        open={open}
        onOpenChange={setOpen}
      >
        <Modal.Trigger asChild>
          <Button>Open</Button>
        </Modal.Trigger>

        <Modal.Portal>
          <Modal.Overlay />

          <Modal.Content
            aria-labelledby={headingId}
            className={cn(modalContentBaseClasses)}
          >
            <Modal.Title id={headingId}>Controlled</Modal.Title>

            <Modal.Description>
              State: {open ? 'open' : 'closed'}
            </Modal.Description>

            <Modal.Close asChild>
              <Button
                type='button'
                variant='secondary'
              >
                Close
              </Button>
            </Modal.Close>
          </Modal.Content>
        </Modal.Portal>
      </Modal>
    );
  },
};

export const WithoutTrigger = {
  render: () => {
    const headingId = useId();
    const [open, setOpen] = useState(false);

    return (
      <>
        <Button
          type='button'
          onClick={() => setOpen(true)}
        >
          Open externally
        </Button>

        <Modal
          open={open}
          onOpenChange={setOpen}
        >
          <Modal.Portal>
            <Modal.Overlay />

            <Modal.Content
              aria-labelledby={headingId}
              className={cn(modalContentBaseClasses)}
            >
              <Modal.Title id={headingId}>Without Trigger</Modal.Title>

              <Modal.Description>Modal description</Modal.Description>

              <Modal.Close asChild>
                <Button
                  type='button'
                  variant='secondary'
                >
                  Close
                </Button>
              </Modal.Close>
            </Modal.Content>
          </Modal.Portal>
        </Modal>
      </>
    );
  },
};
