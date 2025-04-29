
// Product Types
export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  originalPrice?: number;
  category: string;
  subcategory?: string;
  images: string[];
  variants?: ProductVariant[];
  tags: string[];
  rating: number;
  reviewCount: number;
  stock: number;
  isNew?: boolean;
  isFeatured?: boolean;
  onSale?: boolean;
  salePercentage?: number;
  brand: string;
  sku: string;
}

export interface ProductVariant {
  id: number;
  name: string;
  color?: string;
  size?: string;
  stock: number;
  price: number;
  images?: string[];
}

// Filter Types
export interface FilterState {
  category: string | null;
  subcategory: string | null;
  minPrice: number | null;
  maxPrice: number | null;
  brands: string[];
  colors: string[];
  sizes: string[];
  tags: string[];
  inStock: boolean;
  minRating: number | null;
  sortBy: SortOption;
  view: "grid" | "list";
}

export type SortOption = 
  | "relevance" 
  | "price-asc" 
  | "price-desc" 
  | "rating" 
  | "newest" 
  | "best-selling";

// Cart Types
export interface CartItem {
  productId: number;
  variantId?: number;
  quantity: number;
  price: number;
  name: string;
  image: string;
  color?: string;
  size?: string;
}

export interface Cart {
  items: CartItem[];
  subtotal: number;
  shipping: number;
  tax: number;
  total: number;
}

// Search Types
export interface SearchResult {
  products: Product[];
  categories: string[];
  suggestions: string[];
}
