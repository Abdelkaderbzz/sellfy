
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  ShoppingCart,
  Heart,
  User,
  Menu,
  Search,
  X,
} from "lucide-react";
import { 
  Sheet, 
  SheetContent, 
  SheetTrigger,
  SheetClose
} from "@/components/ui/sheet";

const Header: React.FC = () => {
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  return (
    <header className="sticky top-0 z-40 w-full border-b bg-background">
      <div className="container flex h-16 items-center">
        <div className="flex md:hidden">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" className="mr-2" aria-label="Menu">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-[280px] sm:w-[350px]">
              <nav className="flex flex-col gap-4 mt-8">
                <SheetClose asChild>
                  <Link to="/" className="block px-2 py-1 text-lg font-medium">
                    Home
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link to="/products" className="block px-2 py-1 text-lg font-medium">
                    Shop All
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link to="/categories" className="block px-2 py-1 text-lg font-medium">
                    Categories
                  </Link>
                </SheetClose>
                <SheetClose asChild>
                  <Link to="/about" className="block px-2 py-1 text-lg font-medium">
                    About Us
                  </Link>
                </SheetClose>
              </nav>
            </SheetContent>
          </Sheet>
        </div>

        <div className="flex items-center">
          <Link to="/" className="text-xl md:text-2xl font-bold text-brand-primary">
            ECommerce<span className="text-brand-secondary">Prime</span>
          </Link>
        </div>

        <nav className="mx-6 hidden items-center space-x-4 md:flex md:flex-1">
          <Link to="/" className="text-sm font-medium transition-colors hover:text-primary">
            Home
          </Link>
          <Link to="/products" className="text-sm font-medium transition-colors hover:text-primary">
            Shop All
          </Link>
          <Link to="/categories" className="text-sm font-medium transition-colors hover:text-primary">
            Categories
          </Link>
          <Link to="/about" className="text-sm font-medium transition-colors hover:text-primary">
            About Us
          </Link>
        </nav>

        <div className="flex flex-1 items-center justify-end space-x-2">
          {isSearchOpen ? (
            <div className="flex items-center w-full max-w-xs md:max-w-md animate-fade-in">
              <Input
                type="search"
                placeholder="Search products..."
                className="rounded-r-none"
                autoFocus
              />
              <Button className="rounded-l-none" variant="ghost" onClick={() => setIsSearchOpen(false)}>
                <X className="h-5 w-5" />
              </Button>
            </div>
          ) : (
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsSearchOpen(true)}
              className="hidden sm:flex"
              aria-label="Search"
            >
              <Search className="h-5 w-5" />
            </Button>
          )}

          <Button variant="ghost" size="icon" aria-label="Wishlist" asChild>
            <Link to="/wishlist">
              <Heart className="h-5 w-5" />
            </Link>
          </Button>

          <Button variant="ghost" size="icon" aria-label="Account" asChild>
            <Link to="/account">
              <User className="h-5 w-5" />
            </Link>
          </Button>

          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon" aria-label="Cart">
                <ShoppingCart className="h-5 w-5" />
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-brand-secondary text-[10px] font-medium text-white">
                  0
                </span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[350px] sm:w-[450px]">
              <div className="h-full flex flex-col">
                <h2 className="text-lg font-medium mb-4">Your Cart</h2>
                <div className="flex-1 flex items-center justify-center text-center">
                  <div>
                    <ShoppingCart className="mx-auto h-10 w-10 text-muted-foreground opacity-50" />
                    <p className="mt-2 text-muted-foreground">Your cart is empty</p>
                    <SheetClose asChild>
                      <Button className="mt-4" asChild>
                        <Link to="/products">Continue Shopping</Link>
                      </Button>
                    </SheetClose>
                  </div>
                </div>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;
