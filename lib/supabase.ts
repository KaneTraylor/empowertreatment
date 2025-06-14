import { createClient } from '@supabase/supabase-js';

// Get environment variables
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

// Only create clients if we have the required environment variables
export const supabase = supabaseUrl && supabaseAnonKey 
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

// Admin client for server-side operations (only use in API routes)
export const supabaseAdmin = supabaseUrl && supabaseServiceKey 
  ? createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false
      }
    })
  : null;

// Types for our database tables
export interface FormSubmission {
  id?: string;
  created_at?: string;
  
  // Contact Information
  first_name: string;
  last_name: string;
  email: string;
  mobile_number: string;
  state: string;
  
  // Referral Information
  healthcare_referral: 'yes' | 'no' | '';
  provider_name?: string;
  
  // Opioid Use Assessment
  opioid_use: 'no-control' | 'under-control' | 'never-used' | '';
  suboxone_history?: 'currently-taking' | 'taken-past' | 'never-taken' | '';
  suboxone_last_week?: 'yes' | 'no' | '';
  prescribed_by_medical?: 'yes' | 'no' | '';
  days_remaining?: string;
  taking_daily_dose?: 'yes' | 'no' | 'not-sure' | '';
  feels_stable?: 'yes' | 'no' | '';
  opioid_duration?: 'none' | 'less-week' | 'week-month' | 'month-more' | '';
  opioid_frequency?: 'none' | 'less-week' | 'week-month' | 'month-more' | '';
  heroin_use?: 'yes' | 'no' | '';
  
  // Life Difficulties
  difficulties: string[];
  
  // Insurance
  has_insurance: 'yes' | 'no' | '';
  insurance_provider?: string;
  
  // Treatment Readiness
  reason_joining: string;
  treatment_timeline: 'asap' | 'few-weeks' | '';
  
  // Appointment
  appointment_scheduled: boolean;
  appointment_date_time?: string;
  
  // Status
  status: 'pending' | 'contacted' | 'scheduled' | 'completed';
  notes?: string;
}