
import React from "react";
import { Product } from "@/types";
import { toast } from "sonner";
import { useCart } from "@/contexts/CartContext";
import GridViewCard from "./card/GridViewCard";
import ListViewCard from "./card/ListViewCard";

interface ProductCardProps {
  product: Product;
  isGridView?: boolean;
}

const ProductCard: React.FC<ProductCardProps> = ({ 
  product, 
  isGridView = true 
}) => {
  const { addItem } = useCart();
  
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addItem(product, 1);
  };

  const handleAddToWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    toast.success(`${product.name} added to wishlist!`);
  };

  if (isGridView) {
    return (
      <GridViewCard 
        product={product} 
        onAddToCart={handleAddToCart}
        onAddToWishlist={handleAddToWishlist}
      />
    );
  } else {
    // List view
    return (
      <ListViewCard 
        product={product} 
        onAddToCart={handleAddToCart}
        onAddToWishlist={handleAddToWishlist}
      />
    );
  }
};

export default ProductCard;
