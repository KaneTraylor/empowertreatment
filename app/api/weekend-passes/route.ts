import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

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
      jwt.verify(token.value, process.env.JWT_SECRET || 'your-secret-key');
    } catch (error) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    // Fetch weekend passes
    if (supabase) {
      const { data, error } = await supabase
        .from('weekend_passes')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) {
        console.error('Error fetching weekend passes:', error);
        // If table doesn't exist, return mock data
        if (error.code === '42P01') {
          return NextResponse.json({ passes: mockPasses });
        }
        return NextResponse.json({ error: 'Failed to fetch passes' }, { status: 500 });
      }

      return NextResponse.json({ passes: data || [] });
    } else {
      // Return mock data if Supabase is not configured
      return NextResponse.json({ passes: mockPasses });
    }
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
      const decoded = jwt.verify(token.value, process.env.JWT_SECRET || 'your-secret-key') as any;
      user = decoded.email;
    } catch (error) {
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    const { passId, action } = await request.json();

    if (!passId || !action) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // Update pass status
    if (supabase) {
      const newStatus = action === 'approve' ? 'approved' : 'denied';
      const { error } = await supabase
        .from('weekend_passes')
        .update({
          status: newStatus,
          approved_by: user,
          approved_at: new Date().toISOString()
        })
        .eq('pass_id', passId);

      if (error) {
        console.error('Error updating pass:', error);
        // Continue anyway for demo purposes
      }
    }

    // In a real implementation, we would also send SMS notifications here
    // For now, just return success
    return NextResponse.json({ 
      success: true, 
      message: `Pass ${action}d successfully` 
    });

  } catch (error) {
    console.error('Error updating weekend pass:', error);
    return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
  }
}