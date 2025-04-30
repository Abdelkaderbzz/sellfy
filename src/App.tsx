import { Toaster } from '@/components/ui/toaster';
import { Toaster as Sonner } from '@/components/ui/sonner';
import { TooltipProvider } from '@/components/ui/tooltip';
import { ThemeProvider } from 'next-themes';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Index from './pages/Index';
import ProductsPage from './pages/ProductsPage';
import ProductDetailPage from './pages/ProductDetailPage';
import CartPage from './pages/CartPage';
import CheckoutPage from './pages/CheckoutPage';
import ProfilePage from './pages/ProfilePage';
import CategoriesPage from './pages/CategoriesPage';
import AboutUsPage from './pages/AboutUsPage';
import WishlistPage from './pages/WishlistPage';
import NotFound from './pages/NotFound';
import { CartProvider } from './contexts/CartContext';
import { WishlistProvider } from './contexts/WishlistContext';
import { TakiPopups } from 'taki-popups-plugin-dev';

const queryClient = new QueryClient();

TakiPopups({
  name: 'Adem',
  memberId: '73924',
  appId: '681242ba23766be97e61335b',
  lang: 'ar',
  meta_data: {
    age: 18,
    state: 'Manouba',
    phoneNumber: '5289452343',
    // ... additional meta-data
  },
});
const App = () => {
  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider attribute='class' defaultTheme='light'>
        <CartProvider>
          <WishlistProvider>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <Routes>
                  <Route path='/' element={<Index />} />
                  <Route path='/products' element={<ProductsPage />} />
                  <Route path='/product/:id' element={<ProductDetailPage />} />
                  <Route path='/cart' element={<CartPage />} />
                  <Route path='/checkout' element={<CheckoutPage />} />
                  <Route path='/profile' element={<ProfilePage />} />
                  <Route path='/categories' element={<CategoriesPage />} />
                  <Route path='/about' element={<AboutUsPage />} />
                  <Route path='/wishlist' element={<WishlistPage />} />
                  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                  <Route path='*' element={<NotFound />} />
                </Routes>
              </BrowserRouter>
            </TooltipProvider>
          </WishlistProvider>
        </CartProvider>
      </ThemeProvider>
    </QueryClientProvider>
  );
};

export default App;
