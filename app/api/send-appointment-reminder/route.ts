import { NextRequest, NextResponse } from 'next/server';
import twilio from 'twilio';

// Initialize Twilio client
const twilioClient = twilio(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

// Get clinician phone number from environment variable
const CLINICIAN_PHONE = process.env.CLINICIAN_PHONE || '+15134003475';

interface AppointmentReminderData {
  patientName: string;
  patientPhone?: string;
  appointmentDateTime: string;
  isInitialNotification?: boolean; // true for immediate notification, false for reminder
}

// Helper function to format phone number
function formatPhoneNumber(phone: string): string {
  // Remove all non-digits
  const cleaned = phone.replace(/\D/g, '');
  
  // Add +1 if not present
  if (cleaned.length === 10) {
    return `+1${cleaned}`;
  } else if (cleaned.length === 11 && cleaned.startsWith('1')) {
    return `+${cleaned}`;
  }
  
  return phone; // Return as-is if format is unexpected
}

// Helper function to parse appointment date/time
function parseAppointmentDateTime(dateTimeStr: string): Date {
  // Handle various date formats that might come from the form
  // Example: "Monday, January 15, 2025 at 2:00 PM EST"
  const cleanedStr = dateTimeStr.replace(' EST', '').replace(' at ', ' ');
  return new Date(cleanedStr);
}

export async function POST(request: NextRequest) {
  try {
    const data: AppointmentReminderData = await request.json();
    const { patientName, patientPhone, appointmentDateTime, isInitialNotification = false } = data;

    if (!patientName || !appointmentDateTime) {
      return NextResponse.json(
        { success: false, message: 'Patient name and appointment date/time are required' },
        { status: 400 }
      );
    }

    const appointmentDate = parseAppointmentDateTime(appointmentDateTime);
    const formattedDate = appointmentDate.toLocaleString('en-US', {
      weekday: 'long',
      month: 'long',
      day: 'numeric',
      hour: 'numeric',
      minute: '2-digit',
      timeZoneName: 'short'
    });

    const messagesSent = [];

    try {
      // Send SMS to clinician
      const clinicianMessage = isInitialNotification
        ? `New appointment scheduled:\n\nPatient: ${patientName}\nDate/Time: ${formattedDate}\n\nPlease prepare for the welcome call.`
        : `Appointment reminder:\n\nPatient: ${patientName}\nScheduled for: ${formattedDate}\n\nThis is a reminder for your upcoming appointment.`;

      await twilioClient.messages.create({
        body: clinicianMessage,
        from: process.env.TWILIO_PHONE_NUMBER,
        to: formatPhoneNumber(CLINICIAN_PHONE),
      });

      messagesSent.push({
        recipient: 'clinician',
        phone: CLINICIAN_PHONE,
        status: 'sent'
      });

      // Send SMS to patient if phone number is provided
      if (patientPhone) {
        const patientMessage = isInitialNotification
          ? `Hi ${patientName},\n\nYour appointment with Empower Treatment is confirmed for ${formattedDate}.\n\nWe look forward to speaking with you!`
          : `Hi ${patientName},\n\nThis is a reminder about your appointment with Empower Treatment on ${formattedDate}.\n\nIf you need to reschedule, please contact us.`;

        await twilioClient.messages.create({
          body: patientMessage,
          from: process.env.TWILIO_PHONE_NUMBER,
          to: formatPhoneNumber(patientPhone),
        });

        messagesSent.push({
          recipient: 'patient',
          phone: patientPhone,
          status: 'sent'
        });
      }

      return NextResponse.json({ 
        success: true, 
        messagesSent,
        message: `Successfully sent ${messagesSent.length} reminder message(s)` 
      });

    } catch (twilioError: any) {
      console.error('Twilio error:', twilioError);
      return NextResponse.json(
        { 
          success: false, 
          message: twilioError.message || 'Failed to send SMS reminders',
          messagesSent 
        },
        { status: 500 }
      );
    }

  } catch (error: any) {
    console.error('Server error:', error);
    return NextResponse.json(
      { success: false, message: 'Server error processing appointment reminder' },
      { status: 500 }
    );
  }
}

// Function to schedule a reminder (to be called from other parts of the app)
export async function scheduleAppointmentReminder(
  patientName: string,
  patientPhone: string | undefined,
  appointmentDateTime: string,
  reminderHoursBefore: number = 24
) {
  try {
    const appointmentDate = parseAppointmentDateTime(appointmentDateTime);
    const reminderDate = new Date(appointmentDate.getTime() - (reminderHoursBefore * 60 * 60 * 1000));
    
    // In a production environment, you would use a job scheduler like:
    // - Vercel Cron Jobs
    // - AWS Lambda with CloudWatch Events
    // - A dedicated job queue service
    
    // For now, we'll return the reminder date for logging
    console.log(`Reminder scheduled for ${patientName} at ${reminderDate.toISOString()}`);
    
    return {
      appointmentDate,
      reminderDate,
      patientName,
      patientPhone
    };
  } catch (error) {
    console.error('Error scheduling reminder:', error);
    throw error;
  }
}