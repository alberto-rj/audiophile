import { lazy } from 'react';

export const HomePage = lazy(() => import('@/pages/home/home'));

export const CategoryPage = lazy(
  () => import('@/pages/categories/category-page'),
);

export const ProductPage = lazy(() => import('@/pages/products/product-page'));

export const CheckoutPage = lazy(
  () => import('@/pages/checkout/checkout-page'),
);

/* Auth */
export const LoginPage = lazy(() => import('@/pages/login/login-page'));

export const RegisterPage = lazy(
  () => import('@/pages/register/register-page'),
);

export const NotFoundPage = lazy(
  () => import('@/pages/not-found/not-found-page'),
);
