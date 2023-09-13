import { createClient } from "@supabase/supabase-js";

export const supabaseUrl = "https://ydyxpwfvjipliemnnrqk.supabase.co";
const supabaseKey =
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlkeXhwd2Z2amlwbGllbW5ucnFrIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTMyMjYzNTEsImV4cCI6MjAwODgwMjM1MX0.iwMxcRSu4Qe2OEzttiKmbVvH1_vBML729-ZapVLE14Y";
const supabase = createClient(supabaseUrl, supabaseKey);
export default supabase;
