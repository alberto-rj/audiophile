import { useState } from 'react';
import { useDispatch } from 'react-redux';
import type { Meta, StoryObj } from '@storybook/react-vite';

import type { AppDispatch } from '@/app/store';
import { addItem, clearCart } from '@/app/features/cart';
import { CartModal } from '@/components/widgets';
import { Button } from '@/components/ui';
import { cn } from '@/libs/cn';
import { cartItems } from '@/libs/mocks/cart-items';
import type { CartItem } from '@/libs/types';

type StoryProps = React.ComponentProps<typeof CartModal> & {
  cartItems: CartItem[];
};

const meta = {
  title: 'widgets/CartModal',
  component: CartModal,
  args: {
    open: true,
  },
  parameters: {
    layout: 'fullscreen',
  },
  render: ({ cartItems, open, ...cartModalProps }) => {
    const dispatch = useDispatch<AppDispatch>();
    const [openModal, setOpenModal] = useState<boolean>(open === true);

    dispatch(clearCart());

    cartItems.forEach((item) => dispatch(addItem(item)));

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
        <Button onClick={() => setOpenModal(true)}>Show cart</Button>

        <CartModal
          {...cartModalProps}
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
    cartItems: [...cartItems].splice(0, 3),
  },
};

export const WithMultipleItems: Story = {
  args: {
    cartItems: [...cartItems],
  },
};

export const WithSingleItem: Story = {
  args: {
    cartItems: [...cartItems].splice(0, 1),
  },
};

export const WithNoItem: Story = {
  args: {
    cartItems: [],
  },
};
