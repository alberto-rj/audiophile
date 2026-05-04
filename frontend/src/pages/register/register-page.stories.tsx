import type { Meta, StoryObj } from '@storybook/react-vite';
import { expect, userEvent, within } from 'storybook/test';

import { APP_ROUTES } from '@/config/app-routes';
import { RegisterPage } from '@/pages';
import { LayoutCenteredOnScreen } from '@/layouts';

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

export const Default: Story = {};

export const FilledValid: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.type(canvas.getByLabelText(/^name/i), 'Jane Doe');
    await userEvent.type(canvas.getByLabelText(/email/i), 'jane@example.com');
    await userEvent.type(canvas.getByLabelText(/^password/i), 'securepass123');
    await userEvent.type(canvas.getByLabelText(/confirm/i), 'securepass123');
  },
};

export const RequiredFields: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.click(canvas.getByLabelText(/^name/i));
    await userEvent.click(canvas.getByLabelText(/email/i));
    await userEvent.click(canvas.getByLabelText(/^password/i));
    await userEvent.click(canvas.getByLabelText(/confirm/i));
    await userEvent.tab();
  },
};

export const PasswordMismatch: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.type(canvas.getByLabelText(/^name/i), 'Jane Doe');
    await userEvent.type(canvas.getByLabelText(/email/i), 'jane@example.com');
    await userEvent.type(canvas.getByLabelText(/^password/i), 'securepass123');
    await userEvent.type(canvas.getByLabelText(/confirm/i), 'different456');
    await userEvent.tab();
  },
};

export const EmailAlreadyInUse: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.type(canvas.getByLabelText(/^name/i), 'John Doe');
    await userEvent.type(canvas.getByLabelText(/email/i), 'john@example.com');
    await userEvent.type(canvas.getByLabelText(/^password/i), 'password123');
    await userEvent.type(canvas.getByLabelText(/confirm/i), 'password123');

    await userEvent.click(
      canvas.getByRole('button', { name: /create account/i }),
    );

    await expect(await canvas.findByRole('alert')).toBeInTheDocument();
  },
};
