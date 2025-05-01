import { createClient } from '@supabase/supabase-js';
import { Database } from '@/types/supabase';

// Get environment variables or use defaults
const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
console.log({supabaseUrl, supabaseAnonKey});

// Create a single supabase client for interacting with your database
export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey);

