import { supabase } from '@/lib/supabase';
import { Product, ProductVariant } from '@/types';

// Transform function
function transformProduct(
  dbProduct: any,
  images: any[] = [],
  variants: any[] = []
): Product {
  return {
    id: dbProduct.id,
    name: dbProduct.name,
    description: dbProduct.description,
    price: dbProduct.price,
    originalPrice: dbProduct.original_price || undefined,
    category: dbProduct.category,
    subcategory: dbProduct.subcategory || undefined,
    images: images.map((img) => img.image_url),
    variants: variants.map(
      (v) =>
        ({
          id: v.id,
          name: v.name,
          color: v.color || undefined,
          size: v.size || undefined,
          stock: v.stock,
          price: v.price,
        } as ProductVariant)
    ),
    tags: [], // Placeholder for tags
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

// Generalized bulk fetch function
async function fetchProductsByFilter(
  filter: Partial<Record<keyof Product, any>> = {}
): Promise<Product[]> {
  try {
    const { data: productsData, error: productsError } = await supabase
      .from('products')
      .select('*')
      .match(filter);

    if (productsError) throw productsError;
    if (!productsData || productsData.length === 0) return [];

    const productIds = productsData.map((p) => p.id);

    const [
      { data: imagesData, error: imagesError },
      { data: variantsData, error: variantsError },
    ] = await Promise.all([
      supabase
        .from('product_images')
        .select('*')
        .in('product_id', productIds)
        .order('display_order'),
      supabase
        .from('product_variants')
        .select('*')
        .in('product_id', productIds),
    ]);

    if (imagesError) throw imagesError;
    if (variantsError) throw variantsError;

    const imagesByProduct = new Map<number, any[]>();
    for (const image of imagesData || []) {
      const arr = imagesByProduct.get(image.product_id) || [];
      arr.push(image);
      imagesByProduct.set(image.product_id, arr);
    }

    const variantsByProduct = new Map<number, any[]>();
    for (const variant of variantsData || []) {
      const arr = variantsByProduct.get(variant.product_id) || [];
      arr.push(variant);
      variantsByProduct.set(variant.product_id, arr);
    }

    return productsData.map((p) =>
      transformProduct(
        p,
        imagesByProduct.get(p.id) || [],
        variantsByProduct.get(p.id) || []
      )
    );
  } catch (error) {
    console.error('Error fetching products:', error);
    throw error;
  }
}

// Specific product fetchers using the optimized function
export const fetchProducts = () => fetchProductsByFilter();
export const fetchFeaturedProducts = () =>
  fetchProductsByFilter({ is_featured: true });
export const fetchNewProducts = () => fetchProductsByFilter({ is_new: true });
export const fetchSaleProducts = () => fetchProductsByFilter({ on_sale: true });

// Fetch a single product by ID (no bulk optimization needed)
export async function fetchProductById(id: number): Promise<Product | null> {
  try {
    const { data: dbProduct, error } = await supabase
      .from('products')
      .select('*')
      .eq('id', id)
      .single();

    if (error) throw error;
    if (!dbProduct) return null;

    const [{ data: imagesData }, { data: variantsData }] = await Promise.all([
      supabase
        .from('product_images')
        .select('*')
        .eq('product_id', dbProduct.id)
        .order('display_order'),
      supabase
        .from('product_variants')
        .select('*')
        .eq('product_id', dbProduct.id),
    ]);

    return transformProduct(dbProduct, imagesData || [], variantsData || []);
  } catch (error) {
    console.error(`Error fetching product with ID ${id}:`, error);
    return null;
  }
}
