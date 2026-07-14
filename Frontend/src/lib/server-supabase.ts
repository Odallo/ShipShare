import { createClient } from '@supabase/supabase-js';
import { createServerClient } from '@supabase/auth-helpers-nextjs';
import { cookies } from 'next/headers';

const SBP_URL = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const SBP_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

export function createServerSupabase() {
  const cookieStore = cookies();
  return createServerClient(
    SBP_URL,
    SBP_ANON_KEY,
    { cookies: { get: (name) => cookieStore.get(name)?.value } }
  );
}

export function getServerUser(jwt?: string) {
  const supabase = createClient(SBP_URL, SBP_ANON_KEY);
  return supabase.auth.getUser(jwt);
}

export function getAuthenticatedClient(jwt: string) {
  return createClient(SBP_URL, SBP_ANON_KEY, {
    global: { headers: { Authorization: `Bearer ${jwt}` } },
  });
}

export function getServiceClient() {
  return createClient(SBP_URL, process.env.SUPABASE_SERVICE_KEY!);
}
