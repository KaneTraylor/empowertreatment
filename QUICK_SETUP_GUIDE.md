# Quick Setup Guide - Supabase Integration

## 1. Create Your Supabase Database

1. Go to [supabase.com](https://supabase.com) and sign up/login
2. Click "New Project"
3. Choose your organization and set:
   - Project name: `empower-treatment`
   - Database password: (save this securely)
   - Region: Choose closest to your users
4. Wait for project to be created (~2 minutes)

## 2. Run the Database Schema

1. In Supabase dashboard, go to **SQL Editor** (left sidebar)
2. Click "New Query"
3. Copy ALL contents from `/supabase/schema.sql` in this project
4. Paste and click "Run"
5. You should see "Success. No rows returned"

## 3. Get Your API Keys

1. In Supabase dashboard, go to **Settings** → **API**
2. Copy these values to your `.env.local`:

```bash
NEXT_PUBLIC_SUPABASE_URL=https://YOUR_PROJECT.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key-here
```

⚠️ **Important**: The service role key is secret! Never commit it to git.

## 4. Test the Integration

1. Restart your Next.js dev server:
   ```bash
   npm run dev
   ```

2. Submit a test form at http://localhost:3000/form

3. Check Supabase Table Editor:
   - Go to **Table Editor** in Supabase
   - Select `form_submissions` table
   - You should see your test submission!

## 5. View Your Data

### In Supabase Dashboard:
- **Table Editor**: View/edit individual records
- **SQL Editor**: Run custom queries
- **Database**: See table structure

### Quick SQL Queries:
```sql
-- See all submissions
SELECT * FROM form_submissions ORDER BY created_at DESC;

-- See pending contacts
SELECT fname, lname, email, mobile_number, created_at 
FROM form_submissions 
WHERE status = 'pending';

-- Count by state
SELECT state, COUNT(*) as count 
FROM form_submissions 
GROUP BY state 
ORDER BY count DESC;
```

## What's Working Now

✅ **Form submissions are saved to database**
- All form fields are captured
- Submission ID is generated automatically
- Timestamps are recorded

✅ **Emails still send with database ID**
- Internal team notification includes database ID
- Patient confirmation email sent
- Works even if database is down

✅ **API endpoints ready**
- GET `/api/submissions` - Fetch submissions
- PATCH `/api/submissions` - Update status

## Common Issues

**"Database configuration missing"**
- Make sure all 3 environment variables are in `.env.local`
- Restart Next.js after adding them

**Can't see data in Supabase**
- Check that form submission completed (check email)
- Look in SQL Editor logs for errors
- Verify your API keys are correct

**Build fails**
- This is OK if you haven't added Supabase keys yet
- The app will still work, just without database

## Next Steps

1. **Monitor submissions** in Supabase Table Editor
2. **Update status** as you contact patients
3. **Export data** using Supabase's export features
4. Consider building an admin dashboard!

---

Need help? Check the full documentation in `SUPABASE_INTEGRATION.md`