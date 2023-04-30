import { createClient } from "@supabase/supabase-js";
import { supaKey } from "./key";

const supabaseUrl = "https://cjqroureoqxwqqhcsqgo.supabase.co";
const supabaseKey = supaKey;
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
