import { Routes, Route, Outlet } from 'react-router-dom';
import { Suspense } from 'react';

import {
  CategoryPage,
  CheckoutPage,
  HomePage,
  LoginPage,
  NotFoundPage,
  ProductPage,
  RegisterPage,
} from '@/pages';
import { LayoutCenteredOnScreen, LayoutLanding } from '@/layouts';
import { PageLoader, RequireCart } from '@/components/widgets';

const App = () => {
  return (
    <Routes>
      {/* Auth */}
      <Route
        path='/'
        element={
          <Suspense fallback={<PageLoader />}>
            <LayoutCenteredOnScreen>
              <Outlet />
            </LayoutCenteredOnScreen>
          </Suspense>
        }
      >
        <Route
          path='/login'
          element={<LoginPage />}
        />
        <Route
          path='/register'
          element={<RegisterPage />}
        />
      </Route>

      <Route
        path='/'
        element={
          <Suspense fallback={<PageLoader />}>
            <LayoutLanding>
              <Outlet />
            </LayoutLanding>
          </Suspense>
        }
      >
        <Route
          index
          element={<HomePage />}
        />
        <Route
          path='/categories/:slug'
          element={<CategoryPage />}
        />
        <Route
          path='/products/:slug'
          element={<ProductPage />}
        />
        <Route
          path='/checkout'
          element={
            <RequireCart>
              <CheckoutPage />
            </RequireCart>
          }
        />
      </Route>

      <Route
        path='*'
        element={<NotFoundPage />}
      />
    </Routes>
  );
};

export default App;
