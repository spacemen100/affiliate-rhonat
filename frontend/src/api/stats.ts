
import { supabase } from './supabase';

export async function getAffiliateStats() {
  return supabase.rpc('get_affiliate_analytics');
}
