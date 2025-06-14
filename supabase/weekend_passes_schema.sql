-- Create weekend_passes table
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

-- Create indexes for better query performance
CREATE INDEX idx_weekend_passes_pass_id ON weekend_passes(pass_id);
CREATE INDEX idx_weekend_passes_status ON weekend_passes(status);
CREATE INDEX idx_weekend_passes_resident_name ON weekend_passes(resident_name);
CREATE INDEX idx_weekend_passes_created_at ON weekend_passes(created_at DESC);

-- Add RLS (Row Level Security) policies if needed
ALTER TABLE weekend_passes ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows inserting new pass requests
CREATE POLICY "Anyone can insert pass requests" ON weekend_passes
  FOR INSERT WITH CHECK (true);

-- Create a policy that allows reading pass data (you might want to restrict this)
CREATE POLICY "Anyone can read pass requests" ON weekend_passes
  FOR SELECT USING (true);

-- Create a policy for updating pass status (you might want to restrict this to authenticated users)
CREATE POLICY "Anyone can update pass status" ON weekend_passes
  FOR UPDATE USING (true);