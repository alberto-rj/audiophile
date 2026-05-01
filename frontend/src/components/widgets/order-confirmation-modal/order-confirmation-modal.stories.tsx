import type { Meta, StoryObj } from '@storybook/react-vite';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fn } from 'storybook/test';

import { addItem } from '@/app/features/cart';
import type { AppDispatch } from '@/app/store';
import { OrderConfirmationModal } from '@/components/widgets';
import { Button } from '@/components/ui';
import { cn } from '@/libs/cn';
import { cartItems } from '@/libs/mocks/cart-items';
import type { CartItem } from '@/libs/types';

type StoryProps = React.ComponentProps<typeof OrderConfirmationModal> & {
  items: CartItem[];
};

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
  render: ({ items, open, ...orderConfirmationModalProps }) => {
    const [openModal, setOpenModal] = useState<boolean>(open === true);

    const dispatch = useDispatch<AppDispatch>();

    items.forEach((item) => dispatch(addItem(item)));

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
