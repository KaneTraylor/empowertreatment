-- Complete Supabase Schema for Empower Treatment Forms
-- Run this file in your Supabase SQL editor to create all necessary tables

-- 1. MAIN ASSESSMENT FORM SUBMISSIONS (already exists in schema.sql)
-- This is the multi-step form at /form

-- 2. INSURANCE VERIFICATIONS
CREATE TABLE IF NOT EXISTS insurance_verifications (
  id SERIAL PRIMARY KEY,
  
  -- Insurance Information
  insurance_provider VARCHAR(100) NOT NULL,
  member_id VARCHAR(100) NOT NULL,
  group_number VARCHAR(100),
  
  -- Personal Information
  first_name VARCHAR(100) NOT NULL,
  last_name VARCHAR(100) NOT NULL,
  date_of_birth DATE NOT NULL,
  phone VARCHAR(20) NOT NULL,
  email VARCHAR(255) NOT NULL,
  
  -- Verification Results (if you want to store them)
  verification_status VARCHAR(50) DEFAULT 'pending',
  is_accepted BOOLEAN,
  in_network BOOLEAN,
  estimated_coverage VARCHAR(100),
  deductible VARCHAR(100),
  out_of_pocket VARCHAR(100),
  pre_auth_required BOOLEAN,
  
  -- Metadata
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- 3. YOUTH SERVICES FORMS
CREATE TABLE IF NOT EXISTS youth_services_forms (
  id SERIAL PRIMARY KEY,
  
  -- Form Type
  form_type VARCHAR(50) NOT NULL, -- 'group-home' or 'parent'
  
  -- Contact Information (both forms)
  contact_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  state VARCHAR(2) NOT NULL,
  
  -- Organization Information (group home only)
  organization_name VARCHAR(255),
  
  -- Referral Information (group home only)
  referral_type VARCHAR(50), -- 'individual', 'multiple', 'entire-house'
  number_of_youth INTEGER,
  age_range VARCHAR(50),
  group_description TEXT,
  
  -- Youth Information (both forms)
  youth_name VARCHAR(255),
  youth_age INTEGER,
  
  -- Assessment Information (both forms)
  primary_concerns JSONB NOT NULL, -- Array of concerns
  current_medications TEXT,
  insurance_provider VARCHAR(255),
  previous_treatment TEXT,
  urgency_level VARCHAR(20) NOT NULL, -- 'immediate', 'soon', 'planning'
  additional_notes TEXT,
  
  -- Consent
  consent BOOLEAN NOT NULL DEFAULT false,
  
  -- Status tracking
  status VARCHAR(50) DEFAULT 'new',
  assigned_to VARCHAR(255),
  
  -- Timestamps
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- 4. WEEKEND PASSES
CREATE TABLE IF NOT EXISTS weekend_passes (
  id SERIAL PRIMARY KEY,
  pass_id VARCHAR(50) UNIQUE NOT NULL,
  
  -- Resident Information
  resident_name VARCHAR(255) NOT NULL,
  room_number VARCHAR(50) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  
  -- Pass Details
  departure_date DATE NOT NULL,
  departure_time TIME NOT NULL,
  return_date DATE NOT NULL,
  return_time TIME NOT NULL,
  destination VARCHAR(255) NOT NULL,
  destination_address TEXT NOT NULL,
  purpose TEXT NOT NULL,
  
  -- Emergency Contact
  emergency_contact_name VARCHAR(255) NOT NULL,
  emergency_contact_phone VARCHAR(20) NOT NULL,
  emergency_contact_relationship VARCHAR(100) NOT NULL,
  
  -- Transportation
  transportation_method VARCHAR(50) NOT NULL,
  driver_name VARCHAR(255),
  vehicle_info VARCHAR(255),
  
  -- Agreements and Signature
  agreements JSONB NOT NULL,
  signature VARCHAR(255) NOT NULL,
  signature_date DATE NOT NULL,
  
  -- Approval Status
  status VARCHAR(20) NOT NULL DEFAULT 'pending',
  approved_by VARCHAR(255),
  approved_at TIMESTAMP,
  
  -- Timestamps
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- CREATE ALL INDEXES
-- Insurance Verifications
CREATE INDEX IF NOT EXISTS idx_insurance_verifications_email ON insurance_verifications(email);
CREATE INDEX IF NOT EXISTS idx_insurance_verifications_member_id ON insurance_verifications(member_id);
CREATE INDEX IF NOT EXISTS idx_insurance_verifications_created_at ON insurance_verifications(created_at DESC);

-- Youth Services Forms
CREATE INDEX IF NOT EXISTS idx_youth_services_forms_email ON youth_services_forms(email);
CREATE INDEX IF NOT EXISTS idx_youth_services_forms_form_type ON youth_services_forms(form_type);
CREATE INDEX IF NOT EXISTS idx_youth_services_forms_urgency ON youth_services_forms(urgency_level);
CREATE INDEX IF NOT EXISTS idx_youth_services_forms_created_at ON youth_services_forms(created_at DESC);

-- Weekend Passes
CREATE INDEX IF NOT EXISTS idx_weekend_passes_pass_id ON weekend_passes(pass_id);
CREATE INDEX IF NOT EXISTS idx_weekend_passes_status ON weekend_passes(status);
CREATE INDEX IF NOT EXISTS idx_weekend_passes_resident_name ON weekend_passes(resident_name);
CREATE INDEX IF NOT EXISTS idx_weekend_passes_created_at ON weekend_passes(created_at DESC);

-- ENABLE ROW LEVEL SECURITY ON ALL TABLES
ALTER TABLE insurance_verifications ENABLE ROW LEVEL SECURITY;
ALTER TABLE youth_services_forms ENABLE ROW LEVEL SECURITY;
ALTER TABLE weekend_passes ENABLE ROW LEVEL SECURITY;

-- CREATE RLS POLICIES
-- Insurance Verifications Policies
CREATE POLICY "Anyone can insert verification requests" ON insurance_verifications
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Users can read verifications" ON insurance_verifications
  FOR SELECT USING (true);

-- Youth Services Forms Policies
CREATE POLICY "Anyone can insert youth forms" ON youth_services_forms
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Anyone can read youth forms" ON youth_services_forms
  FOR SELECT USING (true);

-- Weekend Passes Policies
CREATE POLICY "Anyone can insert pass requests" ON weekend_passes
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Anyone can read pass requests" ON weekend_passes
  FOR SELECT USING (true);

CREATE POLICY "Anyone can update pass status" ON weekend_passes
  FOR UPDATE USING (true);