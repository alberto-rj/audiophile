import { useState } from 'react';
import { fn } from 'storybook/test';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { OrderConfirmationModal } from '@/components/widgets';
import { Button } from '@/components/ui';
import { cartItems } from '@/libs/constants';
import { cn } from '@/libs/cn';

type StoryProps = React.ComponentProps<typeof OrderConfirmationModal>;

const meta = {
  title: 'widgets/OrderConfirmationModal',
  component: OrderConfirmationModal,
  args: {
    open: true,
    onOpenChange: fn(),
  },
  parameters: {
    layout: 'fullscreen',
  },
  render: ({ open, ...orderConfirmationModalProps }) => {
    const [openModal, setOpenModal] = useState<boolean>(open === true);

    const handleOpenChange = (open: boolean) => {
      setOpenModal(open);
    };

    return (
      <div
        className={cn(
          'min-block-screen',
          'flex',
          'justify-center',
          'items-center',
        )}
      >
        <Button onClick={() => setOpenModal(true)}>Show modal</Button>

        <OrderConfirmationModal
          {...orderConfirmationModalProps}
          open={openModal}
          onOpenChange={handleOpenChange}
        />
      </div>
    );
  },
} satisfies Meta<StoryProps>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    items: [...cartItems].splice(0, 3),
  },
};

export const WithMultipleItems: Story = {
  args: {
    items: [...cartItems],
  },
};

export const WithSingleItem: Story = {
  args: {
    items: [...cartItems].splice(0, 1),
  },
};
