import { ErrorBoundary } from 'react-error-boundary';
import { useLocation } from 'react-router-dom';

import App from '@/app';
import { AppInitializer, PageError } from '@/components/widgets';

function AppErrorBoundary() {
  const location = useLocation();

  return (
    <ErrorBoundary
      FallbackComponent={PageError}
      resetKeys={[location.pathname]}
    >
      <AppInitializer>
        <App />
      </AppInitializer>
    </ErrorBoundary>
  );
}

export default AppErrorBoundary;
