import type { Meta, StoryObj } from '@storybook/react-vite';

import { APP_ROUTES } from '@/config/app-routes';
import { LoginPage } from '@/pages';
import { LayoutCenteredOnScreen } from '@/layouts';
import { expect, userEvent, within } from 'storybook/test';

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

    await userEvent.type(canvas.getByLabelText(/email/i), 'john@example.com');
    await userEvent.type(canvas.getByLabelText(/password/i), 'password123');
  },
};

export const InvalidCredentials: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.type(canvas.getByLabelText(/email/i), 'wrong@example.com');
    await userEvent.type(canvas.getByLabelText(/password/i), 'wrongpassword');

    await userEvent.click(canvas.getByRole('button', { name: /sign in/i }));

    await expect(await canvas.findByRole('alert')).toBeInTheDocument();
  },
};

export const ValidationErrors: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.click(canvas.getByLabelText(/email/i));
    await userEvent.click(canvas.getByLabelText(/password/i));
    await userEvent.tab();
  },
};
