import type { Meta, StoryObj } from '@storybook/react-vite';
import type { Canvas } from 'storybook/internal/types';
import { userEvent, within } from 'storybook/test';

import { APP_ROUTES } from '@/config/app-routes';
import { WithCredentialsDecorator } from '@/config/storybook';
import type { CheckoutFormData } from '@/libs/schemas';
import { makeCreateOrderHandler } from '@/mocks/handlers';
import { CheckoutPage } from '@/pages';

const checkoutFormData: CheckoutFormData = {
  name: 'Jane Doe',
  email: 'jane@example.com',
  phone: '+1 202-55-0136',
  address: '1137 Williams Avenue',
  zip: '10001',
  city: 'New York',
  country: 'United States',
  eMoneyNumber: '238521993',
  eMoneyPin: '6891',
  paymentMethod: 'e-money',
};

async function clearCheckoutForm(canvas: Canvas) {
  await userEvent.clear(canvas.getByTestId('name'));
  await userEvent.clear(canvas.getByTestId('email'));
}

async function fillCheckoutForm(canvas: Canvas) {
  await clearCheckoutForm(canvas);

  await userEvent.type(canvas.getByTestId('name'), checkoutFormData.name);
  await userEvent.type(canvas.getByTestId('email'), checkoutFormData.email);
  await userEvent.type(canvas.getByTestId('phone'), checkoutFormData.phone);
  await userEvent.type(canvas.getByTestId('address'), checkoutFormData.address);
  await userEvent.type(canvas.getByTestId('zip'), checkoutFormData.zip);
  await userEvent.type(canvas.getByTestId('city'), checkoutFormData.city);
  await userEvent.type(canvas.getByTestId('country'), checkoutFormData.country);
  await userEvent.type(
    canvas.getByTestId('eMoneyNumber'),
    checkoutFormData.eMoneyNumber!,
  );
  await userEvent.type(
    canvas.getByTestId('eMoneyPin'),
    checkoutFormData.eMoneyPin!,
  );
}

type StoryProps = React.ComponentProps<typeof CheckoutPage>;

const meta = {
  title: 'pages/CheckoutPage',
  component: CheckoutPage,
  parameters: {
    layout: 'fullscreen',
    route: APP_ROUTES.checkout,
    routePath: APP_ROUTES.checkout,
  },
  decorators: [WithCredentialsDecorator],
} satisfies Meta<StoryProps>;

export default meta;

type Story = StoryObj<typeof meta>;

export const EmptyForm: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await clearCheckoutForm(canvas);

    await userEvent.click(canvas.getByTestId('name'));
    await userEvent.click(canvas.getByTestId('email'));
    await userEvent.click(canvas.getByTestId('phone'));
    await userEvent.click(canvas.getByTestId('address'));
    await userEvent.click(canvas.getByTestId('zip'));
    await userEvent.click(canvas.getByTestId('city'));
    await userEvent.click(canvas.getByTestId('country'));
    await userEvent.click(canvas.getByTestId('eMoneyNumber'));
    await userEvent.click(canvas.getByTestId('eMoneyPin'));
    await userEvent.tab();
  },
};

export const ValidationErrors: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await clearCheckoutForm(canvas);

    await userEvent.click(canvas.getByTestId('name'));
    await userEvent.click(canvas.getByTestId('email'));
    await userEvent.click(canvas.getByTestId('phone'));
    await userEvent.click(canvas.getByTestId('address'));
    await userEvent.click(canvas.getByTestId('zip'));
    await userEvent.click(canvas.getByTestId('city'));
    await userEvent.click(canvas.getByTestId('country'));
    await userEvent.click(canvas.getByTestId('eMoneyNumber'));
    await userEvent.click(canvas.getByTestId('eMoneyPin'));
    await userEvent.tab();
  },
};

export const FilledValid: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await fillCheckoutForm(canvas);
  },
};

export const ProcessingOrder: Story = {
  parameters: {
    msw: {
      handlers: [makeCreateOrderHandler({ type: 'infinite' })],
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await fillCheckoutForm(canvas);

    await userEvent.click(canvas.getByTestId('checkout'));

    // await expect(canvas.getByTestId('checkout')).toBeDisabled();
  },
};

export const CheckoutFailed: Story = {
  parameters: {
    msw: {
      handlers: [makeCreateOrderHandler({ type: 'error' })],
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await fillCheckoutForm(canvas);

    await userEvent.click(canvas.getByTestId('checkout'));

    // await expect(await canvas.findByRole('status')).toBeInTheDocument();
  },
};

export const CheckoutSucceeds: Story = {
  parameters: {
    msw: {
      handlers: [makeCreateOrderHandler()],
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await fillCheckoutForm(canvas);

    await userEvent.click(canvas.getByTestId('checkout'));
  },
};
