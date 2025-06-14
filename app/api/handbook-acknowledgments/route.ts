import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';

// Force dynamic rendering
export const dynamic = 'force-dynamic';

export async function GET(request: NextRequest) {
  try {
    // Verify authentication
    const cookieStore = cookies();
    const token = cookieStore.get('admin-token');
    
    if (!token) {
      console.log('No admin token found');
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    try {
      jwt.verify(token.value, process.env.JWT_SECRET || 'empower-treatment-admin-secret-2024');
    } catch (error) {
      console.error('Token verification failed:', error);
      return NextResponse.json({ error: 'Invalid token' }, { status: 401 });
    }

    // Note: Handbook acknowledgments are not stored in Supabase yet
    // For now, return empty array to prevent errors in production
    console.log('Handbook acknowledgments feature not yet implemented in database');

    return NextResponse.json({ 
      acknowledgments: [],
      count: 0 
    });

  } catch (error) {
    console.error('Error fetching handbook acknowledgments:', error);
    return NextResponse.json({ 
      error: 'Failed to fetch acknowledgments',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}