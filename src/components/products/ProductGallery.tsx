
import React, { useState } from "react";

interface ProductGalleryProps {
  images: string[];
  productName: string;
}

const ProductGallery: React.FC<ProductGalleryProps> = ({ images, productName }) => {
  const [mainImage, setMainImage] = useState<string>(images[0]);
  
  return (
    <div className="flex flex-col space-y-4">
      <div className="relative aspect-square overflow-hidden rounded-lg border bg-white">
        <img
          src={mainImage}
          alt={productName}
          className="h-full w-full object-cover object-center"
        />
      </div>
      {images.length > 1 && (
        <div className="flex space-x-2 overflow-auto pb-2">
          {images.map((image, index) => (
            <button
              key={index}
              className={`relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border ${
                mainImage === image ? "ring-2 ring-primary" : ""
              }`}
              onClick={() => setMainImage(image)}
            >
              <img
                src={image}
                alt={`${productName} thumbnail ${index + 1}`}
                className="h-full w-full object-cover object-center"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default ProductGallery;
