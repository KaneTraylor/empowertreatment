-- Create youth_services_forms table
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

-- Create indexes for better query performance
CREATE INDEX idx_youth_services_forms_email ON youth_services_forms(email);
CREATE INDEX idx_youth_services_forms_form_type ON youth_services_forms(form_type);
CREATE INDEX idx_youth_services_forms_urgency ON youth_services_forms(urgency_level);
CREATE INDEX idx_youth_services_forms_created_at ON youth_services_forms(created_at DESC);

-- Add RLS (Row Level Security) policies
ALTER TABLE youth_services_forms ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert forms
CREATE POLICY "Anyone can insert youth forms" ON youth_services_forms
  FOR INSERT WITH CHECK (true);

-- Allow reading forms (you might want to restrict this)
CREATE POLICY "Anyone can read youth forms" ON youth_services_forms
  FOR SELECT USING (true);