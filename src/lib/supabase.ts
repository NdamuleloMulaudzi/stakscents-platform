// Placeholder for Supabase client
// import { createClient } from '@supabase/supabase-js'

export const supabase = {
  // Mock client
  from: (table: string) => ({
    select: () => Promise.resolve({ data: [], error: null }),
  }),
};
