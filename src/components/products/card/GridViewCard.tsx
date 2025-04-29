
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

interface GridViewCardProps {
  product: Product;
  onAddToCart: (e: React.MouseEvent) => void;
  onAddToWishlist: (e: React.MouseEvent) => void;
}

const GridViewCard: React.FC<GridViewCardProps> = ({
  product,
  onAddToCart,
  onAddToWishlist,
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
              className="h-8 w-8 rounded-full bg-white hover:bg-gray-100 text-gray-800"
              onClick={onAddToWishlist}
            >
              <Heart className="h-4 w-4" />
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
};

export default GridViewCard;
