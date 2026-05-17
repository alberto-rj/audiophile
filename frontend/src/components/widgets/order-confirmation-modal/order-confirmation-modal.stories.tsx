import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { fn } from 'storybook/test';

import { Button } from '@/components/ui';
import { OrderConfirmationModal } from '@/components/widgets';
import { cn } from '@/libs/cn';
import { orders } from '@/libs/mocks';

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

const order = orders[0];
const orderItems = order.items!;

export const Default: Story = {
  args: {
    order: {
      ...order,
      items: [...orderItems].splice(0, 3),
    },
  },
};

export const WithMultipleItems: Story = {
  args: {
    order: {
      ...order,
      items: [...orderItems],
    },
  },
};

export const WithSingleItem: Story = {
  args: {
    order: {
      ...order,
      items: [...orderItems].splice(0, 1),
    },
  },
};
