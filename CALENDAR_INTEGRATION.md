# Calendar Integration Options

The Empower Treatment form now includes three calendar integration options for scheduling welcome calls:

## 1. Custom Calendar (Default)
Located in: `/components/form/steps/SchedulingStep.tsx`

Features:
- Built-in calendar widget using `react-calendar`
- Time slot selection with 9 AM - 5 PM availability
- Blocks weekends and past dates
- Smooth animations and transitions
- Stores appointment data in form state

## 2. Calendly Integration
Located in: `/components/form/steps/CalendlyStep.tsx`

Setup:
1. Create a Calendly account and event type
2. Update `NEXT_PUBLIC_CALENDLY_URL` in `.env.local`
3. The Calendly widget will embed directly in the form

Features:
- Professional scheduling interface
- Automatic timezone handling
- Email/SMS reminders
- Calendar sync (Google, Outlook, etc.)

## 3. Google Calendar Integration (Active)
Located in: `/components/form/steps/GoogleCalendarStep.tsx`

**Currently configured with your appointment scheduling link!**

Setup:
1. Add your Google Calendar appointment scheduling URL to `.env.local`:
   ```
   NEXT_PUBLIC_GOOGLE_APPOINTMENT_URL=https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ1poUjTRWAGf1Md3gDKPh7_FI4xD8abtrN2_-b-kcKCx-W-yTYzOAsJ8VddgYydJQPbCEf6NPBz
   ```

Features:
- Embeds Google's appointment scheduling interface
- Pre-fills user's name, email, and phone number
- Professional booking experience
- Automatic email confirmations
- Real-time availability

Alternative Implementation:
- `GoogleCalendarExternalStep.tsx` - Opens calendar in new window (useful if iframe restrictions apply)

## Switching Between Options

To switch calendar types, update the import in `MultiStepForm.tsx`:

```typescript
// Option 1: Custom Calendar (default)
const SchedulingStep = lazy(() => import('./steps/SchedulingStep').then(m => ({ default: m.SchedulingStep })));

// Option 2: Calendly
const SchedulingStep = lazy(() => import('./steps/CalendlyStep').then(m => ({ default: m.CalendlyStep })));

// Option 3: Google Calendar
const SchedulingStep = lazy(() => import('./steps/GoogleCalendarStep').then(m => ({ default: m.GoogleCalendarStep })));
```

## Interactive Features Added

1. **Step Animations**: Smooth slide-in/out transitions between form steps
2. **Button Hover Effects**: Scale animations on hover and tap
3. **Progress Bar**: Animated progress indicator with percentage
4. **Calendar Animations**: Staggered animations for time slots
5. **Loading States**: Smooth skeleton loaders during step transitions

## Customizing the Experience

### Colors
Update the primary color in `tailwind.config.ts` to match your brand.

### Animation Speed
Adjust transition durations in:
- `AnimatedStep.tsx` - Step transitions
- `Button.tsx` - Button interactions
- `SchedulingStep.tsx` - Calendar animations

### Time Slots
Modify the `timeSlots` array in `SchedulingStep.tsx` to change available times.

## Production Considerations

1. **API Keys**: Never commit real API keys. Use environment variables.
2. **Calendar Sync**: Consider implementing backend API to save appointments.
3. **Notifications**: Set up email/SMS confirmations after booking.
4. **Availability**: Integrate with real availability data from your scheduling system.