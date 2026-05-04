import { Suspense } from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';

import { APP_ROUTES } from '@/config/app-routes';
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
          path={APP_ROUTES.login}
          element={<LoginPage />}
        />
        <Route
          path={APP_ROUTES.register}
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
          path={`${APP_ROUTES.categories}/:slug`}
          element={<CategoryPage />}
        />
        <Route
          path={`${APP_ROUTES.products}/:slug`}
          element={<ProductPage />}
        />
        <Route
          path={APP_ROUTES.checkout}
          element={
            <RequireCart>
              <CheckoutPage />
            </RequireCart>
          }
        />
      </Route>

      <Route
        path={APP_ROUTES.notFound}
        element={<NotFoundPage />}
      />
    </Routes>
  );
};

export default App;
