import type { Meta, StoryObj } from '@storybook/react-vite';

import { APP_ROUTES } from '@/config/app-routes';
import { LoginPage } from '@/pages';
import { LayoutCenteredOnScreen } from '@/layouts';

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
