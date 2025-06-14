import { NextRequest, NextResponse } from 'next/server';
import { supabaseAdmin } from '@/lib/supabase';

export async function GET(request: NextRequest) {
  // Verify this is a Vercel Cron job request
  const authHeader = request.headers.get('authorization');
  if (authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json(
      { success: false, message: 'Unauthorized' },
      { status: 401 }
    );
  }

  try {
    if (!supabaseAdmin) {
      console.log('Supabase not configured, skipping appointment reminders');
      return NextResponse.json({ 
        success: true, 
        message: 'Supabase not configured' 
      });
    }

    // Get appointments scheduled for tomorrow
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    const tomorrowStart = new Date(tomorrow.setHours(0, 0, 0, 0));
    const tomorrowEnd = new Date(tomorrow.setHours(23, 59, 59, 999));

    const { data: appointments, error } = await supabaseAdmin
      .from('form_submissions')
      .select('*')
      .eq('appointment_scheduled', true)
      .gte('appointment_date_time', tomorrowStart.toISOString())
      .lte('appointment_date_time', tomorrowEnd.toISOString())
      .eq('status', 'pending');

    if (error) {
      console.error('Error fetching appointments:', error);
      return NextResponse.json({ 
        success: false, 
        message: 'Error fetching appointments' 
      }, { status: 500 });
    }

    const remindersSent = [];

    // Send reminders for each appointment
    for (const appointment of appointments || []) {
      try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/send-appointment-reminder`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            patientName: `${appointment.first_name} ${appointment.last_name}`,
            patientPhone: appointment.mobile_number,
            appointmentDateTime: appointment.appointment_date_time,
            isInitialNotification: false // This is a reminder, not initial notification
          }),
        });

        if (response.ok) {
          remindersSent.push({
            patientName: `${appointment.first_name} ${appointment.last_name}`,
            appointmentTime: appointment.appointment_date_time
          });
        }
      } catch (error) {
        console.error(`Failed to send reminder for ${appointment.first_name} ${appointment.last_name}:`, error);
      }
    }

    return NextResponse.json({ 
      success: true, 
      message: `Sent ${remindersSent.length} appointment reminders`,
      reminders: remindersSent
    });

  } catch (error) {
    console.error('Cron job error:', error);
    return NextResponse.json(
      { success: false, message: 'Cron job failed' },
      { status: 500 }
    );
  }
}