# SMS Appointment Reminder System

## Overview

The Empower Treatment form now includes automated SMS reminders for appointments. The system sends text messages to both the clinician and the patient to remind them of scheduled appointments.

## Features

### 1. Immediate Notifications
When a patient schedules an appointment:
- **Clinician receives**: Notification of new appointment with patient name and date/time
- **Patient receives**: Confirmation of their scheduled appointment

### 2. 24-Hour Reminders
The day before each appointment:
- **Clinician receives**: Reminder with patient name and appointment time
- **Patient receives**: Reminder of their upcoming appointment

## Configuration

### Environment Variables

Add these to your `.env.local` or Vercel environment variables:

```bash
# Clinician's phone number for notifications
CLINICIAN_PHONE=+15134003475

# For automated reminders (Vercel Cron)
CRON_SECRET=your-secure-random-string
NEXT_PUBLIC_BASE_URL=https://your-domain.vercel.app
```

### Vercel Cron Setup

The system uses Vercel Cron Jobs to send daily reminders at 9 AM:

1. The cron job is configured in `vercel.json`
2. It runs daily at 9 AM (server time)
3. Checks for appointments scheduled for the next day
4. Sends reminder SMS to both clinician and patient

## SMS Message Templates

### Initial Appointment Notification

**To Clinician:**
```
New appointment scheduled:

Patient: [Name]
Date/Time: [Appointment DateTime]

Please prepare for the welcome call.
```

**To Patient:**
```
Hi [Name],

Your appointment with Empower Treatment is confirmed for [DateTime].

We look forward to speaking with you!
```

### 24-Hour Reminder

**To Clinician:**
```
Appointment reminder:

Patient: [Name]
Scheduled for: [DateTime]

This is a reminder for your upcoming appointment.
```

**To Patient:**
```
Hi [Name],

This is a reminder about your appointment with Empower Treatment on [DateTime].

If you need to reschedule, please contact us.
```

## API Endpoints

### POST `/api/send-appointment-reminder`

Sends appointment reminder SMS messages.

**Request Body:**
```json
{
  "patientName": "John Doe",
  "patientPhone": "+1234567890",
  "appointmentDateTime": "Monday, January 15, 2025 at 2:00 PM EST",
  "isInitialNotification": true
}
```

### GET `/api/cron/appointment-reminders`

Automated endpoint called by Vercel Cron to send daily reminders.

## Testing

To test the SMS system:

1. **Test immediate notifications**: Submit a form with an appointment scheduled
2. **Test reminder endpoint manually**:
   ```bash
   curl -X POST https://your-domain/api/send-appointment-reminder \
     -H "Content-Type: application/json" \
     -d '{
       "patientName": "Test Patient",
       "patientPhone": "+1234567890",
       "appointmentDateTime": "Tomorrow at 2:00 PM",
       "isInitialNotification": false
     }'
   ```

## Important Notes

1. **Phone Number Format**: The system automatically formats US phone numbers (adds +1 prefix)
2. **SMS Failures**: If SMS sending fails, it won't block form submission
3. **Patient Phone Optional**: If no patient phone is provided, only the clinician receives notifications
4. **Time Zones**: Appointment times should include timezone information
5. **Cron Security**: The cron endpoint requires the `CRON_SECRET` for authentication

## Future Enhancements

Consider adding:
- Multiple reminder intervals (48 hours, 1 hour before)
- SMS opt-out functionality
- Customizable message templates
- Support for rescheduling via SMS
- Delivery status tracking
- International phone number support