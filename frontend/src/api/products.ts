
import { supabase } from './supabase';

export async function getProducts() {
  return supabase.from('products').select('*');
}
