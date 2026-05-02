import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { ErrorBoundary } from 'react-error-boundary';
import { BrowserRouter } from 'react-router-dom';

import App from '@/app';
import { store } from '@/app/store';
import '@/index.css';
import { PageError } from '@/components/widgets';

async function enableMocking() {
  if (import.meta.env.DEV) {
    const { worker } = await import('./mocks/browser');
    return worker.start({
      onUnhandledRequest: 'bypass',
    });
  }
}

const root = document.getElementById('root');

if (!root) {
  throw new Error(
    'Root element not found. Check that index.html has <div id="root">',
  );
}

enableMocking().then(() => {
  createRoot(root).render(
    <StrictMode>
      <BrowserRouter>
        <Provider store={store}>
          <ErrorBoundary FallbackComponent={PageError}>
            <App />
          </ErrorBoundary>
        </Provider>
      </BrowserRouter>
    </StrictMode>,
  );
});
