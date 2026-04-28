
const SUPABASE_URL = 'https://voalryklgwuphgfwvobl.supabase.co';
const SUPABASE_ANON_KEY = 'sb_publishable_juM4FPHYg7l5GagtyM91sQ_xIPuydHC';
 
import { createClient } from 'https://cdn.jsdelivr.net/npm/@supabase/supabase-js/+esm';
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);