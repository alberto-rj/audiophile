import { ErrorBoundary } from 'react-error-boundary';
import { useLocation } from 'react-router-dom';

import App from '@/app';
import { ToastProvider, ToastRenderer } from '@/components/ui';
import { AppInitializer, PageError } from '@/components/widgets';

function AppErrorBoundary() {
  const location = useLocation();

  return (
    <ErrorBoundary
      FallbackComponent={PageError}
      resetKeys={[location.pathname]}
    >
      <AppInitializer>
        <ToastProvider>
          <App />
          <ToastRenderer />
        </ToastProvider>
      </AppInitializer>
    </ErrorBoundary>
  );
}

export default AppErrorBoundary;
