import type { Meta, StoryObj } from '@storybook/react-vite';
import { userEvent, within } from 'storybook/test';
import type { Canvas } from 'storybook/internal/types';

import { APP_ROUTES } from '@/config/app-routes';
import { LayoutCenteredOnScreen } from '@/layouts';
import type { LoginFormData } from '@/libs/schemas';
import { makeLoginHandler } from '@/mocks/handlers';
import { LoginPage } from '@/pages';

async function fillSignUpForm(canvas: Canvas, data: LoginFormData) {
  await userEvent.type(canvas.getByTestId('email'), data.email);
  await userEvent.type(canvas.getByTestId('password'), data.password);
}

async function fillSignUpFormAndSubmit(canvas: Canvas, data: LoginFormData) {
  await fillSignUpForm(canvas, data);

  await userEvent.click(await canvas.findByTestId('signIn'));
}

const loginFormData: LoginFormData = {
  email: 'john@example.com',
  password: 'password123',
};

type StoryProps = React.ComponentProps<typeof LoginPage>;

const meta = {
  title: 'pages/LoginPage',
  component: LoginPage,
  parameters: {
    layout: 'fullscreen',
    route: APP_ROUTES.login,
    routePath: APP_ROUTES.login,
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

    await fillSignUpForm(canvas, loginFormData);
  },
};

export const ValidationErrors: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.click(canvas.getByTestId('email'));
    await userEvent.click(canvas.getByTestId('password'));
    await userEvent.tab();
  },
};

export const SigningIn: Story = {
  parameters: {
    msw: {
      handlers: [makeLoginHandler({ type: 'infinite' })],
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await fillSignUpFormAndSubmit(canvas, loginFormData);
  },
};

export const SignInFailed: Story = {
  parameters: {
    msw: {
      handlers: [makeLoginHandler({ type: 'error' })],
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await fillSignUpFormAndSubmit(canvas, loginFormData);
  },
};

export const InvalidCredentials: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await fillSignUpFormAndSubmit(canvas, {
      email: 'wrong@example.com',
      password: 'wrong_password',
    });
  },
};

export const SignInSucceeds: Story = {
  parameters: {
    msw: {
      handlers: [makeLoginHandler()],
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await fillSignUpFormAndSubmit(canvas, loginFormData);
  },
};
