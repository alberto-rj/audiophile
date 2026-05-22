import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';

import { APP_ROUTES } from '@/config/app-routes';
import { LayoutCenteredOnScreen } from '@/layouts';
import type { LoginFormData } from '@/libs/schemas';
import { makeLoginHandler } from '@/mocks/handlers';
import { LoginPage } from '@/pages';

const loginFormData: LoginFormData = {
  email: 'john@example.com',
  password: 'password123',
};

const wrongLoginFormData: LoginFormData = {
  email: 'wrong@example.com',
  password: 'wrong_password',
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

export const Default: Story = {};

export const FilledValid: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.type(canvas.getByTestId('email'), loginFormData.email);
    await userEvent.type(
      canvas.getByTestId('password'),
      loginFormData.password,
    );
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

export const SigningYouIn: Story = {
  parameters: {
    msw: {
      handlers: [makeLoginHandler({ type: 'infinite' })],
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.type(canvas.getByTestId('email'), loginFormData.email);
    await userEvent.type(
      canvas.getByTestId('password'),
      loginFormData.password,
    );

    await userEvent.click(canvas.getByTestId('signIn'));
  },
};

export const InvalidCredentials: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.type(canvas.getByTestId('email'), wrongLoginFormData.email);
    await userEvent.type(
      canvas.getByTestId('password'),
      wrongLoginFormData.password,
    );

    await userEvent.click(canvas.getByTestId('signIn'));

    const alert = await canvas.findByRole('status');

    await expect(alert).toBeInTheDocument();
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

    await userEvent.type(canvas.getByTestId('email'), loginFormData.email);
    await userEvent.type(
      canvas.getByTestId('password'),
      loginFormData.password,
    );

    await userEvent.click(canvas.getByTestId('signIn'));

    const alert = await canvas.findByRole('status');

    await expect(alert).toBeInTheDocument();
  },
};

export const SignInSuccess: Story = {
  parameters: {
    msw: {
      handlers: [makeLoginHandler()],
    },
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.type(canvas.getByTestId('email'), loginFormData.email);
    await userEvent.type(
      canvas.getByTestId('password'),
      loginFormData.password,
    );

    await userEvent.click(canvas.getByTestId('signIn'));
  },
};
