
import React from "react";
import { Badge } from "@/components/ui/badge";

interface ProductBadgesProps {
  isNew?: boolean;
  onSale?: boolean;
  salePercentage?: number;
  stock: number;
}

const ProductBadges: React.FC<ProductBadgesProps> = ({ 
  isNew, 
  onSale, 
  salePercentage, 
  stock 
}) => {
  return (
    <div className="absolute top-2 left-2 flex flex-col gap-1">
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
