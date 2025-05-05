import { RouteObject } from 'react-router-dom';
import Index from '../pages/Index';
import ProductsPage from '../pages/ProductsPage';
import ProductDetailPage from '../pages/ProductDetailPage';
import CartPage from '../pages/CartPage';
import CheckoutPage from '../pages/CheckoutPage';
import ProfilePage from '../pages/ProfilePage';
import CategoriesPage from '../pages/CategoriesPage';
import AboutUsPage from '../pages/AboutUsPage';
import WishlistPage from '../pages/WishlistPage';
import NotFound from '../pages/NotFound';

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <Index />,
  },
  {
    path: '/products',
    element: <ProductsPage />,
  },
  {
    path: '/product/:id',
    element: <ProductDetailPage />,
  },
  {
    path: '/cart',
    element: <CartPage />,
  },
  {
    path: '/checkout',
    element: <CheckoutPage />,
  },
  {
    path: '/profile',
    element: <ProfilePage />,
  },
  {
    path: '/categories',
    element: <CategoriesPage />,
  },
  {
    path: '/about',
    element: <AboutUsPage />,
  },
  {
    path: '/wishlist',
    element: <WishlistPage />,
  },
  {
    path: '*',
    element: <NotFound />,
  },
];
