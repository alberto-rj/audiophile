import { useState } from 'react';
import { fn } from 'storybook/test';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { CartModal } from '@/components/widgets';
import { Button } from '@/components/ui';
import { cartItems } from '@/libs/constants';
import { cn } from '@/libs/cn';

type StoryProps = React.ComponentProps<typeof CartModal>;

const meta = {
  title: 'widgets/CartModal',
  component: CartModal,
  args: {
    onQuantityChange: fn(),
    onClearCart: fn(),
  },
  parameters: {
    layout: 'fullscreen',
  },
  render: ({ open, ...cartModalProps }) => {
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

export const WithNoItem: Story = {
  args: {
    items: [],
  },
};
