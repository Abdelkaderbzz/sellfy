
import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { X, Search, Loader2 } from "lucide-react";
import { products } from "@/data/mockData";
import { Product } from "@/types";

interface SearchBarProps {
  isExpanded?: boolean;
  onClose?: () => void;
  className?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ 
  isExpanded = false, 
  onClose,
  className = "" 
}) => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const navigate = useNavigate();
  const resultsRef = useRef<HTMLDivElement>(null);

  // Focus input when expanded
  useEffect(() => {
    if (isExpanded && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isExpanded]);

  // Handle search
  useEffect(() => {
    if (!query.trim()) {
      setResults([]);
      return;
    }

    setIsLoading(true);
    
    // Simulate API call with a small delay
    const timer = setTimeout(() => {
      const filtered = products.filter(product => 
        product.name.toLowerCase().includes(query.toLowerCase()) || 
        product.description.toLowerCase().includes(query.toLowerCase()) ||
        product.brand.toLowerCase().includes(query.toLowerCase()) ||
        product.tags.some(tag => tag.toLowerCase().includes(query.toLowerCase()))
      );
      setResults(filtered.slice(0, 5)); // Limit to 5 results
      setIsLoading(false);
    }, 300);

    return () => clearTimeout(timer);
  }, [query]);

  // Close results when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        resultsRef.current && 
        !resultsRef.current.contains(event.target as Node) &&
        inputRef.current &&
        !inputRef.current.contains(event.target as Node)
      ) {
        setIsFocused(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    
    navigate(`/products?search=${encodeURIComponent(query)}`);
    setIsFocused(false);
    if (onClose) onClose();
  };

  const handleResultClick = (productId: number) => {
    navigate(`/product/${productId}`);
    setIsFocused(false);
    if (onClose) onClose();
  };

  return (
    <div className={`relative ${className}`}>
      <form onSubmit={handleSearch} className="flex items-center w-full">
        <Input
          ref={inputRef}
          type="search"
          placeholder="Search products..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          className="rounded-r-none"
          autoComplete="off"
        />
        {query && (
          <Button 
            type="button" 
            variant="ghost" 
            size="icon" 
            className="border-y border-input h-10 px-2 hover:bg-transparent" 
            onClick={() => setQuery("")}
          >
            <X className="h-4 w-4" />
            <span className="sr-only">Clear search</span>
          </Button>
        )}
        <Button type="submit" className="rounded-l-none">
          {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
          <span className="sr-only">Search</span>
        </Button>
      </form>

      {isFocused && (results.length > 0 || isLoading) && (
        <div 
          ref={resultsRef}
          className="absolute z-50 top-full left-0 right-0 mt-1 bg-background border rounded-md shadow-lg overflow-hidden"
        >
          {isLoading ? (
            <div className="p-4 text-center">
              <Loader2 className="h-5 w-5 animate-spin mx-auto text-muted-foreground" />
            </div>
          ) : (
            <>
              <ul className="divide-y">
                {results.map((product) => (
                  <li key={product.id}>
                    <button
                      className="w-full text-left p-3 hover:bg-muted flex items-center gap-3 transition-colors"
                      onClick={() => handleResultClick(product.id)}
                    >
                      <div className="h-10 w-10 bg-muted rounded overflow-hidden flex-shrink-0">
                        <img 
                          src={product.images[0]} 
                          alt={product.name} 
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="font-medium truncate">{product.name}</p>
                        <p className="text-sm text-muted-foreground truncate">{product.brand}</p>
                      </div>
                      <div className="font-medium">
                        ${product.price.toFixed(2)}
                      </div>
                    </button>
                  </li>
                ))}
              </ul>
              <div className="p-2 border-t bg-muted/50">
                <Button 
                  variant="ghost" 
                  className="w-full justify-center text-sm h-8"
                  onClick={() => {
                    navigate(`/products?search=${encodeURIComponent(query)}`);
                    setIsFocused(false);
                    if (onClose) onClose();
                  }}
                >
                  View all results
                </Button>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;
