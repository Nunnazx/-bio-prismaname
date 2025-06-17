import { createServerComponentClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import type { Database } from "@/lib/supabase/database.types"

// Main function to create a Supabase client for server components and actions
const createSupabaseServerClientInternal = () => {
  return createServerComponentClient<Database>({ cookies })
}

export const createSupabaseServerClient = createSupabaseServerClientInternal

// Alias for backward compatibility or other parts of the code still using createClient
export const createClient = createSupabaseServerClientInternal
