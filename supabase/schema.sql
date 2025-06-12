-- Create form_submissions table
CREATE TABLE IF NOT EXISTS form_submissions (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT TIMEZONE('utc', NOW()),
  
  -- Contact Information
  fname TEXT NOT NULL,
  lname TEXT NOT NULL,
  email TEXT,
  mobile_number TEXT,
  state TEXT NOT NULL,
  
  -- Referral Information
  healthcare_referral TEXT CHECK (healthcare_referral IN ('yes', 'no', '')),
  provider_name TEXT,
  
  -- Opioid Use Assessment
  opioid_use TEXT CHECK (opioid_use IN ('no-control', 'under-control', 'never-used', '')),
  suboxone_history TEXT CHECK (suboxone_history IN ('currently-taking', 'taken-past', 'never-taken', '')),
  suboxone_last_week TEXT CHECK (suboxone_last_week IN ('yes', 'no', '')),
  prescribed_by_medical TEXT CHECK (prescribed_by_medical IN ('yes', 'no', '')),
  days_remaining TEXT,
  taking_daily_dose TEXT CHECK (taking_daily_dose IN ('yes', 'no', 'not-sure', '')),
  feels_stable TEXT CHECK (feels_stable IN ('yes', 'no', '')),
  opioid_duration TEXT CHECK (opioid_duration IN ('none', 'less-week', 'week-month', 'month-more', '')),
  opioid_frequency TEXT CHECK (opioid_frequency IN ('none', 'less-week', 'week-month', 'month-more', '')),
  heroin_use TEXT CHECK (heroin_use IN ('yes', 'no', '')),
  
  -- Life Difficulties (stored as JSON array)
  difficulties JSONB DEFAULT '[]',
  
  -- Insurance
  has_insurance TEXT CHECK (has_insurance IN ('yes', 'no', '')),
  insurance_provider TEXT,
  
  -- Treatment Readiness
  reason_joining TEXT,
  treatment_timeline TEXT CHECK (treatment_timeline IN ('asap', 'few-weeks', '')),
  
  -- Appointment
  appointment_scheduled BOOLEAN DEFAULT FALSE,
  appointment_date_time TEXT,
  
  -- Status tracking
  status TEXT DEFAULT 'pending' CHECK (status IN ('pending', 'contacted', 'scheduled', 'completed')),
  notes TEXT,
  
  -- Ensure at least one contact method
  CONSTRAINT has_contact_method CHECK (email IS NOT NULL OR mobile_number IS NOT NULL)
);

-- Create indexes for common queries
CREATE INDEX idx_form_submissions_created_at ON form_submissions(created_at DESC);
CREATE INDEX idx_form_submissions_status ON form_submissions(status);
CREATE INDEX idx_form_submissions_state ON form_submissions(state);
CREATE INDEX idx_form_submissions_email ON form_submissions(email);
CREATE INDEX idx_form_submissions_mobile ON form_submissions(mobile_number);

-- Create updated_at trigger
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = TIMEZONE('utc', NOW());
  RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_form_submissions_updated_at BEFORE UPDATE
  ON form_submissions FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Row Level Security (RLS)
ALTER TABLE form_submissions ENABLE ROW LEVEL SECURITY;

-- Policy to allow inserts from anonymous users (for form submissions)
CREATE POLICY "Allow anonymous inserts" ON form_submissions
  FOR INSERT WITH CHECK (true);

-- Policy to allow authenticated users to read all submissions
CREATE POLICY "Allow authenticated reads" ON form_submissions
  FOR SELECT USING (auth.role() = 'authenticated');

-- Policy to allow authenticated users to update submissions
CREATE POLICY "Allow authenticated updates" ON form_submissions
  FOR UPDATE USING (auth.role() = 'authenticated');

-- Create a view for recent submissions
CREATE OR REPLACE VIEW recent_submissions AS
SELECT 
  id,
  created_at,
  fname || ' ' || lname as full_name,
  email,
  mobile_number,
  state,
  status,
  appointment_scheduled,
  appointment_date_time
FROM form_submissions
WHERE created_at > NOW() - INTERVAL '30 days'
ORDER BY created_at DESC;