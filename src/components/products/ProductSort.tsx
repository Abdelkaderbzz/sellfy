
import React from "react";
import { SortOption } from "@/types";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { LayoutGrid, List } from "lucide-react";

interface ProductSortProps {
  sortBy: SortOption;
  onSortChange: (sortBy: SortOption) => void;
  view: "grid" | "list";
  onViewChange: (view: "grid" | "list") => void;
}

const ProductSort: React.FC<ProductSortProps> = ({
  sortBy,
  onSortChange,
  view,
  onViewChange,
}) => {
  return (
    <div className="flex justify-between items-center w-full">
      <div className="flex items-center space-x-2">
        <span className="text-sm text-muted-foreground hidden sm:inline">Sort by:</span>
        <Select value={sortBy} onValueChange={(value) => onSortChange(value as SortOption)}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="relevance">Relevance</SelectItem>
            <SelectItem value="price-asc">Price: Low to High</SelectItem>
            <SelectItem value="price-desc">Price: High to Low</SelectItem>
            <SelectItem value="rating">Highest Rated</SelectItem>
            <SelectItem value="newest">Newest Arrivals</SelectItem>
            <SelectItem value="best-selling">Best Selling</SelectItem>
          </SelectContent>
        </Select>
      </div>
      <div className="flex items-center space-x-2">
        <Button
          variant={view === "grid" ? "default" : "outline"}
          size="icon"
          onClick={() => onViewChange("grid")}
          className="h-9 w-9"
          aria-label="Grid View"
        >
          <LayoutGrid className="h-4 w-4" />
        </Button>
        <Button
          variant={view === "list" ? "default" : "outline"}
          size="icon"
          onClick={() => onViewChange("list")}
          className="h-9 w-9"
          aria-label="List View"
        >
          <List className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default ProductSort;
