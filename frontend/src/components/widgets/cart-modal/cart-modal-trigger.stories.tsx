import type { Meta, StoryObj } from '@storybook/react-vite';
import { userEvent, within } from 'storybook/test';
import type { Canvas } from 'storybook/internal/types';

import { CartModalTrigger } from '@/components/widgets';
import { cn } from '@/libs/cn';
import { WithCredentialsDecorator } from '@/config/storybook';
import {
  makeClearCartHandler,
  makeGetCartHandler,
  makeUpdateCartItemQuantityHandler,
} from '@/mocks/handlers';

async function openCartModalAndClear(canvas: Canvas) {
  await userEvent.click(canvas.getByTestId('cartModalTrigger'));

  await userEvent.click(await canvas.findByTestId('cartModalClear'));
}

async function openCartModalAndTypeQuantity(
  canvas: Canvas,
  lastQuantityInputDigit: number,
) {
  await userEvent.click(canvas.getByTestId('cartModalTrigger'));

  const [input] = await canvas.findAllByTestId('quantityInput');

  await userEvent.clear(input);
  await userEvent.type(input, String(lastQuantityInputDigit));
}

type StoryProps = React.ComponentProps<typeof CartModalTrigger>;

const meta = {
  title: 'widgets/CartModalTrigger',
  component: CartModalTrigger,
  args: {},
  parameters: {
    layout: 'fullscreen',
  },
  render: () => {
    return (
      <div
        className={cn(
          'min-block-screen',
          'flex',
          'justify-center',
          'items-center',

          'bg-black',
        )}
      >
        <CartModalTrigger />
      </div>
    );
  },
} satisfies Meta<StoryProps>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {};

export const WithLoggedUser: Story = {
  decorators: [WithCredentialsDecorator],
};

export const LoadingCart: Story = {
  parameters: {
    msw: {
      handlers: [makeGetCartHandler({ type: 'infinite' })],
    },
  },
  decorators: [WithCredentialsDecorator],
};

export const FailedToLoadCart: Story = {
  parameters: {
    msw: {
      handlers: [makeGetCartHandler({ type: 'error' })],
    },
  },
  decorators: [WithCredentialsDecorator],
};

export const WithCart: Story = {
  parameters: {
    msw: {
      handlers: [makeGetCartHandler()],
    },
  },
  decorators: [WithCredentialsDecorator],
};

export const WithSingleItem: Story = {
  parameters: {
    msw: {
      handlers: [makeGetCartHandler({ limit: 1 })],
    },
  },
  decorators: [WithCredentialsDecorator],
};

export const WithEmptyCart: Story = {
  parameters: {
    msw: {
      handlers: [makeGetCartHandler({ limit: 0 })],
    },
  },
  decorators: [WithCredentialsDecorator],
};

export const ClearingCart: Story = {
  parameters: {
    msw: {
      handlers: [
        makeGetCartHandler(),
        makeClearCartHandler({ type: 'infinite' }),
      ],
    },
  },
  decorators: [WithCredentialsDecorator],
  play: async () => {
    const canvas = within(document.body);

    await openCartModalAndClear(canvas);
  },
};

export const ClearCartFailed: Story = {
  parameters: {
    msw: {
      handlers: [makeGetCartHandler(), makeClearCartHandler({ type: 'error' })],
    },
  },
  decorators: [WithCredentialsDecorator],
  play: async () => {
    const canvas = within(document.body);

    await openCartModalAndClear(canvas);
  },
};

export const ClearCartSucceeds: Story = {
  parameters: {
    msw: {
      handlers: [makeGetCartHandler(), makeClearCartHandler()],
    },
  },
  decorators: [WithCredentialsDecorator],
  play: async () => {
    const canvas = within(document.body);

    await openCartModalAndClear(canvas);
  },
};

const lastQuantityInputDigit = 0;

export const UpdatingItemQuantity: Story = {
  parameters: {
    msw: {
      handlers: [
        makeGetCartHandler(),
        makeUpdateCartItemQuantityHandler({ type: 'infinite' }),
      ],
    },
  },
  decorators: [WithCredentialsDecorator],
  play: async () => {
    const canvas = within(document.body);

    await openCartModalAndTypeQuantity(canvas, lastQuantityInputDigit);
  },
};

export const UpdateItemQuantityFailed: Story = {
  parameters: {
    msw: {
      handlers: [
        makeGetCartHandler(),
        makeUpdateCartItemQuantityHandler({ type: 'error' }),
      ],
    },
  },
  decorators: [WithCredentialsDecorator],
  play: async () => {
    const canvas = within(document.body);

    await openCartModalAndTypeQuantity(canvas, lastQuantityInputDigit);
  },
};

export const UpdateItemQuantitySucceeds: Story = {
  parameters: {
    msw: {
      handlers: [makeGetCartHandler(), makeUpdateCartItemQuantityHandler()],
    },
  },
  decorators: [WithCredentialsDecorator],
  play: async () => {
    const canvas = within(document.body);

    await openCartModalAndTypeQuantity(canvas, lastQuantityInputDigit);
  },
};
