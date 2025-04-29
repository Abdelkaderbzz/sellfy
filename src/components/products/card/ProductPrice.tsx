
import React from "react";

interface ProductPriceProps {
  price: number;
  originalPrice?: number;
  onSale?: boolean;
  size?: "sm" | "md" | "lg";
}

const ProductPrice: React.FC<ProductPriceProps> = ({ 
  price, 
  originalPrice, 
  onSale = false,
  size = "sm"
}) => {
  const textSizeClass = size === "sm" ? "" : size === "md" ? "text-xl" : "text-2xl";
  
  return (
    <div className="flex items-center">
      {originalPrice && (
        <span className="price-original">${originalPrice.toFixed(2)}</span>
      )}
      <span className={`${onSale ? "price price-discount" : "price"} ${textSizeClass}`}>
        ${price.toFixed(2)}
      </span>
    </div>
  );
};

export default ProductPrice;
