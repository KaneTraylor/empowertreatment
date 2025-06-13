'use client';

import { lazy, Suspense } from 'react';
import { useMultiStepForm } from '@/hooks/useMultiStepForm';
import { ProgressBar } from './ProgressBar';
import { StepConfig } from '@/types/form';
import { AnimatedStep } from './AnimatedStep';
import { motion } from 'framer-motion';

// Lazy load form steps for better performance
const LocationStep = lazy(() => import('./steps/LocationStep').then(m => ({ default: m.LocationStep })));
const OTPStep = lazy(() => import('./steps/OTPStep').then(m => ({ default: m.OTPStep })));
const ReferralStep = lazy(() => import('./steps/ReferralStep').then(m => ({ default: m.ReferralStep })));
const OpioidUseStep = lazy(() => import('./steps/OpioidUseStep').then(m => ({ default: m.OpioidUseStep })));
const SuboxoneStep = lazy(() => import('./steps/SuboxoneStep').then(m => ({ default: m.SuboxoneStep })));
const SuboxoneLastWeekStep = lazy(() => import('./steps/SuboxoneLastWeekStep').then(m => ({ default: m.SuboxoneLastWeekStep })));
const SuboxonePrescribedStep = lazy(() => import('./steps/SuboxonePrescribedStep').then(m => ({ default: m.SuboxonePrescribedStep })));
const SuboxoneDaysStep = lazy(() => import('./steps/SuboxoneDaysStep').then(m => ({ default: m.SuboxoneDaysStep })));
const SuboxoneDailyDoseStep = lazy(() => import('./steps/SuboxoneDailyDoseStep').then(m => ({ default: m.SuboxoneDailyDoseStep })));
const SuboxoneStableStep = lazy(() => import('./steps/SuboxoneStableStep').then(m => ({ default: m.SuboxoneStableStep })));
const OpioidDurationStep = lazy(() => import('./steps/OpioidDurationStep').then(m => ({ default: m.OpioidDurationStep })));
const OpioidFrequencyStep = lazy(() => import('./steps/OpioidFrequencyStep').then(m => ({ default: m.OpioidFrequencyStep })));
const HeroinUseStep = lazy(() => import('./steps/HeroinUseStep').then(m => ({ default: m.HeroinUseStep })));
const DifficultiesStep = lazy(() => import('./steps/DifficultiesStep').then(m => ({ default: m.DifficultiesStep })));
const InsuranceStep = lazy(() => import('./steps/InsuranceStep').then(m => ({ default: m.InsuranceStep })));
const ReasonStep = lazy(() => import('./steps/ReasonStep').then(m => ({ default: m.ReasonStep })));
const TreatmentTimelineStep = lazy(() => import('./steps/TreatmentTimelineStep').then(m => ({ default: m.TreatmentTimelineStep })));
// Change this line to switch between calendar options:
// Option 1: Custom Calendar
// const SchedulingStep = lazy(() => import('./steps/SchedulingStep').then(m => ({ default: m.SchedulingStep })));
// Option 2: Calendly
// const SchedulingStep = lazy(() => import('./steps/CalendlyStep').then(m => ({ default: m.CalendlyStep })));
// Option 3: Google Calendar (Active)
const SchedulingStep = lazy(() => import('./steps/GoogleCalendarStep').then(m => ({ default: m.GoogleCalendarStep })));
const CompletionStep = lazy(() => import('./steps/CompletionStep').then(m => ({ default: m.CompletionStep })));

// Define all possible steps
const allFormSteps: StepConfig[] = [
  // Basic Info
  {
    id: 'location',
    title: 'Location',
    component: LocationStep,
  },
  {
    id: 'otp',
    title: 'Verification',
    component: OTPStep,
  },
  {
    id: 'referral',
    title: 'Referral',
    component: ReferralStep,
  },
  // Opioid Assessment
  {
    id: 'opioid-use',
    title: 'Opioid Use',
    component: OpioidUseStep,
  },
  {
    id: 'suboxone',
    title: 'Suboxone History',
    component: SuboxoneStep,
  },
  // Conditional Suboxone Details
  {
    id: 'suboxone-last-week',
    title: 'Recent Use',
    component: SuboxoneLastWeekStep,
  },
  {
    id: 'suboxone-prescribed',
    title: 'Prescription',
    component: SuboxonePrescribedStep,
  },
  {
    id: 'suboxone-days',
    title: 'Days Remaining',
    component: SuboxoneDaysStep,
  },
  {
    id: 'suboxone-daily-dose',
    title: 'Daily Dose Duration',
    component: SuboxoneDailyDoseStep,
  },
  {
    id: 'suboxone-stable',
    title: 'Stability',
    component: SuboxoneStableStep,
  },
  // Opioid Use Details
  {
    id: 'opioid-duration',
    title: 'Opioid Duration',
    component: OpioidDurationStep,
  },
  {
    id: 'opioid-frequency',
    title: 'Opioid Frequency',
    component: OpioidFrequencyStep,
  },
  {
    id: 'heroin-use',
    title: 'Heroin/Fentanyl Use',
    component: HeroinUseStep,
  },
  // General Assessment
  {
    id: 'difficulties',
    title: 'Life Difficulties',
    component: DifficultiesStep,
  },
  {
    id: 'insurance',
    title: 'Insurance',
    component: InsuranceStep,
  },
  {
    id: 'reason',
    title: 'Your Why',
    component: ReasonStep,
  },
  {
    id: 'treatment-timeline',
    title: 'Timeline',
    component: TreatmentTimelineStep,
  },
  {
    id: 'scheduling',
    title: 'Schedule',
    component: SchedulingStep,
  },
  {
    id: 'completion',
    title: 'Complete',
    component: CompletionStep,
  },
];

export function MultiStepForm() {
  const {
    currentStep,
    formData,
    updateFormData,
    goToNextStep,
    goToPreviousStep,
    goToStep,
  } = useMultiStepForm();

  // Determine which steps to show based on user's answers
  const getActiveSteps = () => {
    const steps: StepConfig[] = [];
    
    // Always show basic info steps (0-3)
    steps.push(...allFormSteps.slice(0, 4));
    
    // Show Suboxone step only if user has used opioids
    if (formData.opioiduse !== 'never-used') {
      steps.push(allFormSteps[4]); // Suboxone History
      
      // Add Suboxone detail steps if user has taken it
      if (formData.relationshipwithSuboxone === 'currently-taking' || 
          formData.relationshipwithSuboxone === 'taken-past') {
        steps.push(...allFormSteps.slice(5, 10)); // All Suboxone detail steps
      }
      
      // Add opioid use detail steps
      steps.push(...allFormSteps.slice(10, 13)); // Opioid duration, frequency, heroin use
    }
    
    // Always show general assessment steps at the end
    steps.push(...allFormSteps.slice(13)); // Difficulties, Insurance, Reason, Timeline
    
    return steps;
  };

  const activeSteps = getActiveSteps();
  const CurrentStepComponent = activeSteps[currentStep]?.component;

  if (!CurrentStepComponent) {
    return <div>Step not found</div>;
  }

  // Determine the actual next step based on form data
  const determineNextStep = async () => {
    const currentStepId = activeSteps[currentStep].id;

    // Handle conditional navigation
    if (currentStepId === 'location') {
      if (formData.stateselect !== 'Ohio') {
        // Show "not in your state" message
        // You might want to create a special component for this
      }
      
      // Send OTP before moving to OTP step
      if (formData.email || formData.mobileNumber) {
        try {
          const response = await fetch('/api/send-sms', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              phone: formData.mobileNumber,
              email: formData.email,
            }),
          });
          
          if (!response.ok) {
            const error = await response.json();
            console.error('Failed to send OTP:', error.message);
            // You might want to show an error to the user here
            return;
          }
        } catch (error) {
          console.error('Failed to send OTP:', error);
          // You might want to show an error to the user here
          return;
        }
      }
      
      goToNextStep();
    } else if (currentStepId === 'otp') {
      goToNextStep();
    } else if (currentStepId === 'opioid-use') {
      // Skip suboxone questions if user never used opioids
      if (formData.opioiduse === 'never-used') {
        // Jump to a later step (we'll add more steps later)
        goToNextStep();
      } else {
        goToNextStep();
      }
    } else if (currentStepId === 'suboxone') {
      // Navigation is handled by dynamic step generation
      goToNextStep();
    } else if (currentStepId === 'completion') {
      // Don't go anywhere from completion
      return;
    }
    // Default navigation
    else {
      goToNextStep();
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto px-0 md:px-6">
      {currentStep > 0 && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="px-4 md:px-0 mb-4"
        >
          <ProgressBar currentStep={currentStep} totalSteps={activeSteps.length} />
        </motion.div>
      )}
      
      <motion.div 
        className="bg-white md:rounded-lg md:shadow-lg p-6 md:p-10 lg:p-12"
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        <Suspense fallback={
          <div className="flex items-center justify-center h-64">
            <motion.div 
              className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"
              animate={{ rotate: 360 }}
              transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
          </div>
        }>
          <AnimatedStep stepKey={activeSteps[currentStep]?.id || ''}>
            <CurrentStepComponent
              data={formData}
              updateData={updateFormData}
              onNext={determineNextStep}
              onBack={goToPreviousStep}
              isFirstStep={currentStep === 0}
              isLastStep={currentStep === activeSteps.length - 1}
            />
          </AnimatedStep>
        </Suspense>
      </motion.div>
    </div>
  );
}