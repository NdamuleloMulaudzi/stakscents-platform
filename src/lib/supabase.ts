import { createClient } from "@supabase/supabase-js";

const supabaseUrl =
  process.env.NEXT_PUBLIC_SUPABASE_URL || "https://sjsidsfilcvsvgvdmlrh.supabase.co";
const supabaseKey =
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "sb_publishable_qBt8tTUnQfZJp2Ng5FVMDg_pvUpF6bv";

export const supabase = createClient(supabaseUrl, supabaseKey);
