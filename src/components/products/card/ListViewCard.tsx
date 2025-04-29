
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

interface ListViewCardProps {
  product: Product;
  onAddToCart: (e: React.MouseEvent) => void;
  onAddToWishlist: (e: React.MouseEvent) => void;
}

const ListViewCard: React.FC<ListViewCardProps> = ({
  product,
  onAddToCart,
  onAddToWishlist,
}) => {
  return (
    <Card className="product-card transition-all duration-300 hover:shadow-md">
      <Link to={`/product/${product.id}`} className="flex">
        <div className="relative h-40 w-40 flex-shrink-0 overflow-hidden">
          <img
            src={product.images[0]}
            alt={product.name}
            className="h-full w-full object-cover object-center transition-transform duration-300 hover:scale-105"
          />
          <ProductBadges 
            isNew={product.isNew} 
            onSale={product.onSale} 
            salePercentage={product.salePercentage} 
            stock={product.stock} 
          />
        </div>
        <CardContent className="flex-1 p-4">
          <div className="flex justify-between">
            <div>
              <div className="mb-1 text-sm text-muted-foreground">
                {product.brand}
              </div>
              <h3 className="mb-2 text-lg font-medium">{product.name}</h3>
              <ProductRating 
                rating={product.rating} 
                reviewCount={product.reviewCount} 
              />
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
                <Dialog>
                  <DialogTrigger asChild>
                    <Button
                      variant="outline"
                      size="sm"
                      className="h-9"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                      }}
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      Quick View
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
                  variant="outline" 
                  size="icon" 
                  className="h-9 w-9"
                  onClick={onAddToWishlist}
                >
                  <Heart className="h-5 w-5" />
                </Button>
                
                <Button 
                  variant="default" 
                  size="sm"
                  className="btn-add-to-cart"
                  onClick={onAddToCart}
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
};

export default ListViewCard;
