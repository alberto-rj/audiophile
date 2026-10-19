import type { Meta, StoryObj } from '@storybook/react-vite';
import { userEvent, within } from 'storybook/test';
import type { Canvas } from 'storybook/internal/types';

import { APP_ROUTES } from '@/config/app-routes';
import { LayoutCenteredOnScreen } from '@/layouts';
import type { RegisterFormData } from '@/libs/schemas';
import { makeRegisterHandler } from '@/mocks/handlers';
import { RegisterPage } from '@/pages';

const registerFormData: RegisterFormData = {
  name: 'Jane Doe',
  email: 'jane@example.com',
  password: 'securepass123',
  confirmPassword: 'securepass123',
};

async function fillRegisterForm(canvas: Canvas, data: RegisterFormData) {
  await userEvent.type(await canvas.findByTestId('name'), data.name);
  await userEvent.type(await canvas.findByTestId('email'), data.email);
  await userEvent.type(await canvas.findByTestId('password'), data.password);
  await userEvent.type(
    await canvas.findByTestId('confirmPassword'),
    data.confirmPassword,
  );
}

async function fillRegisterFormAndSubmit(
  canvas: Canvas,
  data: RegisterFormData,
) {
  await fillRegisterForm(canvas, data);

  await userEvent.click(await canvas.findByTestId('signUp'));
}

type StoryProps = React.ComponentProps<typeof RegisterPage>;

const meta = {
  title: 'pages/RegisterPage',
  component: RegisterPage,
  parameters: {
    layout: 'fullscreen',
    route: APP_ROUTES.register,
    routePath: APP_ROUTES.register,
  },
  decorators: (Story, context) => {
    return (
      <LayoutCenteredOnScreen>
        <Story {...context} />
      </LayoutCenteredOnScreen>
    );
  },
} satisfies Meta<StoryProps>;

export default meta;

type Story = StoryObj<typeof meta>;

export const EmptyForm: Story = {};

export const FilledValid: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.type(
      await canvas.findByTestId('name'),
      registerFormData.name,
    );
    await userEvent.type(
      await canvas.findByTestId('email'),
      registerFormData.email,
    );
    await userEvent.type(
      await canvas.findByTestId('password'),
      registerFormData.password,
    );
    await userEvent.type(
      await canvas.findByTestId('confirmPassword'),
      registerFormData.confirmPassword,
    );
  },
};

export const PasswordMismatch: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.type(
      await canvas.findByTestId('name'),
      registerFormData.name,
    );
    await userEvent.type(
      await canvas.findByTestId('email'),
      registerFormData.email,
    );
    await userEvent.type(
      await canvas.findByTestId('password'),
      registerFormData.password,
    );
    await userEvent.type(
      await canvas.findByTestId('confirmPassword'),
      'different456',
    );
    await userEvent.tab();
  },
};

export const ValidationErrors: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.click(await canvas.findByTestId('name'));
    await userEvent.click(await canvas.findByTestId('email'));
    await userEvent.click(await canvas.findByTestId('password'));
    await userEvent.click(await canvas.findByTestId('confirmPassword'));
    await userEvent.tab();
  },
};

export const SigningUp: Story = {
  parameters: {
    msw: {
      handlers: [makeRegisterHandler({ type: 'infinite' })],
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await fillRegisterFormAndSubmit(canvas, registerFormData);
  },
};

export const SignUpFailed: Story = {
  parameters: {
    msw: {
      handlers: [makeRegisterHandler({ type: 'error' })],
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await fillRegisterFormAndSubmit(canvas, registerFormData);
  },
};

export const EmailAlreadyInUse: Story = {
  parameters: {
    msw: {
      handlers: [makeRegisterHandler()],
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await fillRegisterFormAndSubmit(canvas, registerFormData);
  },
};

export const SignUpSucceeds: Story = {
  parameters: {
    msw: {
      handlers: [makeRegisterHandler()],
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await fillRegisterFormAndSubmit(canvas, {
      ...registerFormData,
      email: 'new_email@example.com',
    });
  },
};
