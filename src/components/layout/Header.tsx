import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import logo from './../../../public/logo.png'
import { useWishlist } from '@/contexts/WishlistContext';
import SearchBar from '@/components/search/SearchBar';
import {
  ShoppingCart,
  Heart,
  User,
  Menu,
  Search,
  X,
  Trash,
} from 'lucide-react';
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetClose,
  SheetHeader,
  SheetTitle,
  SheetFooter,
} from '@/components/ui/sheet';
import { useCart } from '@/contexts/CartContext';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';

const Header: React.FC = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const { items, removeItem, itemCount, subtotal } = useCart();
  const { wishlist } = useWishlist();

  return (
    <header className='sticky top-0 z-40 w-full border-b bg-background'>
      <div className='container flex h-16 items-center'>
        <div className='flex md:hidden'>
          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant='ghost'
                size='icon'
                className='mr-2'
                aria-label='Menu'
              >
                <Menu className='h-5 w-5' />
              </Button>
            </SheetTrigger>
            <SheetContent side='left' className='w-[280px] sm:w-[350px]'>
              <nav className='flex flex-col gap-4 mt-8'>
                <SheetClose asChild>
                  <Link to='/' className='block px-2 py-1 text-lg font-medium'>
                    Home
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link
                    to='/products'
                    className='block px-2 py-1 text-lg font-medium'
                  >
                    Shop All
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link
                    to='/categories'
                    className='block px-2 py-1 text-lg font-medium'
                  >
                    Categories
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link
                    to='/about'
                    className='block px-2 py-1 text-lg font-medium'
                  >
                    About Us
                  </Link>
                </SheetClose>
              </nav>
            </SheetContent>
          </Sheet>
        </div>

        <div className='flex items-center'>
          <img src={logo} alt='Logo' className='h-10 w-auto' />
        </div>

        <nav className='mx-6 hidden items-center space-x-4 md:flex md:flex-1'>
          <Link
            to='/'
            className='text-sm font-medium transition-colors hover:text-primary'
          >
            Home
          </Link>
          <Link
            to='/products'
            className='text-sm font-medium transition-colors hover:text-primary'
          >
            Shop All
          </Link>
          <Link
            to='/categories'
            className='text-sm font-medium transition-colors hover:text-primary'
          >
            Categories
          </Link>
          <Link
            to='/about'
            className='text-sm font-medium transition-colors hover:text-primary'
          >
            About Us
          </Link>
        </nav>

        <div className='flex flex-1 items-center justify-end space-x-2'>
          {isSearchOpen ? (
            <div className='flex items-center w-full max-w-xs md:max-w-md animate-fade-in'>
              <SearchBar
                isExpanded={true}
                onClose={() => setIsSearchOpen(false)}
              />
            </div>
          ) : (
            <Button
              variant='ghost'
              size='icon'
              onClick={() => setIsSearchOpen(true)}
              className='hidden sm:flex'
              aria-label='Search'
            >
              <Search className='h-5 w-5' />
            </Button>
          )}

          <Button
            variant='ghost'
            size='icon'
            aria-label='Wishlist'
            asChild
            className='relative'
          >
            <Link to='/wishlist'>
              <Heart className='h-5 w-5' />
              {wishlist.length > 0 && (
                <span className='absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground'>
                  {wishlist.length}
                </span>
              )}
            </Link>
          </Button>

          <Button variant='ghost' size='icon' aria-label='Account' asChild>
            <Link to='/profile'>
              <User className='h-5 w-5' />
            </Link>
          </Button>

          <Sheet>
            <SheetTrigger asChild>
              <Button
                variant='ghost'
                size='icon'
                aria-label='Cart'
                className='relative'
              >
                <ShoppingCart className='h-5 w-5' />
                {itemCount > 0 && (
                  <span className='absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-primary text-[10px] font-medium text-primary-foreground'>
                    {itemCount}
                  </span>
                )}
              </Button>
            </SheetTrigger>
            <SheetContent
              side='right'
              className='w-[350px] sm:w-[450px] flex flex-col'
            >
              <SheetHeader>
                <SheetTitle className='flex items-center'>
                  <ShoppingCart className='h-5 w-5 mr-2' />
                  Your Cart
                  {itemCount > 0 && (
                    <Badge variant='secondary' className='ml-2'>
                      {itemCount} items
                    </Badge>
                  )}
                </SheetTitle>
              </SheetHeader>

              <div className='flex-1 overflow-auto py-4'>
                {items.length === 0 ? (
                  <div className='flex h-full flex-col items-center justify-center text-center'>
                    <ShoppingCart className='h-12 w-12 text-muted-foreground opacity-50 mb-4' />
                    <p className='text-lg font-medium mb-1'>
                      Your cart is empty
                    </p>
                    <p className='text-muted-foreground mb-4'>
                      Add some products to your cart to get started
                    </p>
                    <SheetClose asChild>
                      <Button asChild>
                        <Link to='/products'>Continue Shopping</Link>
                      </Button>
                    </SheetClose>
                  </div>
                ) : (
                  <div className='space-y-4'>
                    {items.map((item) => {
                      const { product, variant, quantity } = item;
                      const price = variant ? variant.price : product.price;
                      const displayName = variant
                        ? `${product.name} - ${variant.name}`
                        : product.name;

                      return (
                        <div
                          key={`${product.id}-${variant?.id || 'default'}`}
                          className='flex items-start py-2'
                        >
                          <div className='h-16 w-16 flex-shrink-0 overflow-hidden rounded-md border'>
                            <img
                              src={product.images[0]}
                              alt={product.name}
                              className='h-full w-full object-cover object-center'
                            />
                          </div>
                          <div className='ml-4 flex flex-1 flex-col'>
                            <div className='flex justify-between'>
                              <div>
                                <h3 className='text-sm font-medium'>
                                  <SheetClose asChild>
                                    <Link
                                      to={`/product/${product.id}`}
                                      className='hover:text-primary'
                                    >
                                      {displayName}
                                    </Link>
                                  </SheetClose>
                                </h3>
                                <p className='text-xs text-muted-foreground'>
                                  Qty: {quantity}
                                </p>
                              </div>
                              <div className='text-right'>
                                <p className='text-sm font-medium'>
                                  ${(price * quantity).toFixed(2)}
                                </p>
                                <button
                                  onClick={() =>
                                    removeItem(product.id, variant?.id)
                                  }
                                  className='text-red-500 hover:text-red-700 text-xs flex items-center'
                                >
                                  <Trash className='h-3 w-3 mr-1' />
                                  Remove
                                </button>
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {items.length > 0 && (
                <div className='mt-auto'>
                  <Separator className='my-4' />
                  <div className='space-y-1.5'>
                    <div className='flex justify-between text-sm'>
                      <span>Subtotal</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                    <div className='flex justify-between text-sm'>
                      <span>Shipping</span>
                      <span className='text-muted-foreground'>
                        Calculated at checkout
                      </span>
                    </div>
                    <div className='flex justify-between text-sm'>
                      <span>Tax</span>
                      <span className='text-muted-foreground'>
                        Calculated at checkout
                      </span>
                    </div>
                    <Separator className='my-2' />
                    <div className='flex justify-between text-lg font-semibold'>
                      <span>Total</span>
                      <span>${subtotal.toFixed(2)}</span>
                    </div>
                  </div>

                  <SheetFooter className='mt-6 gap-2 sm:flex-row'>
                    <SheetClose asChild>
                      <Button variant='outline' className='w-full'>
                        <Link
                          to='/cart'
                          className='w-full flex items-center justify-center'
                        >
                          View Cart
                        </Link>
                      </Button>
                    </SheetClose>
                    <SheetClose asChild>
                      <Button className='w-full'>
                        <Link
                          to='/checkout'
                          className='w-full flex items-center justify-center'
                        >
                          Checkout
                        </Link>
                      </Button>
                    </SheetClose>
                  </SheetFooter>
                </div>
              )}
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
