import { BrowserRouter, Routes, Route } from 'react-router-dom';

import {
  CategoryPage,
  CheckoutPage,
  HomePage,
  NotFoundPage,
  ProductPage,
} from '@/pages';
import { MainLayout } from '@/layouts';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path='/'
          element={<MainLayout />}
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
            element={<CheckoutPage />}
          />
        </Route>

        <Route
          path='*'
          element={<NotFoundPage />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
