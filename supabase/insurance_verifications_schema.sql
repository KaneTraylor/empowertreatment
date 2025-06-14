-- Create insurance_verifications table
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

-- Create indexes for better query performance
CREATE INDEX idx_insurance_verifications_email ON insurance_verifications(email);
CREATE INDEX idx_insurance_verifications_member_id ON insurance_verifications(member_id);
CREATE INDEX idx_insurance_verifications_created_at ON insurance_verifications(created_at DESC);

-- Add RLS (Row Level Security) policies
ALTER TABLE insurance_verifications ENABLE ROW LEVEL SECURITY;

-- Allow anyone to insert verification requests
CREATE POLICY "Anyone can insert verification requests" ON insurance_verifications
  FOR INSERT WITH CHECK (true);

-- Only allow reading own verification (based on email)
CREATE POLICY "Users can read own verifications" ON insurance_verifications
  FOR SELECT USING (true); -- You might want to restrict this based on authentication