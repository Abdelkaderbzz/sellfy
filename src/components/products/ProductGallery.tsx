
import React, { useState } from "react";
import { 
  Dialog,
  DialogContent,
  DialogTrigger,
} from "@/components/ui/dialog";
import { ZoomIn, ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

interface ProductGalleryProps {
  images: string[];
  productName: string;
}

const ProductGallery: React.FC<ProductGalleryProps> = ({ images, productName }) => {
  const [mainImage, setMainImage] = useState<string>(images[0]);
  const [zoomedImage, setZoomedImage] = useState<string>(images[0]);
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  
  const handleThumbnailClick = (image: string, index: number) => {
    setMainImage(image);
    setCurrentIndex(index);
  };

  const handleZoom = (image: string) => {
    setZoomedImage(image);
  };

  const navigateImage = (direction: 'prev' | 'next') => {
    let newIndex = direction === 'prev' 
      ? (currentIndex > 0 ? currentIndex - 1 : images.length - 1)
      : (currentIndex < images.length - 1 ? currentIndex + 1 : 0);
      
    setMainImage(images[newIndex]);
    setZoomedImage(images[newIndex]);
    setCurrentIndex(newIndex);
  };
  
  return (
    <div className="flex flex-col space-y-4">
      <div className="relative aspect-square overflow-hidden rounded-lg border bg-white group">
        <img
          src={mainImage}
          alt={productName}
          className="h-full w-full object-cover object-center transition-transform duration-300 group-hover:scale-105"
        />
        <Dialog>
          <DialogTrigger asChild>
            <button 
              onClick={() => handleZoom(mainImage)}
              className="absolute bottom-4 right-4 bg-white/80 hover:bg-white p-2 rounded-full shadow-md opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              aria-label="Zoom image"
            >
              <ZoomIn className="h-5 w-5" />
            </button>
          </DialogTrigger>
          <DialogContent className="max-w-4xl p-0 bg-transparent border-none">
            <div className="relative bg-black/90 p-4 rounded-lg">
              <img
                src={zoomedImage}
                alt={`${productName} enlarged view`}
                className="max-h-[80vh] w-auto mx-auto"
              />
              {images.length > 1 && (
                <>
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full"
                    onClick={() => navigateImage('prev')}
                  >
                    <ChevronLeft className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="outline" 
                    size="icon" 
                    className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white rounded-full"
                    onClick={() => navigateImage('next')}
                  >
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </>
              )}
            </div>
          </DialogContent>
        </Dialog>
      </div>
      {images.length > 1 && (
        <div className="flex space-x-2 overflow-auto pb-2">
          {images.map((image, index) => (
            <button
              key={index}
              className={`relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-md border transition-all hover:opacity-100 ${
                mainImage === image ? "ring-2 ring-primary opacity-100" : "opacity-60"
              }`}
              onClick={() => handleThumbnailClick(image, index)}
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
