
import React from "react";
import { useWishlist } from "@/contexts/WishlistContext";
import { products } from "@/data/mockData";
import Layout from "@/components/layout/Layout";
import ProductCard from "@/components/products/ProductCard";
import { Button } from "@/components/ui/button";
import { Heart, ShoppingCart, Trash } from "lucide-react";
import { Link } from "react-router-dom";

const WishlistPage: React.FC = () => {
  const { wishlist, clearWishlist } = useWishlist();
  
  const wishlistProducts = products.filter(product => 
    wishlist.includes(product.id)
  );

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

        {wishlistProducts.length === 0 ? (
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
