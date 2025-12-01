
import { supabase } from './supabase';

export async function getAffiliateLinks() {
  return supabase.from('affiliate_links').select('id, code, product_id');
}
