import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import AppErrorBoundary from '@/app-error-boundary';
import { store } from '@/app/store';
import { AppInitializer } from '@/app/app-initializer';

import '@/styles/global.css';

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
          <AppInitializer>
            <AppErrorBoundary />
          </AppInitializer>
        </Provider>
      </BrowserRouter>
    </StrictMode>,
  );
});
