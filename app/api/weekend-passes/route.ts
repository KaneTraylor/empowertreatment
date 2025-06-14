import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import { getWeekendPasses, updatePassStatus } from '@/lib/weekendPassStorage';

// Force dynamic rendering
export const dynamic = 'force-dynamic';

const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL;
const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

const supabase = SUPABASE_URL && SUPABASE_SERVICE_ROLE_KEY 
  ? createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY) 
  : null;

// Mock data for when Supabase is not configured
const mockPasses = [
  {
    pass_id: 'WP-DEMO-001',
    resident_name: 'John Doe',
    room_number: '203',
    phone: '(555) 123-4567',
    departure_date: new Date().toISOString().split('T')[0],
    departure_time: '14:00',
    return_date: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    return_time: '18:00',
    destination: 'Family Visit',
    destination_address: '123 Main St, Columbus, OH',
    purpose: 'Weekend visit with family',
    emergency_contact_name: 'Jane Doe',
    emergency_contact_phone: '(555) 987-6543',
    transportation_method: 'picked-up',
    driver_name: 'Jane Doe',
    status: 'pending',
    created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString()
  },
  {
    pass_id: 'WP-DEMO-002',
    resident_name: 'Sarah Smith',
    room_number: '105',
    phone: '(555) 234-5678',
    departure_date: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
    departure_time: '10:00',
    return_date: new Date().toISOString().split('T')[0],
    return_time: '20:00',
    destination: 'Work Event',
    destination_address: '456 Business Blvd, Dublin, OH',
    purpose: 'Company holiday party',
    emergency_contact_name: 'Mike Smith',
    emergency_contact_phone: '(555) 876-5432',
    transportation_method: 'uber-lyft',
    status: 'approved',
    approved_by: 'Kelsey',
    approved_at: new Date(Date.now() - 20 * 60 * 60 * 1000).toISOString(),
    created_at: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString()
  }
];

export async function GET(request: NextRequest) {
  try {
    // Verify authentication
    const cookieStore = cookies();
    const token = cookieStore.get('admin-token');
    
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
      jwt.verify(token.value, process.env.JWT_SECRET || 'empower-treatment-admin-secret-2024');
    } catch (error) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    // Try to fetch from Supabase first
    if (supabase) {
      console.log('Fetching weekend passes from Supabase...');
      const { data, error } = await supabase
        .from('weekend_passes')
        .select('*')
        .order('created_at', { ascending: false });

      if (!error) {
        console.log(`Found ${data?.length || 0} weekend passes in Supabase`);
        return NextResponse.json({ passes: data || [] });
      }
      
      console.error('Error fetching from Supabase:', error);
      console.error('Supabase error details:', {
        code: error.code,
        message: error.message,
        details: error.details,
        hint: error.hint
      });
    }

    // If Supabase is not configured or failed, return empty array
    console.warn('Supabase not configured or failed, returning empty passes array');
    return NextResponse.json({ passes: [] });
  } catch (error) {
    console.error('Error in weekend passes API:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  try {
    // Verify authentication
    const cookieStore = cookies();
    const token = cookieStore.get('admin-token');
    
    if (!token) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    let user;
    try {
      const decoded = jwt.verify(token.value, process.env.JWT_SECRET || 'empower-treatment-admin-secret-2024') as any;
      user = decoded.email;
    } catch (error) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    const { passId, action } = await request.json();

    if (!passId || !action) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    const newStatus = action === 'approve' ? 'approved' : 'denied';
    
    // Try to update in Supabase first
    if (supabase) {
      const { error } = await supabase
        .from('weekend_passes')
        .update({
          status: newStatus,
          approved_by: user,
          approved_at: new Date().toISOString()
        })
        .eq('pass_id', passId);

      if (!error) {
        return NextResponse.json({ 
          success: true, 
          message: `Pass ${action}d successfully` 
        });
      }
      
      console.error('Error updating in Supabase:', error);
    }

    // If Supabase is not configured or failed, return error
    console.error('Failed to update pass - Supabase not configured or error occurred');
    return NextResponse.json({ error: 'Failed to update pass' }, { status: 500 });

  } catch (error) {
    console.error('Error updating weekend pass:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}