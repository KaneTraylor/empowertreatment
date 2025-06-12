# Empower Treatment Form Steps Overview

## Current Implementation Status

### ✅ Completed Steps
1. **Location Step** - State selection and contact info
2. **OTP Verification** - Phone/email verification
3. **Referral Step** - Healthcare provider referral
4. **Opioid Use Step** - Basic opioid use assessment
5. **Suboxone Step** - Relationship with Suboxone

### 📝 Steps to Implement

#### Conditional Suboxone Questions (if currently taking or taken in past)
6. **Suboxone Last Week** - Have you taken Suboxone in the last week?
7. **Prescribed by Medical** - Is your Suboxone prescribed by a medical professional?
8. **Days Remaining** - How many days do you have left on your current prescription?
9. **Daily Dose Duration** - How long have you been taking your current daily dose?
10. **Feel Stable** - Do you feel stable on your current daily dose?

#### Opioid Use Details (if not "never used")
11. **Opioid Duration** - How long have you been using opioids (not including Suboxone)?
12. **Opioid Frequency** - How frequently are you using opioids?
13. **Heroin/Fentanyl Use** - Are you using heroin or fentanyl on a regular basis?

#### General Assessment
14. **Difficulties** - In the past two months, have you had difficulty with any of the following?
    - Multiple checkbox options for various life difficulties

#### Insurance & Readiness
15. **Insurance** - Are you insured? (with insurance provider selection if yes)
16. **Reason for Joining** - Why do you want to join empower? (text area)
17. **Treatment Timeline** - How soon are you interested in starting treatment?

#### Final Steps
18. **Appointment Scheduling** - Choose a time for your free 15-minute welcome call
19. **Confirmation** - Final confirmation and next steps

## Conditional Logic Flow

1. If `opioiduse === 'never-used'` → Skip to Difficulties step
2. If `relationshipwithSuboxone === 'never-taken'` → Skip Suboxone detail questions
3. If `relationshipwithSuboxone === 'currently-taking' || 'taken-past'` → Show Suboxone detail questions
4. If not in Ohio → Show "We'll text you when we launch" message
5. If only treating opioid use disorder → Show appropriate message for other conditions

## Form Validation Rules
- All radio button questions are required
- Text inputs (days remaining, reason for joining) have character limits
- Insurance provider selection only shown if insured === 'yes'
- Phone/email verification required before proceeding