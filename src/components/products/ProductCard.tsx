
import React from "react";
import { Link } from "react-router-dom";
import { Product } from "@/types";
import { Button } from "@/components/ui/button";
import { 
  ShoppingCart, 
  Heart,
  Star,
  StarHalf 
} from "lucide-react";
import { 
  Card,
  CardContent 
} from "@/components/ui/card";
import { toast } from "sonner";

interface ProductCardProps {
  product: Product;
  isGridView?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ 
  product, 
  isGridView = true 
}) => {
  const addToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toast.success(`${product.name} added to cart!`);
  };

  const addToWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toast.success(`${product.name} added to wishlist!`);
  };

  const renderRating = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(<Star key={`full-${i}`} className="w-4 h-4 fill-yellow-400 text-yellow-400" />);
    }
    
    if (hasHalfStar) {
      stars.push(<StarHalf key="half" className="w-4 h-4 fill-yellow-400 text-yellow-400" />);
    }
    
    return stars;
  };

  if (isGridView) {
    return (
      <Card className="product-card h-full">
        <Link to={`/product/${product.id}`}>
          <div className="relative aspect-square overflow-hidden">
            <img
              src={product.images[0]}
              alt={product.name}
              className="h-full w-full object-cover object-center transition-transform duration-300 hover:scale-105"
            />
            <div className="product-card-actions">
              <Button
                variant="secondary"
                size="icon"
                className="h-8 w-8 rounded-full"
                onClick={addToWishlist}
              >
                <Heart className="h-4 w-4" />
              </Button>
              <Button
                variant="secondary"
                size="icon"
                className="h-8 w-8 rounded-full"
                onClick={addToCart}
              >
                <ShoppingCart className="h-4 w-4" />
              </Button>
            </div>
            {product.onSale && (
              <div className="absolute top-2 left-2 badge-sale">
                {product.salePercentage}% OFF
              </div>
            )}
            {product.isNew && (
              <div className="absolute top-2 left-2 badge-new">
                NEW
              </div>
            )}
            {product.stock <= 0 && (
              <div className="absolute top-2 left-2 badge-out-of-stock">
                OUT OF STOCK
              </div>
            )}
          </div>
          <CardContent className="p-4">
            <div className="mb-1 text-sm text-muted-foreground">
              {product.brand}
            </div>
            <h3 className="mb-2 text-base font-medium line-clamp-2">{product.name}</h3>
            <div className="mb-2 flex items-center">
              <div className="star-rating mr-2">
                {renderRating(product.rating)}
              </div>
              <span className="text-xs text-muted-foreground">
                ({product.reviewCount})
              </span>
            </div>
            <div className="flex items-center">
              {product.originalPrice && (
                <span className="price-original">${product.originalPrice.toFixed(2)}</span>
              )}
              <span className={product.onSale ? "price price-discount" : "price"}>
                ${product.price.toFixed(2)}
              </span>
            </div>
          </CardContent>
        </Link>
      </Card>
    );
  } else {
    // List view
    return (
      <Card className="product-card">
        <Link to={`/product/${product.id}`} className="flex">
          <div className="relative h-40 w-40 flex-shrink-0 overflow-hidden">
            <img
              src={product.images[0]}
              alt={product.name}
              className="h-full w-full object-cover object-center"
            />
            {product.onSale && (
              <div className="absolute top-2 left-2 badge-sale">
                {product.salePercentage}% OFF
              </div>
            )}
            {product.isNew && (
              <div className="absolute top-2 left-2 badge-new">
                NEW
              </div>
            )}
            {product.stock <= 0 && (
              <div className="absolute top-2 left-2 badge-out-of-stock">
                OUT OF STOCK
              </div>
            )}
          </div>
          <CardContent className="flex-1 p-4">
            <div className="flex justify-between">
              <div>
                <div className="mb-1 text-sm text-muted-foreground">
                  {product.brand}
                </div>
                <h3 className="mb-2 text-lg font-medium">{product.name}</h3>
                <div className="mb-2 flex items-center">
                  <div className="star-rating mr-2">
                    {renderRating(product.rating)}
                  </div>
                  <span className="text-xs text-muted-foreground">
                    ({product.reviewCount})
                  </span>
                </div>
                <p className="mb-4 text-sm text-muted-foreground line-clamp-2">
                  {product.description}
                </p>
              </div>
              <div className="ml-4 flex flex-col items-end">
                <div className="mb-4">
                  {product.originalPrice && (
                    <div className="price-original text-right">${product.originalPrice.toFixed(2)}</div>
                  )}
                  <div className={product.onSale ? "price price-discount text-right" : "price text-right"}>
                    ${product.price.toFixed(2)}
                  </div>
                </div>
                <div className="flex space-x-2">
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="h-9 w-9"
                    onClick={addToWishlist}
                  >
                    <Heart className="h-5 w-5" />
                  </Button>
                  <Button 
                    variant="default" 
                    size="sm"
                    className="btn-add-to-cart"
                    onClick={addToCart}
                  >
                    <ShoppingCart className="h-4 w-4 mr-1" />
                    Add to Cart
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Link>
      </Card>
    );
  }
};

export default ProductCard;
