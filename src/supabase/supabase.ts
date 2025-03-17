import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.FARM_SUPABASE_URL!;
const supabaseAnonKey = process.env.FARM_SUPABASE_ANON_KEY!;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
