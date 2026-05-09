import { Suspense } from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';

import { APP_ROUTES } from '@/config/app-routes';
import {
  CategoryPage,
  CheckoutPage,
  HomePage,
  LoginPage,
  NotFoundPage,
  OrderDetailsPage,
  OrdersPage,
  ProductPage,
  ProfilePage,
  RegisterPage,
} from '@/pages';
import { LayoutBasic, LayoutCenteredOnScreen, LayoutLanding } from '@/layouts';
import { PageLoader, RequireCart } from '@/components/widgets';
import RequireAuth from './components/widgets/require-auth/require-auth';

const App = () => {
  return (
    <Routes>
      <Route
        path='/'
        element={
          <Suspense fallback={<PageLoader />}>
            <Outlet />
          </Suspense>
        }
      >
        {/* Auth (start) */}
        <Route
          path='/'
          element={
            <LayoutCenteredOnScreen>
              <Outlet />
            </LayoutCenteredOnScreen>
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
        {/* Auth (end) */}

        {/* Profile (start) */}
        <Route
          path='/'
          element={
            <LayoutBasic>
              <Outlet />
            </LayoutBasic>
          }
        >
          <Route
            path={`${APP_ROUTES.profile}`}
            element={
              <RequireAuth>
                <ProfilePage />
              </RequireAuth>
            }
          />
        </Route>

        {/* Profile (end) */}

        {/* Orders (start) */}
        <Route
          path={`${APP_ROUTES.orders}`}
          element={
            <RequireAuth>
              <OrdersPage />
            </RequireAuth>
          }
        />
        <Route
          path={`${APP_ROUTES.orders}/:slug`}
          element={
            <RequireAuth>
              <OrderDetailsPage />
            </RequireAuth>
          }
        />
        {/* Orders (end) */}

        {/* Landing (start) */}
        <Route
          path='/'
          element={
            <LayoutLanding>
              <Outlet />
            </LayoutLanding>
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
        {/* Landing (end) */}

        <Route
          path={APP_ROUTES.notFound}
          element={<NotFoundPage />}
        />
      </Route>
    </Routes>
  );
};

export default App;
