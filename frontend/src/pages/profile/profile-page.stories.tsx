import type { Meta, StoryObj } from '@storybook/react-vite';
import { userEvent, within } from 'storybook/test';

import { ProfilePage } from '@/pages';

type StoryProps = React.ComponentProps<typeof ProfilePage>;

const meta = {
  title: 'pages/ProfilePage',
  component: ProfilePage,
  parameters: {
    layout: 'fullscreen',
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
  },
};

export const ValidationErrors: Story = {
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);

    await userEvent.click(canvas.getByLabelText(/^name/i));
    await userEvent.click(canvas.getByLabelText(/email/i));
    await userEvent.tab();
  },
};
