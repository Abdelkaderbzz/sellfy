
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      products: {
        Row: {
          id: number
          name: string
          description: string
          price: number
          original_price: number | null
          category: string
          subcategory: string | null
          brand: string
          sku: string
          stock: number
          is_new: boolean | null
          is_featured: boolean | null
          on_sale: boolean | null
          sale_percentage: number | null
          rating: number
          review_count: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: number
          name: string
          description: string
          price: number
          original_price?: number | null
          category: string
          subcategory?: string | null
          brand: string
          sku: string
          stock: number
          is_new?: boolean | null
          is_featured?: boolean | null
          on_sale?: boolean | null
          sale_percentage?: number | null
          rating: number
          review_count: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: number
          name?: string
          description?: string
          price?: number
          original_price?: number | null
          category?: string
          subcategory?: string | null
          brand?: string
          sku?: string
          stock?: number
          is_new?: boolean | null
          is_featured?: boolean | null
          on_sale?: boolean | null
          sale_percentage?: number | null
          rating?: number
          review_count?: number
          created_at?: string
          updated_at?: string
        }
      }
      product_images: {
        Row: {
          id: number
          product_id: number
          image_url: string
          display_order: number | null
          created_at: string
        }
        Insert: {
          id?: number
          product_id: number
          image_url: string
          display_order?: number | null
          created_at?: string
        }
        Update: {
          id?: number
          product_id?: number
          image_url?: string
          display_order?: number | null
          created_at?: string
        }
      }
      product_variants: {
        Row: {
          id: number
          product_id: number
          name: string
          color: string | null
          size: string | null
          price: number
          stock: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: number
          product_id: number
          name: string
          color?: string | null
          size?: string | null
          price: number
          stock: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: number
          product_id?: number
          name?: string
          color?: string | null
          size?: string | null
          price?: number
          stock?: number
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}
