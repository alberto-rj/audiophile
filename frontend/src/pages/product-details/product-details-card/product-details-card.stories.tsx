import type { Meta, StoryObj } from '@storybook/react-vite';
import type { Canvas } from 'storybook/internal/types';
import { userEvent, within } from 'storybook/test';

import { WithCredentialsDecorator } from '@/config/storybook';
import { cn } from '@/libs/cn';
import { products } from '@/libs/mocks';
import type { Product } from '@/libs/types';
import { makeAddCartItemHandler } from '@/mocks/handlers';

import ProductDetailsCard from './product-details-card';

async function clickToAddItemToCart(canvas: Canvas) {
  await userEvent.click(await canvas.findByTestId('addItemToCart'));
}

type StoryProps = React.ComponentProps<typeof ProductDetailsCard> & {
  product: Product;
};

const meta = {
  title: 'pages/ProductDetailsPage/ProductDetailsCard',
  component: ProductDetailsCard,
  parameters: {
    layout: 'fullscreen',
  },
  args: {
    product: products.find((p) => p.isNew)!,
  },
  render: (props) => {
    return (
      <div className={cn('region', 'wrapper')}>
        <ProductDetailsCard {...props} />
      </div>
    );
  },
} satisfies Meta<StoryProps>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Old: Story = {
  args: {
    product: products.find((p) => !p.isNew)!,
  },
};

export const AddItemToCartLoading: Story = {
  decorators: [WithCredentialsDecorator],
  parameters: {
    msw: {
      handlers: [makeAddCartItemHandler({ type: 'infinite' })],
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await clickToAddItemToCart(canvas);
  },
};

export const AddItemToCartFailed: Story = {
  decorators: [WithCredentialsDecorator],
  parameters: {
    msw: {
      handlers: [makeAddCartItemHandler({ type: 'error' })],
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await clickToAddItemToCart(canvas);
  },
};

export const AddItemToCartSucceeds: Story = {
  decorators: [WithCredentialsDecorator],
  parameters: {
    msw: {
      handlers: [makeAddCartItemHandler()],
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await clickToAddItemToCart(canvas);
  },
};
