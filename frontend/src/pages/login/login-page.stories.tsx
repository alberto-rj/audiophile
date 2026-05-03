import type { Meta, StoryObj } from '@storybook/react-vite';

import { LoginPage } from '@/pages';
import { LayoutCenteredOnScreen } from '@/layouts';

type StoryProps = React.ComponentProps<typeof LoginPage>;

const meta = {
  title: 'pages/LoginPage',
  component: LoginPage,
  parameters: {
    layout: 'fullscreen',
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
