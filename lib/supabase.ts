import { createClient } from "@supabase/supabase-js";

const url = process.env.NEXT_PUBLIC_SUPABASE_URL!;

// Server-side client — use in API routes and webhooks only
export const supabaseServer = createClient(url, process.env.SUPABASE_SECRET_KEY!);

// Browser-side client — safe to use in client components
export const supabaseBrowser = createClient(url, process.env.SUPABASE_PUBLISHABLE_KEY!);
