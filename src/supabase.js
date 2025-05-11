// src/supabase.js
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://your-https://yuosplangufzlkdvmbdy.supabase.co-id.supabase.co'
const supabaseKey =
  'your-eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inl1b3NwbGFuZ3VmemxrZHZtYmR5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDY3MzAyNDcsImV4cCI6MjA2MjMwNjI0N30.A6UneUn3Mf6gHzw9kzq8cVbmM9r3b8Tgvj9BPlfzGjE-key'

export const supabase = createClient(supabaseUrl, supabaseKey)
