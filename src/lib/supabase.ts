
import { createClient } from '@supabase/supabase-js';
import { Database } from '@/types/supabase';

// Default values for local development
const defaultSupabaseUrl = 'https://your-supabase-project-url.supabase.co';
const defaultSupabaseAnonKey = 'your-supabase-anon-key';

// Get environment variables or use defaults
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || defaultSupabaseUrl;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || defaultSupabaseAnonKey;

// Create a single supabase client for interacting with your database
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

// Export a function to check if valid Supabase credentials are set
export const hasValidSupabaseCredentials = () => {
  return (
    supabaseUrl !== defaultSupabaseUrl && 
    supabaseAnonKey !== defaultSupabaseAnonKey &&
    supabaseUrl !== '' && 
    supabaseAnonKey !== ''
  );
};
