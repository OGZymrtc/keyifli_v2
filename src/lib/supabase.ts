import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://hlctzdobcxpexuazknlz.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImhsY3R6ZG9iY3hwZXh1YXprbmx6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIxODU3ODYsImV4cCI6MjA3Nzc2MTc4Nn0.qwxcUN3U_4zHPmbT3YMhn5A3TUnkTj0cFEmF6Uub2hk';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Table names
export const TABLES = {
  ACTIVITY: 'app_a077ac80a8_activity',
  CATEGORY: 'app_a077ac80a8_category',
  ACTIVITY_TYPE: 'app_a077ac80a8_activity_type',
  PRODUCT: 'app_a077ac80a8_product',
  CART: 'app_a077ac80a8_cart',
  FAVORITES: 'app_a077ac80a8_favorites',
};

// Types
export interface Activity {
  id: string;
  activity_name: string;
  created_at: string;
}

export interface Category {
  id: string;
  activity_id: string;
  category_name: string;
  created_at: string;
}

export interface ActivityType {
  id: string;
  activity_id: string;
  category_id: string;
  activity_type_name: string;
  created_at: string;
}

export interface Product {
  id: string;
  activity_type_id: string;
  category_id: string;
  title: string;
  sub_title?: string;
  description?: string;
  price: number;
  image_url?: string;
  external_url?: string;
  city?: string;
  district?: string;
  ticket_rule?: string;
  date?: string;
  rating?: number;
  is_active: boolean;
  create_date: string;
}

export interface CartItem {
  id: string;
  user_id: string;
  product_id: string;
  quantity: number;
  created_at: string;
  product?: Product;
}

export interface Favorite {
  id: string;
  user_id: string;
  product_id: string;
  created_at: string;
  product?: Product;
}