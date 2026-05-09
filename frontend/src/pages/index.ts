import { lazy } from 'react';

/* Landing (start) */
export const HomePage = lazy(() => import('@/pages/home/home'));

export const CategoryPage = lazy(
  () => import('@/pages/categories/category-page'),
);

export const ProductPage = lazy(() => import('@/pages/products/product-page'));

export const CheckoutPage = lazy(
  () => import('@/pages/checkout/checkout-page'),
);
/* Landing (end) */

/* Auth (start) */
export const LoginPage = lazy(() => import('@/pages/login/login-page'));

export const RegisterPage = lazy(
  () => import('@/pages/register/register-page'),
);
/* Auth (end)  */

/* User (start) */
export const ProfilePage = lazy(() => import('@/pages/profile/profile-page'));
/* User (end) */

/* Orders (start) */
export const OrdersPage = lazy(() => import('@/pages/orders/orders-page'));

export const OrderDetailsPage = lazy(
  () => import('@/pages/order-details/order-details-page'),
);
/* Orders (end) */

export const NotFoundPage = lazy(
  () => import('@/pages/not-found/not-found-page'),
);
