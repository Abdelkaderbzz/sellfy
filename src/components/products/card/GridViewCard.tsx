
import React from "react";
import { Link } from "react-router-dom";
import { Product } from "@/types";
import { Button } from "@/components/ui/button";
import { Heart, ShoppingCart, Eye } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import ProductBadges from "./ProductBadges";
import ProductRating from "./ProductRating";
import QuickViewContent from "./QuickViewContent";
import { GridViewCardProps } from "./ProductCardInterface";

const GridViewCard: React.FC<GridViewCardProps> = ({
  product,
  onAddToCart,
  onAddToWishlist,
  isInWishlist,
}) => {
  return (
    <Card className="product-card h-full transition-all duration-300 hover:-translate-y-1">
      <Link to={`/product/${product.id}`}>
        <div className="relative aspect-square overflow-hidden">
          <img
            src={product.images[0]}
            alt={product.name}
            className="h-full w-full object-cover object-center transition-transform duration-300 hover:scale-105"
          />
          <div className="absolute top-0 right-0 flex flex-col gap-2 p-2">
            <Dialog>
              <DialogTrigger asChild>
                <Button
                  variant="secondary"
                  size="icon"
                  className="h-8 w-8 rounded-full bg-white hover:bg-gray-100 text-gray-800"
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                  }}
                >
                  <Eye className="h-4 w-4" />
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-5xl">
                <QuickViewContent 
                  product={product} 
                  onAddToCart={onAddToCart} 
                  onAddToWishlist={onAddToWishlist}
                />
              </DialogContent>
            </Dialog>
            
            <Button
              variant="secondary"
              size="icon"
              className={`h-8 w-8 rounded-full bg-white hover:bg-gray-100 ${isInWishlist ? "text-red-500" : "text-gray-800"}`}
              onClick={onAddToWishlist}
            >
              <Heart className={`h-4 w-4 ${isInWishlist ? "fill-current" : ""}`} />
            </Button>
            
            <Button
              variant="secondary"
              size="icon"
              className="h-8 w-8 rounded-full bg-white hover:bg-gray-100 text-gray-800"
              onClick={onAddToCart}
            >
              <ShoppingCart className="h-4 w-4" />
            </Button>
          </div>
          
          <ProductBadges 
            isNew={product.isNew} 
            onSale={product.onSale} 
            salePercentage={product.salePercentage} 
            stock={product.stock} 
          />
        </div>
        <CardContent className="p-4">
          <div className="mb-1 text-sm text-muted-foreground">
            {product.brand}
          </div>
          <h3 className="mb-2 text-base font-medium line-clamp-2">{product.name}</h3>
          <ProductRating 
            rating={product.rating} 
            reviewCount={product.reviewCount} 
          />
          <div className="mt-2 flex items-center">
            {product.originalPrice && (
              <span className="price-original text-sm text-muted-foreground line-through mr-2">${product.originalPrice.toFixed(2)}</span>
            )}
            <span className={product.onSale ? "price price-discount font-medium" : "price font-medium"}>
              ${product.price.toFixed(2)}
            </span>
            {product.onSale && (
              <span className="ml-2 text-xs px-1.5 py-0.5 bg-red-100 text-red-600 rounded">
                Save {product.salePercentage}%
              </span>
            )}
          </div>
          
          {product.stock < 10 && product.stock > 0 && (
            <div className="mt-2 text-xs text-amber-600">
              Only {product.stock} left in stock
            </div>
          )}
          {product.stock === 0 && (
            <div className="mt-2 text-xs text-red-600">
              Out of stock
            </div>
          )}
          
          {product.tags && product.tags.length > 0 && (
            <div className="mt-2 flex flex-wrap gap-1">
              {product.tags.slice(0, 2).map((tag, index) => (
                <span key={index} className="text-xs px-1.5 py-0.5 bg-gray-100 text-gray-600 rounded">
                  {tag}
                </span>
              ))}
            </div>
          )}
        </CardContent>
      </Link>
    </Card>
  );
};

export default GridViewCard;
