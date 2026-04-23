import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react-vite';

import { CartModal } from '@/components/widgets';
import { Button } from '@/components/ui';
import { fn } from 'storybook/test';
import { cartItems } from '@/libs/constants';

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
} satisfies Meta<StoryProps>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    items: cartItems.slice(0, 3),
  },
  render: (cartModalProps) => {
    const [open, setOpen] = useState(false);

    const handleOpenChange = (open: boolean) => {
      setOpen(open);
    };

    return (
      <div>
        <Button onClick={() => setOpen(true)}>Open cart</Button>

        <CartModal
          {...cartModalProps}
          open={open}
          onOpenChange={handleOpenChange}
        />
      </div>
    );
  },
};

export const Multiple: Story = {
  args: {
    items: cartItems,
  },
  render: (cartModalProps) => {
    const [open, setOpen] = useState(false);

    const handleOpenChange = (open: boolean) => {
      setOpen(open);
    };

    return (
      <div>
        <Button onClick={() => setOpen(true)}>Open cart</Button>

        <CartModal
          {...cartModalProps}
          open={open}
          onOpenChange={handleOpenChange}
        />
      </div>
    );
  },
};
