
import { supabase } from "@/lib/supabase";
import { Product, ProductVariant } from "@/types";

// Transform the data from Supabase format to our app's format
function transformProduct(dbProduct: any, images: any[] = [], variants: any[] = []): Product {
  return {
    id: dbProduct.id,
    name: dbProduct.name,
    description: dbProduct.description,
    price: dbProduct.price,
    originalPrice: dbProduct.original_price || undefined,
    category: dbProduct.category,
    subcategory: dbProduct.subcategory || undefined,
    images: images.map(img => img.image_url),
    variants: variants.map(v => ({
      id: v.id,
      name: v.name,
      color: v.color || undefined,
      size: v.size || undefined,
      stock: v.stock,
      price: v.price,
    } as ProductVariant)),
    tags: [], // We'll need to implement tags separately
    rating: dbProduct.rating,
    reviewCount: dbProduct.review_count,
    stock: dbProduct.stock,
    isNew: dbProduct.is_new || false,
    isFeatured: dbProduct.is_featured || false,
    onSale: dbProduct.on_sale || false,
    salePercentage: dbProduct.sale_percentage || undefined,
    brand: dbProduct.brand,
    sku: dbProduct.sku,
  };
}

// Fetch all products
export async function fetchProducts(): Promise<Product[]> {
  try {
    const { data: productsData, error: productsError } = await supabase
      .from('products')
      .select('*');

    if (productsError) throw productsError;
    
    const products: Product[] = [];
    
    for (const dbProduct of productsData) {
      // Get images for this product
      const { data: imagesData } = await supabase
        .from('product_images')
        .select('*')
        .eq('product_id', dbProduct.id)
        .order('display_order');
      
      // Get variants for this product
      const { data: variantsData } = await supabase
        .from('product_variants')
        .select('*')
        .eq('product_id', dbProduct.id);
      
      products.push(transformProduct(dbProduct, imagesData || [], variantsData || []));
    }
    
    return products;
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
}

// Fetch featured products
export async function fetchFeaturedProducts(): Promise<Product[]> {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('is_featured', true);
    
    if (error) throw error;
    
    const products: Product[] = [];
    
    for (const dbProduct of data) {
      // Get images for this product
      const { data: imagesData } = await supabase
        .from('product_images')
        .select('*')
        .eq('product_id', dbProduct.id)
        .order('display_order');
      
      // Get variants for this product
      const { data: variantsData } = await supabase
        .from('product_variants')
        .select('*')
        .eq('product_id', dbProduct.id);
      
      products.push(transformProduct(dbProduct, imagesData || [], variantsData || []));
    }
    
    return products;
  } catch (error) {
    console.error("Error fetching featured products:", error);
    throw error;
  }
}

// Fetch new arrival products
export async function fetchNewProducts(): Promise<Product[]> {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('is_new', true);
    
    if (error) throw error;
    
    const products: Product[] = [];
    
    for (const dbProduct of data) {
      // Get images for this product
      const { data: imagesData } = await supabase
        .from('product_images')
        .select('*')
        .eq('product_id', dbProduct.id)
        .order('display_order');
      
      // Get variants for this product
      const { data: variantsData } = await supabase
        .from('product_variants')
        .select('*')
        .eq('product_id', dbProduct.id);
      
      products.push(transformProduct(dbProduct, imagesData || [], variantsData || []));
    }
    
    return products;
  } catch (error) {
    console.error("Error fetching new products:", error);
    throw error;
  }
}

// Fetch on sale products
export async function fetchSaleProducts(): Promise<Product[]> {
  try {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('on_sale', true);
    
    if (error) throw error;
    
    const products: Product[] = [];
    
    for (const dbProduct of data) {
      // Get images for this product
      const { data: imagesData } = await supabase
        .from('product_images')
        .select('*')
        .eq('product_id', dbProduct.id)
        .order('display_order');
      
      // Get variants for this product
      const { data: variantsData } = await supabase
        .from('product_variants')
        .select('*')
        .eq('product_id', dbProduct.id);
      
      products.push(transformProduct(dbProduct, imagesData || [], variantsData || []));
    }
    
    return products;
  } catch (error) {
    console.error("Error fetching sale products:", error);
    throw error;
  }
}

// Fetch a single product by ID
export async function fetchProductById(id: number): Promise<Product | null> {
  try {
    const { data: dbProduct, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .single();
    
    if (error) throw error;
    if (!dbProduct) return null;
    
    // Get images for this product
    const { data: imagesData } = await supabase
      .from('product_images')
      .select('*')
      .eq('product_id', dbProduct.id)
      .order('display_order');
    
    // Get variants for this product
    const { data: variantsData } = await supabase
      .from('product_variants')
      .select('*')
      .eq('product_id', dbProduct.id);
    
    return transformProduct(dbProduct, imagesData || [], variantsData || []);
  } catch (error) {
    console.error(`Error fetching product with ID ${id}:`, error);
    return null;
  }
}
