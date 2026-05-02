import type { Decorator } from '@storybook/react-vite';
import { ErrorBoundary } from 'react-error-boundary';

import { PageError } from '@/components/widgets';

export const ErrorBoundaryDecorator: Decorator = (Story, context) => {
  return (
    <ErrorBoundary FallbackComponent={PageError}>
      <Story {...context} />
    </ErrorBoundary>
  );
};
