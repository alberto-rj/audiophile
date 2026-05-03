import { Routes, Route } from 'react-router-dom';
import { Suspense } from 'react';

import {
  CategoryPage,
  CheckoutPage,
  HomePage,
  NotFoundPage,
  ProductPage,
} from '@/pages';
import { MainLayout } from '@/layouts';
import { PageLoader, RequireCart } from '@/components/widgets';

const App = () => {
  return (
    <Routes>
      <Route
        path='/'
        element={
          <Suspense fallback={<PageLoader />}>
            <MainLayout />
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
