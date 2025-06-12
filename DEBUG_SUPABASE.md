# Debugging Supabase Access Issues

## Common "privileges" error causes:

### 1. Wrong API Key
Make sure you have the **service role** key, not the anon key, for server-side operations:

- Go to Supabase Dashboard → Settings → API
- Copy the **service_role** key (not anon key)
- Update your `.env.local`:
  ```
  SUPABASE_SERVICE_ROLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
  ```

### 2. RLS (Row Level Security) Blocking Access

Run this SQL to check if RLS is enabled:
```sql
SELECT tablename, rowsecurity 
FROM pg_tables 
WHERE tablename = 'form_submissions';
```

If `rowsecurity` is `true`, you need proper policies.

### 3. Quick Fix - Disable RLS Temporarily

```sql
-- Disable RLS for testing
ALTER TABLE form_submissions DISABLE ROW LEVEL SECURITY;
```

**Warning**: This makes your table publicly accessible. Only use for testing!

### 4. Better Fix - Add Proper Policies

```sql
-- Drop all existing policies
DROP POLICY IF EXISTS "Allow anonymous inserts" ON form_submissions;
DROP POLICY IF EXISTS "Allow authenticated reads" ON form_submissions;
DROP POLICY IF EXISTS "Allow authenticated updates" ON form_submissions;
DROP POLICY IF EXISTS "Enable insert for all users" ON form_submissions;
DROP POLICY IF EXISTS "Service role has full access" ON form_submissions;
DROP POLICY IF EXISTS "Enable read access for authenticated users" ON form_submissions;
DROP POLICY IF EXISTS "Enable update for authenticated users" ON form_submissions;

-- Disable RLS temporarily
ALTER TABLE form_submissions DISABLE ROW LEVEL SECURITY;

-- Or if you want to keep RLS, create a permissive policy:
-- ALTER TABLE form_submissions ENABLE ROW LEVEL SECURITY;
-- CREATE POLICY "Allow all operations" ON form_submissions
-- FOR ALL USING (true) WITH CHECK (true);
```

### 5. Test Your Setup

After making changes:
1. Restart your Next.js dev server
2. Submit a test form
3. Check Supabase logs: Dashboard → Logs → API Logs

### 6. Check Your Service Role Key

The service role key should:
- Be longer than the anon key
- Start with `eyJ...`
- Be in `SUPABASE_SERVICE_ROLE_KEY` (not the anon key variable)

### Still Having Issues?

1. Check Supabase Logs for detailed errors
2. Verify your table exists in Table Editor
3. Try a simple insert in SQL Editor:
   ```sql
   INSERT INTO form_submissions (fname, lname, email, state)
   VALUES ('Test', 'User', 'test@example.com', 'Ohio');
   ```

If the manual insert works but your app doesn't, it's likely an API key issue.