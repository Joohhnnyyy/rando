
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://bodkjduixuohojthatyb.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJvZGtqZHVpeHVvaG9qdGhhdHliIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDk3Njg5NDIsImV4cCI6MjA2NTM0NDk0Mn0._uydm_Tc86k8Tv4Bp2q8agCgnHdce-iQ7eZVXkv70kE'

export const supabase = createClient(supabaseUrl, supabaseKey)
