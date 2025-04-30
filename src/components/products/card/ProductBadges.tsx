
import React from "react";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

interface ProductBadgesProps {
  isNew?: boolean;
  onSale?: boolean;
  salePercentage?: number;
  stock: number;
  className?: string;
  position?: "top-left" | "top-right" | "bottom-left" | "bottom-right";
}

const ProductBadges: React.FC<ProductBadgesProps> = ({ 
  isNew, 
  onSale, 
  salePercentage, 
  stock,
  className,
  position = "top-left"
}) => {
  const positionClasses = {
    "top-left": "top-2 left-2",
    "top-right": "top-2 right-2",
    "bottom-left": "bottom-2 left-2",
    "bottom-right": "bottom-2 right-2"
  };

  return (
    <div className={cn("absolute flex flex-col gap-1", positionClasses[position], className)}>
      {onSale && salePercentage && (
        <Badge variant="destructive" className="text-xs font-semibold">
          {salePercentage}% OFF
        </Badge>
      )}
      {isNew && (
        <Badge variant="secondary" className="text-xs font-semibold bg-green-500 text-white">
          NEW
        </Badge>
      )}
      {stock <= 0 && (
        <Badge variant="outline" className="text-xs font-semibold bg-gray-600 text-white">
          OUT OF STOCK
        </Badge>
      )}
    </div>
  );
};

export default ProductBadges;
