import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import { getHandbookAcknowledgments } from '@/lib/handbookStorage';

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

    // Fetch handbook acknowledgments from local storage
    console.log('Fetching handbook acknowledgments...');
    const acknowledgments = await getHandbookAcknowledgments();
    console.log(`Found ${acknowledgments.length} handbook acknowledgments`);

    return NextResponse.json({ 
      acknowledgments,
      count: acknowledgments.length 
    });

  } catch (error) {
    console.error('Error fetching handbook acknowledgments:', error);
    return NextResponse.json({ 
      error: 'Failed to fetch acknowledgments',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 });
  }
}