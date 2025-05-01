
import React, { useState, useEffect } from "react";
import { useWishlist } from "@/contexts/WishlistContext";
import Layout from "@/components/layout/Layout";
import ProductCard from "@/components/products/ProductCard";
import { Button } from "@/components/ui/button";
import { Heart, ShoppingCart, Trash } from "lucide-react";
import { Link } from "react-router-dom";
import { Product } from "@/types";
import { fetchProducts } from "@/services/productService";
import { toast } from "sonner";

const WishlistPage: React.FC = () => {
  const { wishlist, clearWishlist } = useWishlist();
  const [wishlistProducts, setWishlistProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    async function fetchWishlistProducts() {
      if (wishlist.length === 0) {
        setWishlistProducts([]);
        setIsLoading(false);
        return;
      }
      
      setIsLoading(true);
      try {
        // Try to fetch from Supabase
        const allProducts = await fetchProducts();
        const filtered = allProducts.filter(product => wishlist.includes(product.id));
        setWishlistProducts(filtered);
      } catch (error) {
        console.error("Failed to fetch from Supabase:", error);
        
        // Fall back to mock data
        const { products: mockProducts } = await import('@/data/mockData');
        const filtered = mockProducts.filter(product => wishlist.includes(product.id));
        setWishlistProducts(filtered);
        
        toast.error("Failed to fetch wishlist from database. Using local data instead.");
      } finally {
        setIsLoading(false);
      }
    }
    
    fetchWishlistProducts();
  }, [wishlist]);

  return (
    <Layout>
      <div className="container py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">My Wishlist</h1>
          {wishlistProducts.length > 0 && (
            <Button 
              variant="outline" 
              className="flex items-center gap-2" 
              onClick={clearWishlist}
            >
              <Trash className="h-4 w-4" />
              Clear Wishlist
            </Button>
          )}
        </div>

        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-white rounded-lg shadow-md p-4 animate-pulse">
                <div className="w-full h-48 bg-gray-200 rounded-md mb-4"></div>
                <div className="h-6 bg-gray-200 rounded mb-2 w-3/4"></div>
                <div className="h-4 bg-gray-200 rounded mb-4 w-1/2"></div>
                <div className="h-10 bg-gray-200 rounded"></div>
              </div>
            ))}
          </div>
        ) : wishlistProducts.length === 0 ? (
          <div className="text-center py-16 space-y-4">
            <div className="inline-flex h-20 w-20 rounded-full bg-muted items-center justify-center">
              <Heart className="h-10 w-10 text-muted-foreground" />
            </div>
            <h2 className="text-xl font-medium">Your wishlist is empty</h2>
            <p className="text-muted-foreground max-w-md mx-auto">
              Products you add to your wishlist will appear here. Start exploring our catalog to find products you love.
            </p>
            <Button asChild className="mt-4">
              <Link to="/products">
                <ShoppingCart className="h-4 w-4 mr-2" />
                Start Shopping
              </Link>
            </Button>
          </div>
        ) : (
          <div className="product-grid">
            {wishlistProducts.map(product => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        )}
      </div>
    </Layout>
  );
};

export default WishlistPage;
