
import React, { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import ProductCard from "@/components/products/ProductCard";
import ProductFilter from "@/components/products/ProductFilter";
import ProductSort from "@/components/products/ProductSort";
import SearchBar from "@/components/search/SearchBar";
import { fetchProducts } from "@/services/productService";
import { Product, FilterState, SortOption } from "@/types";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button } from "@/components/ui/button";
import {
  FilterIcon,
  X
} from "lucide-react";
import { toast } from "sonner";

const defaultFilters: FilterState = {
  category: null,
  subcategory: null,
  minPrice: null,
  maxPrice: null,
  brands: [],
  colors: [],
  sizes: [],
  tags: [],
  inStock: false,
  minRating: null,
  sortBy: "relevance",
  view: "grid",
};

const ProductsPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [allProducts, setAllProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [filters, setFilters] = useState<FilterState>(defaultFilters);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // Load all products from Supabase or fallback to mock data
  useEffect(() => {
    async function loadProducts() {
      setIsLoading(true);
      try {
        // Try to fetch from Supabase
        const products = await fetchProducts();
        setAllProducts(products);
      } catch (error) {
        console.error("Failed to fetch from Supabase:", error);
        
        // Fall back to mock data
        const { products: mockProducts } = await import('@/data/mockData');
        setAllProducts(mockProducts);
        
        toast.error("Failed to fetch products from database. Using local data instead.");
      } finally {
        setIsLoading(false);
      }
    }
    
    loadProducts();
  }, []);

  // Initialize filters from URL params
  useEffect(() => {
    const urlCategory = searchParams.get("category");
    const urlSubcategory = searchParams.get("subcategory");
    const urlMinPrice = searchParams.get("minPrice");
    const urlMaxPrice = searchParams.get("maxPrice");
    const urlBrands = searchParams.get("brands")?.split(",") || [];
    const urlInStock = searchParams.get("inStock") === "true";
    const urlMinRating = searchParams.get("minRating");
    const urlSortBy = searchParams.get("sortBy") as SortOption || "relevance";
    const urlView = (searchParams.get("view") as "grid" | "list") || "grid";
    const urlSearch = searchParams.get("search") || "";
    
    setFilters({
      ...defaultFilters,
      category: urlCategory,
      subcategory: urlSubcategory,
      minPrice: urlMinPrice ? parseInt(urlMinPrice) : null,
      maxPrice: urlMaxPrice ? parseInt(urlMaxPrice) : null,
      brands: urlBrands,
      inStock: urlInStock,
      minRating: urlMinRating ? parseInt(urlMinRating) : null,
      sortBy: urlSortBy,
      view: urlView,
    });

    setSearchQuery(urlSearch);
  }, [searchParams]);

  // Apply filters and sorting
  useEffect(() => {
    if (allProducts.length === 0) return;
    
    let result = [...allProducts];
    
    // Filter by search query
    if (searchQuery) {
      result = result.filter(product => 
        product.name.toLowerCase().includes(searchQuery.toLowerCase()) || 
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.brand.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()))
      );
    }
    
    // Filter by category
    if (filters.category) {
      result = result.filter(product => product.category.toLowerCase() === filters.category?.toLowerCase());
    }
    
    // Filter by subcategory
    if (filters.subcategory) {
      result = result.filter(product => product.subcategory?.toLowerCase() === filters.subcategory?.toLowerCase());
    }
    
    // Filter by price
    if (filters.minPrice !== null) {
      result = result.filter(product => product.price >= filters.minPrice!);
    }
    if (filters.maxPrice !== null) {
      result = result.filter(product => product.price <= filters.maxPrice!);
    }
    
    // Filter by brand
    if (filters.brands.length > 0) {
      result = result.filter(product => filters.brands.includes(product.brand));
    }
    
    // Filter by stock
    if (filters.inStock) {
      result = result.filter(product => product.stock > 0);
    }
    
    // Filter by rating
    if (filters.minRating !== null) {
      result = result.filter(product => product.rating >= filters.minRating!);
    }
    
    // Apply sorting
    switch (filters.sortBy) {
      case "price-asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "newest":
        result = result.filter(product => product.isNew).concat(
          result.filter(product => !product.isNew)
        );
        break;
      case "best-selling":
        result.sort((a, b) => b.reviewCount - a.reviewCount);
        break;
      default:
        // relevance - no specific sort
        break;
    }
    
    setFilteredProducts(result);
    
    // Update URL parameters
    const params = new URLSearchParams();
    
    if (searchQuery) params.set("search", searchQuery);
    if (filters.category) params.set("category", filters.category);
    if (filters.subcategory) params.set("subcategory", filters.subcategory);
    if (filters.minPrice !== null) params.set("minPrice", filters.minPrice.toString());
    if (filters.maxPrice !== null) params.set("maxPrice", filters.maxPrice.toString());
    if (filters.brands.length > 0) params.set("brands", filters.brands.join(","));
    if (filters.inStock) params.set("inStock", "true");
    if (filters.minRating !== null) params.set("minRating", filters.minRating.toString());
    if (filters.sortBy !== "relevance") params.set("sortBy", filters.sortBy);
    if (filters.view !== "grid") params.set("view", filters.view);
    
    setSearchParams(params);
  }, [filters, searchQuery, allProducts, setSearchParams]);

  const handleFilterChange = (newFilters: FilterState) => {
    setFilters(newFilters);
  };

  const handleSortChange = (sortBy: SortOption) => {
    setFilters({
      ...filters,
      sortBy,
    });
  };

  const handleViewChange = (view: "grid" | "list") => {
    setFilters({
      ...filters,
      view,
    });
  };

  const resetFilters = () => {
    setFilters({
      ...defaultFilters,
      sortBy: filters.sortBy,
      view: filters.view,
    });
    setSearchQuery("");
  };

  const getFilteredCount = () => {
    const hasActiveFilters = 
      filters.category !== null ||
      filters.subcategory !== null ||
      filters.minPrice !== null ||
      filters.maxPrice !== null ||
      filters.brands.length > 0 ||
      filters.inStock ||
      filters.minRating !== null ||
      searchQuery !== "";
      
    return hasActiveFilters;
  };

  return (
    <Layout>
      <div className="container py-8">
        <h1 className="text-3xl font-bold mb-4">Products</h1>
        
        {/* Search Bar */}
        <div className="mb-6">
          <SearchBar 
            className="max-w-xl" 
            isExpanded={true} 
          />
        </div>
        
        <div className="flex flex-col md:flex-row gap-8">
          {/* Filters for Desktop */}
          <div className="hidden md:block w-64 flex-shrink-0">
            <ProductFilter
              filters={filters}
              onFilterChange={handleFilterChange}
              onResetFilters={resetFilters}
            />
          </div>
          
          {/* Mobile Filter Button */}
          <div className="md:hidden mb-4">
            <Sheet open={isFilterOpen} onOpenChange={setIsFilterOpen}>
              <SheetTrigger asChild>
                <Button variant="outline" className="flex items-center gap-2 w-full mb-4">
                  <FilterIcon className="h-4 w-4" />
                  Filter Products
                  {getFilteredCount() && (
                    <span className="ml-auto bg-primary text-primary-foreground text-xs rounded-full h-5 w-5 flex items-center justify-center">
                      !
                    </span>
                  )}
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-full sm:w-[340px]">
                <div className="flex justify-between items-center mb-4">
                  <h2 className="text-lg font-semibold">Filters</h2>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsFilterOpen(false)}
                  >
                    <X className="h-5 w-5" />
                  </Button>
                </div>
                <ProductFilter
                  filters={filters}
                  onFilterChange={(newFilters) => {
                    handleFilterChange(newFilters);
                  }}
                  onResetFilters={resetFilters}
                />
              </SheetContent>
            </Sheet>
          </div>

          {/* Products list */}
          <div className="flex-1">
            <div className="mb-6">
              <ProductSort
                sortBy={filters.sortBy}
                onSortChange={handleSortChange}
                view={filters.view}
                onViewChange={handleViewChange}
              />
            </div>
            
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
                  <div key={i} className="bg-white rounded-lg shadow-md p-4 animate-pulse">
                    <div className="w-full h-48 bg-gray-200 rounded-md mb-4"></div>
                    <div className="h-6 bg-gray-200 rounded mb-2 w-3/4"></div>
                    <div className="h-4 bg-gray-200 rounded mb-4 w-1/2"></div>
                    <div className="h-10 bg-gray-200 rounded"></div>
                  </div>
                ))}
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="text-center py-12">
                <h2 className="text-xl font-medium mb-2">No products found</h2>
                <p className="text-muted-foreground mb-4">Try adjusting your filter criteria or browse our popular collections.</p>
                <Button onClick={resetFilters}>Reset Filters</Button>
              </div>
            ) : (
              <div className={filters.view === "grid" ? "product-grid" : "product-list"}>
                {filteredProducts.map((product) => (
                  <ProductCard 
                    key={product.id} 
                    product={product} 
                    isGridView={filters.view === "grid"}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductsPage;
