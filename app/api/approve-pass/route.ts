import { NextRequest, NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';
import twilio from 'twilio';

// Initialize Twilio
const twilioClient = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

// Initialize Supabase
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
);

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const passId = searchParams.get('id');
  const action = searchParams.get('action');
  const approverName = searchParams.get('approver') || 'Staff';

  if (!passId || !action) {
    return new NextResponse('Missing required parameters', { status: 400 });
  }

  try {
    // Get pass details
    const { data: passData, error: fetchError } = await supabase
      .from('weekend_passes')
      .select('*')
      .eq('pass_id', passId)
      .single();

    if (fetchError || !passData) {
      return new NextResponse('Pass not found', { status: 404 });
    }

    // Check if already processed
    if (passData.status !== 'pending') {
      return NextResponse.redirect(
        new URL(`/pass-status?id=${passId}&status=${passData.status}`, request.url)
      );
    }

    // Update pass status
    const newStatus = action === 'approve' ? 'approved' : 'denied';
    const { error: updateError } = await supabase
      .from('weekend_passes')
      .update({
        status: newStatus,
        approved_by: approverName,
        approved_at: new Date().toISOString()
      })
      .eq('pass_id', passId);

    if (updateError) {
      throw updateError;
    }

    // Send SMS notification to resident
    const message = action === 'approve' 
      ? `Good news! Your weekend pass (${passId}) has been APPROVED. Safe travels and remember to return by ${new Date(passData.return_date + ' ' + passData.return_time).toLocaleString('en-US', { 
          weekday: 'short', 
          month: 'short', 
          day: 'numeric', 
          hour: 'numeric', 
          minute: '2-digit', 
          hour12: true 
        })}.`
      : `Your weekend pass request (${passId}) has been DENIED. Please speak with staff if you have questions.`;

    try {
      await twilioClient.messages.create({
        body: message,
        from: process.env.TWILIO_PHONE_NUMBER,
        to: `+1${passData.phone.replace(/\D/g, '')}`
      });
    } catch (smsError) {
      console.error('Failed to send SMS to resident:', smsError);
    }

    // Redirect to confirmation page
    return NextResponse.redirect(
      new URL(`/pass-status?id=${passId}&status=${newStatus}&approver=${approverName}`, request.url)
    );

  } catch (error) {
    console.error('Error processing pass approval:', error);
    return new NextResponse('Error processing request', { status: 500 });
  }
}