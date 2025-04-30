
import React, { createContext, useContext, useEffect, useState } from "react";
import { Product } from "@/types";
import { toast } from "sonner";

interface WishlistContextType {
  wishlist: number[];
  addToWishlist: (productId: number, productName?: string) => void;
  removeFromWishlist: (productId: number, productName?: string) => void;
  isInWishlist: (productId: number) => boolean;
  toggleWishlist: (productId: number, productName?: string) => void;
  clearWishlist: () => void;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export const useWishlist = (): WishlistContextType => {
  const context = useContext(WishlistContext);
  if (context === undefined) {
    throw new Error("useWishlist must be used within a WishlistProvider");
  }
  return context;
};

interface WishlistProviderProps {
  children: React.ReactNode;
}

export const WishlistProvider: React.FC<WishlistProviderProps> = ({ children }) => {
  const [wishlist, setWishlist] = useState<number[]>([]);

  // Load wishlist from localStorage on mount
  useEffect(() => {
    try {
      const savedWishlist = localStorage.getItem("wishlist");
      if (savedWishlist) {
        setWishlist(JSON.parse(savedWishlist));
      }
    } catch (error) {
      console.error("Failed to load wishlist from localStorage:", error);
    }
  }, []);

  // Save wishlist to localStorage whenever it changes
  useEffect(() => {
    try {
      localStorage.setItem("wishlist", JSON.stringify(wishlist));
    } catch (error) {
      console.error("Failed to save wishlist to localStorage:", error);
    }
  }, [wishlist]);

  const addToWishlist = (productId: number, productName?: string) => {
    setWishlist(prev => {
      if (!prev.includes(productId)) {
        toast.success(`${productName || 'Product'} added to your wishlist`);
        return [...prev, productId];
      }
      return prev;
    });
  };

  const removeFromWishlist = (productId: number, productName?: string) => {
    setWishlist(prev => {
      if (prev.includes(productId)) {
        toast.success(`${productName || 'Product'} removed from your wishlist`);
        return prev.filter(id => id !== productId);
      }
      return prev;
    });
  };

  const isInWishlist = (productId: number): boolean => {
    return wishlist.includes(productId);
  };

  const toggleWishlist = (productId: number, productName?: string) => {
    if (isInWishlist(productId)) {
      removeFromWishlist(productId, productName);
    } else {
      addToWishlist(productId, productName);
    }
  };

  const clearWishlist = () => {
    setWishlist([]);
    toast.success("Wishlist cleared");
  };

  const value = {
    wishlist,
    addToWishlist,
    removeFromWishlist,
    isInWishlist,
    toggleWishlist,
    clearWishlist,
  };

  return (
    <WishlistContext.Provider value={value}>
      {children}
    </WishlistContext.Provider>
  );
};
