
import React from "react";
import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface Brand {
  name: string;
  logo: string;
  slug: string;
  productCount?: number;
}

interface BrandSectionProps {
  brands: Brand[];
  title?: string;
  description?: string;
  className?: string;
  compact?: boolean;
}

const BrandSection: React.FC<BrandSectionProps> = ({
  brands,
  title = "Shop by Brand",
  description,
  className,
  compact = false
}) => {
  if (brands.length === 0) return null;

  return (
    <section className={cn("py-12 bg-background", className)}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="text-2xl md:text-3xl font-bold">{title}</h2>
          {description && (
            <p className="mt-2 text-muted-foreground max-w-2xl mx-auto">{description}</p>
          )}
        </div>

        <div className={cn(
          "grid gap-4", 
          compact 
            ? "grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6" 
            : "grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5"
        )}>
          {brands.map((brand) => (
            <Link 
              key={brand.slug}
              to={`/products?brand=${encodeURIComponent(brand.slug)}`}
              className="group"
            >
              <Card className={cn(
                "overflow-hidden transition-all hover:shadow-md h-full", 
                compact ? "border-none shadow-sm" : ""
              )}>
                <CardContent className={cn(
                  "flex flex-col items-center justify-center",
                  compact ? "p-2 md:p-4" : "p-4 md:p-6"
                )}>
                  <div className={cn(
                    "p-4 rounded-lg flex items-center justify-center mb-2",
                    compact ? "mb-0" : ""
                  )}>
                    <img 
                      src={brand.logo} 
                      alt={brand.name} 
                      className={cn(
                        "object-contain transition-transform group-hover:scale-105",
                        compact ? "h-8 md:h-12" : "h-12 md:h-16" 
                      )}
                    />
                  </div>
                  
                  {!compact && (
                    <div className="text-center mt-2">
                      <h3 className="font-medium text-sm md:text-base">{brand.name}</h3>
                      {brand.productCount !== undefined && (
                        <p className="text-xs text-muted-foreground mt-1">
                          {brand.productCount} {brand.productCount === 1 ? 'product' : 'products'}
                        </p>
                      )}
                    </div>
                  )}
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default BrandSection;
