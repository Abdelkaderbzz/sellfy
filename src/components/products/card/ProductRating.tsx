
import React from "react";
import { Star, StarHalf } from "lucide-react";

interface ProductRatingProps {
  rating: number;
  reviewCount?: number;
  showCount?: boolean;
  size?: "sm" | "md" | "lg";
}

const ProductRating: React.FC<ProductRatingProps> = ({ 
  rating, 
  reviewCount, 
  showCount = true,
  size = "sm" 
}) => {
  const renderRating = (rating: number) => {
    const stars = [];
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 >= 0.5;
    
    for (let i = 0; i < fullStars; i++) {
      stars.push(
        <Star 
          key={`full-${i}`} 
          className={`fill-yellow-400 text-yellow-400 ${size === "sm" ? "w-4 h-4" : size === "md" ? "w-5 h-5" : "w-6 h-6"}`} 
        />
      );
    }
    
    if (hasHalfStar) {
      stars.push(
        <StarHalf 
          key="half" 
          className={`fill-yellow-400 text-yellow-400 ${size === "sm" ? "w-4 h-4" : size === "md" ? "w-5 h-5" : "w-6 h-6"}`} 
        />
      );
    }
    
    return stars;
  };

  return (
    <div className="flex items-center">
      <div className="star-rating mr-2 flex">
        {renderRating(rating)}
      </div>
      {showCount && reviewCount !== undefined && (
        <span className="text-xs text-muted-foreground">
          ({reviewCount})
        </span>
      )}
    </div>
  );
};

export default ProductRating;
