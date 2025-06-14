import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import jwt from 'jsonwebtoken';
import { supabaseAdmin } from '@/lib/supabase';

// Force dynamic rendering for this route
export const dynamic = 'force-dynamic';

// GET submissions as JSON or CSV
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
    
    const searchParams = request.nextUrl.searchParams;
    const format = searchParams.get('format') || 'json';

    // Fetch submissions from Supabase
    let submissions = [];
    
    if (supabaseAdmin) {
      const { data, error } = await supabaseAdmin
        .from('form_submissions')
        .select('*')
        .order('created_at', { ascending: false });
      
      if (error) {
        console.error('Supabase error:', error);
        return NextResponse.json({
          success: false,
          error: 'Failed to fetch submissions from database',
          details: error.message
        }, { status: 500 });
      }
      
      submissions = data || [];
      console.log(`Found ${submissions.length} submissions in database`);
    } else {
      console.warn('Supabase not configured');
      return NextResponse.json({
        success: false,
        error: 'Database not configured'
      }, { status: 500 });
    }

    if (format === 'csv') {
      // Generate CSV from submissions
      const headers = [
        'ID', 'Date', 'Status', 'First Name', 'Last Name', 'Email', 'Phone',
        'State', 'Healthcare Referral', 'Provider Name', 'Opioid Use',
        'Suboxone History', 'Insurance', 'Insurance Provider', 
        'Treatment Timeline', 'Appointment Scheduled', 'Appointment Date'
      ];
      
      const rows = submissions.map(sub => {
        return [
          sub.id,
          new Date(sub.created_at).toLocaleString(),
          sub.status,
          sub.first_name || '',
          sub.last_name || '',
          sub.email || '',
          sub.mobile_number || '',
          sub.state || '',
          sub.healthcare_referral || '',
          sub.provider_name || '',
          sub.opioid_use || '',
          sub.suboxone_history || '',
          sub.has_insurance || '',
          sub.insurance_provider || '',
          sub.treatment_timeline || '',
          sub.appointment_scheduled ? 'Yes' : 'No',
          sub.appointment_date_time || ''
        ].map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(',');
      });
      
      const csv = [headers.join(','), ...rows].join('\n');
      
      return new NextResponse(csv, {
        headers: {
          'Content-Type': 'text/csv',
          'Content-Disposition': `attachment; filename="submissions_${new Date().toISOString().split('T')[0]}.csv"`,
        },
      });
    }

    // Return JSON format for admin dashboard
    const formattedData = submissions.map(sub => ({
      id: sub.id,
      created_at: sub.created_at,
      status: sub.status,
      data: {
        firstName: sub.first_name,
        lastName: sub.last_name,
        email: sub.email,
        mobileNumber: sub.mobile_number,
        stateselect: sub.state,
        offer: sub.healthcare_referral,
        providerName: sub.provider_name,
        opioiduse: sub.opioid_use,
        relationshipwithSuboxone: sub.suboxone_history,
        Suboxonelastweek: sub.suboxone_last_week,
        prescribedbymedical: sub.prescribed_by_medical,
        days: sub.days_remaining,
        takingdailySuboxone: sub.taking_daily_dose,
        feelstable: sub.feels_stable,
        notincludingSuboxone: sub.opioid_duration,
        frequentlyusingopioids: sub.opioid_frequency,
        usingheroin: sub.heroin_use,
        difficultyfollowing: sub.difficulties,
        youinsured: sub.has_insurance,
        insuranceselect: sub.insurance_provider,
        reasonJoiningEmpower: sub.reason_joining,
        interestedintreatment: sub.treatment_timeline,
        appointmentDateTime: sub.appointment_date_time,
        notes: sub.notes
      }
    }));
    
    return NextResponse.json({
      success: true,
      count: formattedData.length,
      data: formattedData
    });

  } catch (error) {
    console.error('Error exporting submissions:', error);
    console.error('Error details:', {
      message: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : undefined
    });
    return NextResponse.json(
      { 
        error: 'Failed to export submissions',
        details: error instanceof Error ? error.message : 'Unknown error'
      },
      { status: 500 }
    );
  }
}