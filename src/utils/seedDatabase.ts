
import { supabase } from "@/lib/supabase";
import { products } from "@/data/mockData";

export async function seedProducts() {
  try {
    console.log("Starting to seed products...");
    
    // For each product in our mock data
    for (const product of products) {
      // Insert the product
      const { data: productData, error: productError } = await supabase
        .from('products')
        .insert({
          name: product.name,
          description: product.description,
          price: product.price,
          original_price: product.originalPrice || null,
          category: product.category,
          subcategory: product.subcategory || null,
          brand: product.brand,
          sku: product.sku,
          stock: product.stock,
          is_new: product.isNew || null,
          is_featured: product.isFeatured || null,
          on_sale: product.onSale || null,
          sale_percentage: product.salePercentage || null,
          rating: product.rating,
          review_count: product.reviewCount,
        })
        .select('id')
        .single();

      if (productError) {
        console.error(`Error inserting product ${product.name}:`, productError);
        continue;
      }

      const productId = productData.id;
      console.log(`Inserted product ${product.name} with ID: ${productId}`);

      // Insert product images
      if (product.images && product.images.length > 0) {
        for (let i = 0; i < product.images.length; i++) {
          const { error: imageError } = await supabase
            .from('product_images')
            .insert({
              product_id: productId,
              image_url: product.images[i],
              display_order: i
            });

          if (imageError) {
            console.error(`Error inserting image for product ${product.name}:`, imageError);
          }
        }
      }

      // Insert product variants if they exist
      if (product.variants && product.variants.length > 0) {
        for (const variant of product.variants) {
          const { error: variantError } = await supabase
            .from('product_variants')
            .insert({
              product_id: productId,
              name: variant.name,
              color: variant.color || null,
              size: variant.size || null,
              price: variant.price,
              stock: variant.stock
            });

          if (variantError) {
            console.error(`Error inserting variant for product ${product.name}:`, variantError);
          }
        }
      }
    }

    console.log("Database seeding completed successfully!");
    return { success: true };
  } catch (error) {
    console.error("Error seeding database:", error);
    return { success: false, error };
  }
}

// Create a function to check if products already exist
export async function checkProductsExist() {
  const { count, error } = await supabase
    .from('products')
    .select('*', { count: 'exact', head: true });
  
  if (error) {
    console.error("Error checking products:", error);
    return false;
  }
  
  return count && count > 0;
}
