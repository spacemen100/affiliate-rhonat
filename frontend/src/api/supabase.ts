
import { createClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL || 'https://etkeimmyqfangzyrajqx.supabase.co';
const key = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImV0a2VpbW15cWZhbmd6eXJhanF4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQ2MDgxNjksImV4cCI6MjA4MDE4NDE2OX0.TF4TBcnrbNVLdZSQEnrOE6xCSE1KGHd4WGX-1rGoBdc';

export const supabase = createClient(url, key);
