
import React, { useState } from "react";
import { FilterState } from "@/types";
import { brands, categories } from "@/data/mockData";
import { Slider } from "@/components/ui/slider";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";

interface ProductFilterProps {
  filters: FilterState;
  onFilterChange: (filters: FilterState) => void;
  onResetFilters: () => void;
  className?: string;
}

const ProductFilter: React.FC<ProductFilterProps> = ({
  filters,
  onFilterChange,
  onResetFilters,
  className = "",
}) => {
  const [priceRange, setPriceRange] = useState<[number, number]>([
    filters.minPrice || 0,
    filters.maxPrice || 2000,
  ]);
  const [selectedCategory, setSelectedCategory] = useState<string | null>(
    filters.category
  );
  const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(
    filters.subcategory
  );
  
  // Get subcategories for selected category
  const subcategories = 
    selectedCategory ?
    categories.find(cat => cat.name === selectedCategory)?.subcategories || []
    : [];

  // Update price range
  const handlePriceRangeChange = (values: number[]) => {
    const [min, max] = values;
    setPriceRange([min, max]);
    onFilterChange({
      ...filters,
      minPrice: min,
      maxPrice: max,
    });
  };

  // Handle category changes
  const handleCategoryChange = (category: string | null) => {
    const newCategory = category === selectedCategory ? null : category;
    setSelectedCategory(newCategory);
    setSelectedSubcategory(null);
    onFilterChange({
      ...filters,
      category: newCategory,
      subcategory: null,
    });
  };

  // Handle subcategory changes
  const handleSubcategoryChange = (subcategory: string | null) => {
    const newSubcategory = subcategory === selectedSubcategory ? null : subcategory;
    setSelectedSubcategory(newSubcategory);
    onFilterChange({
      ...filters,
      subcategory: newSubcategory,
    });
  };

  // Handle brand changes
  const handleBrandChange = (brand: string, isChecked: boolean) => {
    let updatedBrands = [...filters.brands];
    if (isChecked) {
      updatedBrands.push(brand);
    } else {
      updatedBrands = updatedBrands.filter(b => b !== brand);
    }
    onFilterChange({
      ...filters,
      brands: updatedBrands,
    });
  };

  // Handle stock filter
  const handleInStockChange = (isChecked: boolean) => {
    onFilterChange({
      ...filters,
      inStock: isChecked,
    });
  };

  // Handle rating filter
  const handleRatingChange = (rating: number) => {
    onFilterChange({
      ...filters,
      minRating: filters.minRating === rating ? null : rating,
    });
  };

  return (
    <div className={`filter-section ${className}`}>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-lg font-semibold">Filters</h2>
        <Button variant="ghost" size="sm" onClick={onResetFilters}>
          <X className="h-4 w-4 mr-1" />
          Reset All
        </Button>
      </div>

      <Accordion type="single" collapsible defaultValue="category" className="w-full">
        {/* Category Filter */}
        <AccordionItem value="category">
          <AccordionTrigger>Categories</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {categories.map((category) => (
                <div key={category.name} className="space-y-3">
                  <div className="flex items-center">
                    <Button
                      variant={selectedCategory === category.name ? "secondary" : "ghost"}
                      className="text-sm justify-start w-full"
                      onClick={() => handleCategoryChange(category.name)}
                    >
                      {category.name}
                    </Button>
                  </div>
                  
                  {/* Subcategories */}
                  {selectedCategory === category.name && (
                    <div className="ml-4 space-y-2 border-l-2 pl-4">
                      {category.subcategories.map((subcategory) => (
                        <div key={subcategory} className="flex items-center">
                          <Button
                            variant={selectedSubcategory === subcategory ? "secondary" : "ghost"}
                            className="text-sm justify-start w-full"
                            onClick={() => handleSubcategoryChange(subcategory)}
                            size="sm"
                          >
                            {subcategory}
                          </Button>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Price Range Filter */}
        <AccordionItem value="price">
          <AccordionTrigger>Price Range</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4 py-2">
              <Slider
                defaultValue={[priceRange[0], priceRange[1]]}
                min={0}
                max={2000}
                step={10}
                value={[priceRange[0], priceRange[1]]}
                onValueChange={handlePriceRangeChange}
              />
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <span className="text-sm text-muted-foreground mr-1">$</span>
                  <Input
                    type="number"
                    value={priceRange[0]}
                    onChange={(e) => 
                      handlePriceRangeChange([parseInt(e.target.value) || 0, priceRange[1]])
                    }
                    className="h-8 w-20"
                    min={0}
                    max={priceRange[1]}
                  />
                </div>
                <div>to</div>
                <div className="flex items-center">
                  <span className="text-sm text-muted-foreground mr-1">$</span>
                  <Input
                    type="number"
                    value={priceRange[1]}
                    onChange={(e) => 
                      handlePriceRangeChange([priceRange[0], parseInt(e.target.value) || priceRange[1]])
                    }
                    className="h-8 w-20"
                    min={priceRange[0]}
                  />
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Brand Filter */}
        <AccordionItem value="brand">
          <AccordionTrigger>Brands</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-3 max-h-64 overflow-y-auto">
              {brands.map((brand) => (
                <div key={brand.name} className="flex items-center space-x-2">
                  <Checkbox 
                    id={brand.name} 
                    checked={filters.brands.includes(brand.name)}
                    onCheckedChange={(checked) => 
                      handleBrandChange(brand.name, checked === true)
                    }
                  />
                  <label
                    htmlFor={brand.name}
                    className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {brand.name}
                  </label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Availability Filter */}
        <AccordionItem value="availability">
          <AccordionTrigger>Availability</AccordionTrigger>
          <AccordionContent>
            <div className="flex items-center space-x-2">
              <Checkbox 
                id="in-stock" 
                checked={filters.inStock}
                onCheckedChange={(checked) => 
                  handleInStockChange(checked === true)
                }
              />
              <label
                htmlFor="in-stock"
                className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                In Stock Only
              </label>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* Rating Filter */}
        <AccordionItem value="rating">
          <AccordionTrigger>Rating</AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {[4, 3, 2, 1].map((rating) => (
                <Button
                  key={rating}
                  variant={filters.minRating === rating ? "secondary" : "outline"}
                  size="sm"
                  className="mr-2 mb-2"
                  onClick={() => handleRatingChange(rating)}
                >
                  {rating}+ ★
                </Button>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

export default ProductFilter;
