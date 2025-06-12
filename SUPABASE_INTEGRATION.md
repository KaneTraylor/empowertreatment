# Supabase Database Integration

## Overview

The Empower Treatment form is now fully integrated with Supabase for persistent data storage. All form submissions are automatically saved to a PostgreSQL database with proper typing and validation.

## Database Schema

### Table: `form_submissions`

The table stores all form data with the following structure:

#### Contact Information
- `id` (UUID) - Unique identifier
- `created_at` (Timestamp) - Submission time
- `fname` (Text) - First name
- `lname` (Text) - Last name
- `email` (Text) - Email address
- `mobile_number` (Text) - Phone number
- `state` (Text) - State of residence

#### Medical Assessment
- `healthcare_referral` (Enum: yes/no)
- `provider_name` (Text)
- `opioid_use` (Enum: no-control/under-control/never-used)
- `suboxone_history` (Enum: currently-taking/taken-past/never-taken)
- Additional Suboxone fields if applicable

#### Treatment Information
- `difficulties` (JSONB) - Array of life challenges
- `has_insurance` (Enum: yes/no)
- `insurance_provider` (Text)
- `reason_joining` (Text)
- `treatment_timeline` (Enum: asap/few-weeks)

#### Appointment & Status
- `appointment_scheduled` (Boolean)
- `appointment_date_time` (Text)
- `status` (Enum: pending/contacted/scheduled/completed)
- `notes` (Text) - Internal notes

## Setup Instructions

### 1. Create Supabase Project

1. Go to [supabase.com](https://supabase.com) and create a new project
2. Wait for the database to be provisioned

### 2. Run Database Schema

1. Go to the SQL Editor in your Supabase dashboard
2. Copy and run the contents of `/supabase/schema.sql`
3. This creates:
   - The `form_submissions` table
   - Proper indexes for performance
   - Row Level Security policies
   - Automatic timestamp updates

### 3. Configure Environment Variables

Add these to your `.env.local`:

```bash
# Supabase Configuration
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key
```

Find these in your Supabase project settings under "API".

### 4. Security Configuration

The schema includes Row Level Security (RLS) with:
- Anonymous users can INSERT (for form submissions)
- Only authenticated users can READ and UPDATE
- Protects data from unauthorized access

## Features

### Automatic Data Capture
- Form submissions are saved before sending emails
- Database save is attempted first, emails still send if DB fails
- Submission ID is included in notification emails

### Data Transformation
- Form field names are mapped to database columns
- Arrays (difficulties) are stored as JSONB
- Empty strings are handled properly
- At least one contact method is required

### API Endpoints

#### Submit Form
`POST /api/submit-form`
- Saves to database
- Sends notification emails
- Returns success/error response

#### Get Submissions
`GET /api/submissions?status=pending&limit=50&offset=0`
- Fetch submissions with filtering
- Pagination support
- Order by newest first

#### Update Submission
`PATCH /api/submissions`
- Update status (pending/contacted/scheduled/completed)
- Add internal notes
- Track patient progress

## Viewing Data

### Option 1: Supabase Dashboard
1. Go to Table Editor in Supabase
2. Select `form_submissions` table
3. View, filter, and export data

### Option 2: SQL Queries
Use the SQL Editor for custom queries:

```sql
-- Recent submissions
SELECT * FROM form_submissions 
WHERE created_at > NOW() - INTERVAL '7 days'
ORDER BY created_at DESC;

-- Pending contacts
SELECT fname, lname, email, mobile_number, created_at
FROM form_submissions
WHERE status = 'pending'
ORDER BY created_at ASC;

-- Appointment statistics
SELECT 
  COUNT(*) as total,
  COUNT(CASE WHEN appointment_scheduled THEN 1 END) as scheduled,
  COUNT(CASE WHEN status = 'completed' THEN 1 END) as completed
FROM form_submissions
WHERE created_at > NOW() - INTERVAL '30 days';
```

### Option 3: Build Admin Dashboard
Create an admin interface using the API endpoints to:
- View submissions in real-time
- Update status as patients are contacted
- Add notes and track progress
- Export data for reporting

## Data Retention

- All submissions are stored permanently by default
- Consider implementing data retention policies
- Regular backups are handled by Supabase

## Troubleshooting

### Common Issues

1. **"Database configuration missing"**
   - Ensure all three Supabase env variables are set
   - Restart Next.js dev server after adding variables

2. **Insert failures**
   - Check that at least email OR phone is provided
   - Verify enum values match exactly
   - Check Supabase logs for detailed errors

3. **Can't read submissions**
   - Ensure service role key is configured
   - Check RLS policies in Supabase dashboard

## Next Steps

1. **Create Admin Dashboard**
   - Build interface for viewing submissions
   - Add filtering and search
   - Export functionality

2. **Add Real-time Updates**
   - Use Supabase real-time subscriptions
   - Notify team of new submissions instantly

3. **Analytics**
   - Track conversion rates
   - Monitor drop-off points
   - Generate insights from data

4. **Backup Strategy**
   - Enable Point-in-Time Recovery
   - Set up regular exports
   - Test restore procedures