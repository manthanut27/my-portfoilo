import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = supabaseUrl && supabaseAnonKey
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

export async function getAvailabilityStatus(): Promise<'open' | 'busy'> {
  if (!supabase) return 'open'; // optimistic default

  try {
    const { data } = await supabase
      .from('site_config')
      .select('value')
      .eq('key', 'availability_status')
      .single();

    return (data?.value as 'open' | 'busy') ?? 'open';
  } catch {
    return 'open';
  }
}
