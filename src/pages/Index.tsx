import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Layout from '@/components/layout/Layout';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { ArrowRight, ShoppingCart, Star } from 'lucide-react';
import ProductCard from '@/components/products/ProductCard';
import BrandSection from '@/components/brands/BrandSection';
import {
  fetchFeaturedProducts,
  fetchNewProducts,
  fetchSaleProducts,
} from '@/services/productService';
import { Product } from '@/types';
import { toast } from 'sonner';


// Sample brand data
const brands = [
  {
    name: 'AudioTech',
    logo: 'https://placehold.co/200x80?text=AudioTech',
    slug: 'audiotech',
    productCount: 42,
  },
  {
    name: 'VisionTech',
    logo: 'https://placehold.co/200x80?text=VisionTech',
    slug: 'visiontech',
    productCount: 36,
  },
  {
    name: 'TechGiant',
    logo: 'https://placehold.co/200x80?text=TechGiant',
    slug: 'techgiant',
    productCount: 51,
  },
  {
    name: 'SmartLife',
    logo: 'https://placehold.co/200x80?text=SmartLife',
    slug: 'smartlife',
    productCount: 29,
  },
  {
    name: 'ComputeTech',
    logo: 'https://placehold.co/200x80?text=ComputeTech',
    slug: 'computetech',
    productCount: 45,
  },
];

const Index = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [newArrivals, setNewArrivals] = useState<Product[]>([]);
  const [onSaleProducts, setOnSaleProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    async function loadProducts() {
      try {
        setIsLoading(true);

        // Try to fetch products from Supabase to check if it's connected
          try {
            const featured = await fetchFeaturedProducts();
            setFeaturedProducts(featured.slice(0, 4));

            const newProducts = await fetchNewProducts();
            setNewArrivals(newProducts.slice(0, 4));

            const saleProducts = await fetchSaleProducts();
            setOnSaleProducts(saleProducts.slice(0, 4));
            console.log({featured,newProducts,saleProducts})
          } catch (error) {
            console.error('Could not load from Supabase:', error);
            loadMockData();
          }
      } catch (error) {
        console.error('Error loading products:', error);
        toast.error('An error occurred while loading products.');
      } finally {
        setIsLoading(false);
      }
    }

    async function loadMockData() {
      // If Supabase fails, fall back to mock data
      const { products } = await import('@/data/mockData');

      setFeaturedProducts(products.filter((p) => p.isFeatured).slice(0, 4));
      setNewArrivals(products.filter((p) => p.isNew).slice(0, 4));
      setOnSaleProducts(products.filter((p) => p.onSale).slice(0, 4));

    }

    loadProducts();
  }, []);

  return (
    <Layout>
      {/* Hero Section */}
      <section className='relative bg-gradient-to-r from-[#0CB657] via-[#0cb656a8] to-white py-16 md:py-24'>
        <div className='container relative z-10 mx-auto px-4 flex flex-col md:flex-row items-center'>
          <div className='md:w-1/2 mb-8 md:mb-0 md:pr-8'>
            <h1 className='mb-4 text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-gray-900 animate-slide-in'>
              Discover the Latest in Tech
            </h1>
            <p
              className='mb-6 text-lg md:text-xl text-gray-600 max-w-xl animate-slide-in'
              style={{ animationDelay: '0.2s' }}
            >
              Explore our curated collection of premium electronics, from
              noise-canceling headphones to smart home devices.
            </p>
            <div
              className='flex flex-wrap gap-4 animate-slide-in'
              style={{ animationDelay: '0.4s' }}
            >
              <Button size='lg' asChild>
                <Link to='/products'>Shop Now</Link>
              </Button>
              <Button size='lg' variant='outline' asChild>
                <Link to='/categories'>Browse Categories</Link>
              </Button>
            </div>
          </div>
          <div
            className='md:w-1/2 animate-fade-in'
            style={{ animationDelay: '0.3s' }}
          >
            <img
              src='https://images.unsplash.com/photo-1548036328-c9fa89d128fa?q=80&w=1769&auto=format&fit=crop'
              alt='Premium electronics'
              className='rounded-lg shadow-lg object-cover w-full max-h-[500px]'
            />
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className='py-12 bg-background'>
        <div className='container mx-auto px-4'>
          <h2 className='text-2xl md:text-3xl font-bold mb-8 text-center'>
            Shop by Category
          </h2>
          <div className='grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6'>
            <Link
              to='/products?category=Electronics&subcategory=Audio'
              className='group relative rounded-lg overflow-hidden'
            >
              <img
                src='https://images.unsplash.com/photo-1546435770-a3e426bf472b?q=80&w=2065&auto=format&fit=crop'
                alt='Audio'
                className='w-full aspect-square object-cover transform group-hover:scale-105 transition-transform duration-300'
              />
              <div className='absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center'>
                <h3 className='text-white text-xl font-semibold'>Audio</h3>
              </div>
            </Link>
            <Link
              to='/products?category=Electronics&subcategory=Smartphones'
              className='group relative rounded-lg overflow-hidden'
            >
              <img
                src='https://images.unsplash.com/photo-1511707171634-5f897ff02ff9?q=80&w=1780&auto=format&fit=crop'
                alt='Smartphones'
                className='w-full aspect-square object-cover transform group-hover:scale-105 transition-transform duration-300'
              />
              <div className='absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center'>
                <h3 className='text-white text-xl font-semibold'>
                  Smartphones
                </h3>
              </div>
            </Link>
            <Link
              to='/products?category=Electronics&subcategory=Laptops'
              className='group relative rounded-lg overflow-hidden'
            >
              <img
                src='https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=2071&auto=format&fit=crop'
                alt='Laptops'
                className='w-full aspect-square object-cover transform group-hover:scale-105 transition-transform duration-300'
              />
              <div className='absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center'>
                <h3 className='text-white text-xl font-semibold'>Laptops</h3>
              </div>
            </Link>
            <Link
              to='/products?category=Electronics&subcategory=Smart+Home'
              className='group relative rounded-lg overflow-hidden'
            >
              <img
                src='https://images.unsplash.com/photo-1581092583537-20d51b4b4f1b?q=80&w=2070&auto=format&fit=crop'
                alt='Smart Home'
                className='w-full aspect-square object-cover transform group-hover:scale-105 transition-transform duration-300'
              />
              <div className='absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center'>
                <h3 className='text-white text-xl font-semibold'>Smart Home</h3>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className='py-12 bg-muted/30'>
        <div className='container mx-auto px-4'>
          <div className='flex justify-between items-center mb-8'>
            <h2 className='text-2xl md:text-3xl font-bold'>
              Featured Products
            </h2>
            <Link
              to='/products?featured=true'
              className='flex items-center text-primary hover:underline'
            >
              View All <ArrowRight className='ml-1 h-4 w-4' />
            </Link>
          </div>
          {isLoading ? (
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className='bg-white rounded-lg shadow-md p-4 animate-pulse'
                >
                  <div className='w-full h-48 bg-gray-200 rounded-md mb-4'></div>
                  <div className='h-6 bg-gray-200 rounded mb-2 w-3/4'></div>
                  <div className='h-4 bg-gray-200 rounded mb-4 w-1/2'></div>
                  <div className='h-10 bg-gray-200 rounded'></div>
                </div>
              ))}
            </div>
          ) : (
            <div className='product-grid'>
              {featuredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* New Arrivals */}
      <section className='py-12 bg-background'>
        <div className='container mx-auto px-4'>
          <div className='flex justify-between items-center mb-8'>
            <h2 className='text-2xl md:text-3xl font-bold'>New Arrivals</h2>
            <Link
              to='/products?new=true'
              className='flex items-center text-primary hover:underline'
            >
              View All <ArrowRight className='ml-1 h-4 w-4' />
            </Link>
          </div>
          {isLoading ? (
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className='bg-white rounded-lg shadow-md p-4 animate-pulse'
                >
                  <div className='w-full h-48 bg-gray-200 rounded-md mb-4'></div>
                  <div className='h-6 bg-gray-200 rounded mb-2 w-3/4'></div>
                  <div className='h-4 bg-gray-200 rounded mb-4 w-1/2'></div>
                  <div className='h-10 bg-gray-200 rounded'></div>
                </div>
              ))}
            </div>
          ) : (
            <div className='product-grid'>
              {newArrivals.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Sale Products */}
      <section className='py-12 bg-muted/30'>
        <div className='container mx-auto px-4'>
          <div className='flex justify-between items-center mb-8'>
            <h2 className='text-2xl md:text-3xl font-bold'>On Sale</h2>
            <Link
              to='/products?on_sale=true'
              className='flex items-center text-primary hover:underline'
            >
              View All <ArrowRight className='ml-1 h-4 w-4' />
            </Link>
          </div>
          {isLoading ? (
            <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6'>
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  className='bg-white rounded-lg shadow-md p-4 animate-pulse'
                >
                  <div className='w-full h-48 bg-gray-200 rounded-md mb-4'></div>
                  <div className='h-6 bg-gray-200 rounded mb-2 w-3/4'></div>
                  <div className='h-4 bg-gray-200 rounded mb-4 w-1/2'></div>
                  <div className='h-10 bg-gray-200 rounded'></div>
                </div>
              ))}
            </div>
          ) : (
            <div className='product-grid'>
              {onSaleProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Brands Section - replaced with our new component */}
      <BrandSection
        brands={brands}
        title='Shop by Brand'
        description='Discover products from top brands in the electronics industry'
      />

      {/* Features Section */}
      <section className='py-12' style={{ backgroundColor: '#6bde89' }}>
        <div className='container mx-auto px-4'>
          <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
            <div className='flex flex-col items-center text-center'>
              <div className='bg-white p-4 rounded-full mb-4'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  className='text-brand-primary h-8 w-8'
                >
                  <path d='M5 12h14'></path>
                  <path d='m12 5 7 7-7 7'></path>
                </svg>
              </div>
              <h3 className='text-xl font-semibold mb-2'>Free Shipping</h3>
              <p className='text-gray-600'>On all orders over $99</p>
            </div>
            <div className='flex flex-col items-center text-center'>
              <div className='bg-white p-4 rounded-full mb-4'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  className='text-brand-primary h-8 w-8'
                >
                  <path d='M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z'></path>
                </svg>
              </div>
              <h3 className='text-xl font-semibold mb-2'>Customer Support</h3>
              <p className='text-gray-600'>24/7 support for all your needs</p>
            </div>
            <div className='flex flex-col items-center text-center'>
              <div className='bg-white p-4 rounded-full mb-4'>
                <svg
                  xmlns='http://www.w3.org/2000/svg'
                  width='24'
                  height='24'
                  viewBox='0 0 24 24'
                  fill='none'
                  stroke='currentColor'
                  strokeWidth='2'
                  strokeLinecap='round'
                  strokeLinejoin='round'
                  className='text-brand-primary h-8 w-8'
                >
                  <path d='m7.9 20 6.2-16h2l-6.2 16Z'></path>
                  <path d='M4 17h8'></path>
                  <path d='M12 7h8'></path>
                </svg>
              </div>
              <h3 className='text-xl font-semibold mb-2'>Secure Payments</h3>
              <p className='text-gray-600'>Safe & encrypted transactions</p>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className='py-12 bg-background'>
        <div className='container mx-auto px-4 max-w-3xl text-center'>
          <h2 className='text-2xl md:text-3xl font-bold mb-4'>Stay Updated</h2>
          <p className='text-gray-600 mb-6'>
            Subscribe to our newsletter for exclusive deals and updates on new
            products.
          </p>
          <form className='flex flex-col sm:flex-row gap-3 max-w-lg mx-auto'>
            <Input
              type='email'
              placeholder='Enter your email'
              className='flex-1'
            />
            <Button type='submit'>Subscribe</Button>
          </form>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
