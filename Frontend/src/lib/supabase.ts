import { createClient } from '@supabase/supabase-js';
import { createBrowserClient } from '@supabase/auth-helpers-nextjs';

function getUrl() { return process.env.NEXT_PUBLIC_SUPABASE_URL!; }
function getAnonKey() { return process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!; }

let _supabase: ReturnType<typeof createClient> | null = null;

export function getSupabase() {
  if (!_supabase) _supabase = createClient(getUrl(), getAnonKey());
  return _supabase;
}

export const supabase = getSupabase();

let _supabaseAdmin: ReturnType<typeof createClient> | null = null;

export function getSupabaseAdmin() {
  if (!_supabaseAdmin) _supabaseAdmin = createClient(getUrl(), process.env.SUPABASE_SERVICE_KEY!);
  return _supabaseAdmin;
}

export const supabaseAdmin = typeof window === 'undefined' ? getSupabaseAdmin() : (null as unknown as ReturnType<typeof createClient>);

export const createBrowserSupabase = () => createBrowserClient(getUrl(), getAnonKey());
