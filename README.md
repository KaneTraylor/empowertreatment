# Empower Treatment - Patient Intake Form

A modern, responsive multi-step form application for Empower Treatment patient intake, built with Next.js, TypeScript, and Tailwind CSS.

## Features

### 🎯 Core Functionality
- **Multi-step form** with conditional logic based on user responses
- **OTP verification** via SMS (Twilio) or Email (SendGrid)
- **Google Calendar integration** for appointment scheduling
- **Database storage** with Supabase (with local file storage fallback)
- **Email notifications** for both patients and admin team
- **SMS appointment reminders** for patients and clinicians
- **Admin panel** to view and export submissions

### 🎨 User Experience
- Smooth animations and transitions
- Progress tracking with visual indicators
- Mobile-responsive design
- Form state persistence (survives page refresh)
- Smart validation with helpful error messages

### 📊 Data Management
- Automatic form submission to database
- CSV export functionality
- Email notifications with complete form data
- Status tracking (pending, contacted, scheduled, completed)

## Quick Start

1. **Clone the repository**
   ```bash
   git clone [your-repo-url]
   cd empower-treatment-nextjs
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.local.example .env.local
   # Edit .env.local with your API keys
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

5. **Access the application**
   - Form: http://localhost:3000/form
   - Admin: http://localhost:3000/admin

## Environment Setup

### Required Services

1. **Twilio** (for SMS)
   - Sign up at [twilio.com](https://www.twilio.com)
   - Get Account SID, Auth Token, and Phone Number

2. **SendGrid** (for emails)
   - Sign up at [sendgrid.com](https://sendgrid.com)
   - Create an API key

3. **Supabase** (optional - for database)
   - Create project at [supabase.com](https://supabase.com)
   - Run the schema from `/supabase/schema.sql`

4. **Google Calendar** (for scheduling)
   - Already configured with your appointment URL

### Environment Variables

```env
# Twilio Configuration
TWILIO_ACCOUNT_SID=your-account-sid
TWILIO_AUTH_TOKEN=your-auth-token
TWILIO_PHONE_NUMBER=+1234567890

# SendGrid Configuration
SENDGRID_API_KEY=your-api-key
SENDGRID_FROM_EMAIL=noreply@empowertreatment.com
NOTIFICATION_EMAILS=admin@empower.com,team@empower.com

# Supabase Configuration (optional)
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-key

# Google Calendar
NEXT_PUBLIC_GOOGLE_APPOINTMENT_URL=your-calendar-url
```

## Project Structure

```
empower-treatment-nextjs/
├── app/                    # Next.js app directory
│   ├── api/               # API routes
│   ├── form/              # Form page
│   └── admin/             # Admin panel
├── components/            # React components
│   ├── form/             # Form-specific components
│   └── ui/               # Reusable UI components
├── hooks/                # Custom React hooks
├── lib/                  # Utility functions
├── types/                # TypeScript types
├── legacy/               # Original PHP files (reference)
└── supabase/            # Database schema
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm test` - Run tests
- `npm run lint` - Run ESLint

## Data Storage

The application supports two storage methods:

1. **Supabase Database** (recommended)
   - PostgreSQL database with proper typing
   - Row-level security
   - Real-time capabilities

2. **Local File Storage** (fallback)
   - JSON file storage in `/data` directory
   - Automatic fallback if Supabase fails
   - CSV export functionality

## Form Flow

1. **Location** - State selection and contact info
2. **OTP Verification** - Verify email or phone
3. **Referral** - Healthcare provider info
4. **Opioid Assessment** - Multiple conditional steps
5. **Life Difficulties** - Multi-select challenges
6. **Insurance** - Coverage information
7. **Treatment Timeline** - Urgency preference
8. **Appointment Scheduling** - Google Calendar integration
9. **Completion** - Confirmation and submission

## Admin Features

Access the admin panel at `/admin` to:
- View all form submissions
- See submission status and details
- Export data to CSV
- Track appointment scheduling

## Troubleshooting

### Common Issues

1. **OTP not sending**
   - Verify Twilio/SendGrid credentials
   - Check phone number format (+1234567890)

2. **Database not saving**
   - Check Supabase configuration
   - Data will save to local files as fallback

3. **Calendar not loading**
   - Verify Google Calendar URL is accessible
   - Check for iframe restrictions

## Production Deployment

1. Set all environment variables in your hosting platform
2. Run `npm run build`
3. Deploy the `.next` folder and other necessary files
4. Ensure the `/data` directory is writable (if using file storage)

## Security Notes

- Never commit `.env.local` files
- Use environment variables for all sensitive data
- Enable RLS in Supabase for production
- Regularly backup form submissions

## License

This project is private and proprietary to Empower Treatment.

## Support

For issues or questions, please contact the development team.