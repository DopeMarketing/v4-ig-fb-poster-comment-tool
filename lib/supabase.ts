import { createClient } from '@supabase/supabase-js'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

// Server-side client
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Client-side client
export const supabaseClient = () => createClientComponentClient()

// Database types
export interface User {
  id: string
  email: string
  created_at: string
  subscription_plan?: string
}

export interface ConnectedAccount {
  id: string
  user_id: string
  platform: 'instagram' | 'facebook'
  account_id: string
  account_name: string
  access_token: string
  created_at: string
}

export interface Comment {
  id: string
  account_id: string
  platform: 'instagram' | 'facebook'
  external_id: string
  author_name: string
  content: string
  sentiment?: 'positive' | 'neutral' | 'negative'
  status: 'pending' | 'responded' | 'ignored'
  created_at: string
}