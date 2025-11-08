import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://vrjzuhreibqsvoqzsank.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZyanp1aHJlaWJxc3ZvcXpzYW5rIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjIzNjc4MjgsImV4cCI6MjA3Nzk0MzgyOH0.LPDybh2TuNrZihGkIYtcrELA24-Y9nXaD8atOPDqPnU';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Table names with new app_id
export const TABLES = {
  ACTIVITY: 'app_9b4a9adf9b_activity',
  CATEGORY: 'app_9b4a9adf9b_category',
  ACTIVITY_TYPE: 'app_9b4a9adf9b_activity_type',
  PRODUCT: 'app_9b4a9adf9b_product',
  CART: 'app_9b4a9adf9b_cart',
  FAVORITES: 'app_9b4a9adf9b_favorites',
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