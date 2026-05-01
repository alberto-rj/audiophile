import type { Meta, StoryObj } from '@storybook/react-vite';

import { ErrorMessage } from '@/components/widgets';

type StoryProps = React.ComponentProps<typeof ErrorMessage>;

const meta = {
  title: 'widgets/ErrorMessage',
  component: ErrorMessage,
  parameters: {
    layout: 'centered',
  },
} satisfies Meta<StoryProps>;

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: ({ ...props }) => {
    return (
      <ErrorMessage {...props}>
        <ErrorMessage.Description>
          Something went wrong. Please try again.
        </ErrorMessage.Description>
        <ErrorMessage.Retry variant='primary'>Try again</ErrorMessage.Retry>
      </ErrorMessage>
    );
  },
};
