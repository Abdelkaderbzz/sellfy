
import React from "react";
import { Product, ProductVariant } from "@/types";
import { Button } from "@/components/ui/button";
import { Heart, ShoppingCart } from "lucide-react";
import ProductGallery from "../ProductGallery";
import ProductRating from "./ProductRating";

interface QuickViewContentProps {
  product: Product;
  selectedVariant?: ProductVariant;
  onAddToCart: (e: React.MouseEvent) => void;
  onAddToWishlist: (e: React.MouseEvent) => void;
}

const QuickViewContent: React.FC<QuickViewContentProps> = ({ 
  product, 
  selectedVariant, 
  onAddToCart, 
  onAddToWishlist 
}) => {
  return (
    <div className="flex flex-col lg:flex-row gap-6 p-4">
      <div className="lg:w-1/2">
        <ProductGallery images={product.images} productName={product.name} />
      </div>
      <div className="lg:w-1/2">
        <div className="mb-1 text-sm text-muted-foreground">
          {product.brand}
        </div>
        <h2 className="text-2xl font-medium mb-2">{product.name}</h2>
        
        <ProductRating 
          rating={product.rating}
          reviewCount={product.reviewCount}
          size="md"
        />
        
        <div className="flex items-center mb-4 mt-2">
          {product.originalPrice && (
            <span className="price-original">${product.originalPrice.toFixed(2)}</span>
          )}
          <span className={product.onSale ? "price price-discount" : "price"}>
            ${product.price.toFixed(2)}
          </span>
        </div>
        
        <p className="text-muted-foreground mb-4 line-clamp-3">
          {product.description}
        </p>

        <div className="flex space-x-2 mb-4">
          <Button 
            className="flex-1" 
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onAddToCart(e);
            }}
          >
            <ShoppingCart className="h-4 w-4 mr-2" />
            Add to Cart
          </Button>
          <Button 
            variant="outline" 
            size="icon"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onAddToWishlist(e);
            }}
          >
            <Heart className="h-4 w-4" />
          </Button>
        </div>
        
        <div className="flex justify-between text-sm text-muted-foreground">
          <span>Category: {product.category}</span>
          <span>{product.stock > 0 ? `In Stock (${product.stock})` : 'Out of Stock'}</span>
        </div>
      </div>
    </div>
  );
};

export default QuickViewContent;
