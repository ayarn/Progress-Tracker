import { createClient } from '@supabase/supabase-js';

// Access environment variables. 
// In a real app, these would be in a .env file.
// For this generated code, we use placeholders. User needs to provide their own to make DB work.
const supabaseUrl = (import.meta as any).env?.VITE_SUPABASE_URL || '';
const supabaseKey = (import.meta as any).env?.VITE_SUPABASE_ANON_KEY || '';

export const supabase = (supabaseUrl && supabaseKey) 
  ? createClient(supabaseUrl, supabaseKey) 
  : null;