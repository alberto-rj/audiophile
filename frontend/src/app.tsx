import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { CategoryPage, Home, NotFoundPage, ProductPage } from '@/pages';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path='/'
          element={<Home />}
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
          path='*'
          element={<NotFoundPage />}
        />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
