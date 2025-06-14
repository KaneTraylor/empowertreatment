# Youth Services SMS Setup

## Environment Variables for Clinician SMS Notifications

Add the following environment variables to your `.env.local` file to enable SMS notifications for youth services inquiries:

```env
# Clinician Phone Numbers (include country code, e.g., +1 for US)
KANE_PHONE=+1XXXXXXXXXX
TAYLOR_PHONE=+1XXXXXXXXXX
CAROL_PHONE=+1XXXXXXXXXX
DOTTIE_PHONE=+1XXXXXXXXXX
SARA_PHONE=+1XXXXXXXXXX
```

## SMS Notification Features

### For Clinicians:
- Each clinician receives an SMS alert when a new youth services inquiry is submitted
- The SMS includes:
  - Form type (Group Home or Parent/Guardian)
  - Youth's name and age
  - Contact person's name
  - Urgency level (with special alert for crisis situations)
  - Reminder to check email for full details

### For Form Submitters:
- Parents/guardians and group home staff receive a confirmation SMS
- The SMS includes:
  - Confirmation that their inquiry was received
  - Youth's name
  - Expected response time (24 hours for urgent, 24-48 hours for standard)
  - Emergency contact number for immediate assistance

## SMS Format Examples

### Clinician Alert (Crisis):
```
New Youth Services Parent Inquiry

Youth: Sarah, Age 16
Contact: John Smith
🚨 URGENT - Crisis Situation

Check email for full details.
```

### Clinician Alert (Standard):
```
New Youth Services Group Home Inquiry

Youth: Michael, Age 17
Contact: Jane Doe
Priority: Planning

Check email for full details.
```

### Submitter Confirmation:
```
Thank you for contacting Empower Treatment Youth Services.

We've received your inquiry for Sarah and our team will contact you within 24 hours.

If this is an emergency, please call us immediately at (740) 200-0016.
```

## Important Notes

1. **Phone Number Format**: Ensure all phone numbers include the country code (e.g., +1 for US numbers)
2. **SMS Costs**: Each SMS sent will incur Twilio charges
3. **Error Handling**: SMS failures won't prevent form submission - they're logged but don't block the process
4. **Privacy**: Ensure clinician phone numbers are kept secure and not committed to version control

## Testing

To test SMS functionality:
1. Submit a test form with a valid phone number
2. Check that clinicians receive their alert SMS
3. Verify that the submitter receives their confirmation SMS
4. Test with different urgency levels to see the different message formats