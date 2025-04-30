
import { Product } from "@/types";

export interface ProductCardProps {
  product: Product;
  onAddToCart: (e: React.MouseEvent) => void;
  onAddToWishlist: (e: React.MouseEvent) => void;
  isInWishlist: boolean;
}
