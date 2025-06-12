# Webhook & Email System Documentation

## Overview

The Empower Treatment form now includes a comprehensive webhook and email notification system that automatically captures all form responses and appointment details.

## Features

### 1. Automatic Form Submission
- Form data is automatically submitted when user reaches the completion step
- No manual submit button required
- Includes retry functionality on failure

### 2. Comprehensive Email Notifications

#### Internal Team Email
Sent to configured recipients with:
- Complete form responses in organized sections
- Patient contact information
- Opioid use assessment details
- Suboxone history (if applicable)
- Life difficulties
- Insurance information
- Treatment timeline preference
- Appointment details (if scheduled)

#### Patient Confirmation Email
Sent to the patient (if email provided) with:
- Application confirmation
- Appointment details (if scheduled)
- What to expect during the welcome call
- Contact information for questions

### 3. Form Data Included in Emails

The system captures and formats all form responses:

```
=== CONTACT INFORMATION ===
Name, Email, Phone, State

=== REFERRAL INFORMATION ===
Healthcare provider referral status

=== OPIOID USE ASSESSMENT ===
Opioid use status, Suboxone history
(Detailed questions if applicable)

=== LIFE DIFFICULTIES ===
Selected difficulties from checklist

=== INSURANCE ===
Insurance status and provider

=== TREATMENT READINESS ===
Reason for joining, Timeline preference

=== APPOINTMENT SCHEDULED ===
Date and time (if scheduled)
```

## Configuration

### Environment Variables

Add these to your `.env.local`:

```bash
# SendGrid Configuration
SENDGRID_API_KEY=your-sendgrid-api-key
SENDGRID_FROM_EMAIL=noreply@empowertreatment.com

# Email Recipients (comma-separated for multiple)
NOTIFICATION_EMAILS=admin@empowertreatment.com,team@empowertreatment.com

# Google Calendar (for appointment scheduling)
NEXT_PUBLIC_GOOGLE_APPOINTMENT_URL=your-google-calendar-url
```

### Email Recipients

- Configure multiple recipients using comma-separated emails
- Falls back to `SENDGRID_FROM_EMAIL` if no recipients configured
- Both internal team and patient receive different email templates

## API Endpoint

### POST `/api/submit-form`

Accepts the complete form data and:
1. Formats all responses into readable email content
2. Sends notification to internal team
3. Sends confirmation to patient (if email provided)
4. Returns success/error response

## Google Calendar Integration

The system captures appointment details through:
1. Embedded Google Calendar iframe
2. User confirmation checkbox
3. Manual entry of appointment date/time
4. Details included in email notifications

## Error Handling

- Automatic retry on submission failure
- User-friendly error messages
- Loading states during submission
- Fallback options if email fails

## Testing

To test the system:
1. Complete the form with test data
2. Schedule an appointment in the Google Calendar
3. Confirm the appointment details
4. Check that emails are received at configured addresses

## Security Considerations

- API keys stored in environment variables
- Form data validated before submission
- Email addresses sanitized
- No sensitive data logged to console

## Future Enhancements

Consider adding:
- Webhook to external CRM/database
- SMS notifications via Twilio
- Calendar API integration for automatic appointment capture
- Real-time form analytics
- Automated follow-up sequences