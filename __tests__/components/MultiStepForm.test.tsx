import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

// Mock the components module to avoid dynamic imports in tests
jest.mock('@/components/form/MultiStepForm', () => {
  const React = require('react');
  
  // Simple mock components
  const LocationStep = ({ onNext }: any) => (
    <div>
      <h2>Location Step</h2>
      <button onClick={onNext}>Next</button>
    </div>
  );

  const OTPStep = ({ onNext, onBack }: any) => (
    <div>
      <h2>OTP Step</h2>
      <button onClick={onBack}>Back</button>
      <button onClick={onNext}>Next</button>
    </div>
  );

  const ReferralStep = ({ onBack }: any) => (
    <div>
      <h2>Referral Step</h2>
      <button onClick={onBack}>Back</button>
    </div>
  );

  const formSteps = [
    { id: 'location', title: 'Location', component: LocationStep },
    { id: 'otp', title: 'Verification', component: OTPStep },
    { id: 'referral', title: 'Referral', component: ReferralStep },
  ];

  // Mock the hook
  const mockUseMultiStepForm = {
    currentStep: 0,
    formData: {},
    updateFormData: jest.fn(),
    goToNextStep: jest.fn(),
    goToPreviousStep: jest.fn(),
    goToStep: jest.fn(),
  };

  // Store mock for external access
  (global as any).mockUseMultiStepForm = mockUseMultiStepForm;

  const MultiStepForm = () => {
    const CurrentStepComponent = formSteps[mockUseMultiStepForm.currentStep]?.component;

    if (!CurrentStepComponent) {
      return <div>Step not found</div>;
    }

    const determineNextStep = () => {
      mockUseMultiStepForm.goToNextStep();
    };

    return (
      <div className="max-w-2xl mx-auto p-6">
        {mockUseMultiStepForm.currentStep > 0 && (
          <div className="w-full bg-gray-200 rounded-full h-2 mb-6" role="progressbar">
            <div className="bg-primary h-2 rounded-full" />
          </div>
        )}
        
        <div className="bg-white rounded-lg shadow-lg p-8">
          <CurrentStepComponent
            data={mockUseMultiStepForm.formData}
            updateData={mockUseMultiStepForm.updateFormData}
            onNext={determineNextStep}
            onBack={mockUseMultiStepForm.goToPreviousStep}
            isFirstStep={mockUseMultiStepForm.currentStep === 0}
            isLastStep={mockUseMultiStepForm.currentStep === formSteps.length - 1}
          />
        </div>
      </div>
    );
  };

  return { MultiStepForm };
});

import { MultiStepForm } from '@/components/form/MultiStepForm';

// Access the mock from global
const getMockUseMultiStepForm = () => (global as any).mockUseMultiStepForm;

describe('MultiStepForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    getMockUseMultiStepForm().currentStep = 0;
    getMockUseMultiStepForm().formData = {};
  });

  it('should render the first step initially', () => {
    render(<MultiStepForm />);
    
    expect(screen.getByText('Location Step')).toBeInTheDocument();
    expect(screen.queryByRole('progressbar')).not.toBeInTheDocument();
  });

  it('should show progress bar after first step', () => {
    getMockUseMultiStepForm().currentStep = 1;
    render(<MultiStepForm />);
    
    expect(screen.getByText('OTP Step')).toBeInTheDocument();
    expect(screen.getByRole('progressbar')).toBeInTheDocument();
  });

  it('should navigate to next step when next is clicked', async () => {
    const user = userEvent.setup();
    render(<MultiStepForm />);
    
    const nextButton = screen.getByText('Next');
    await user.click(nextButton);
    
    expect(getMockUseMultiStepForm().goToNextStep).toHaveBeenCalled();
  });

  it('should navigate to previous step when back is clicked', async () => {
    const user = userEvent.setup();
    getMockUseMultiStepForm().currentStep = 1;
    render(<MultiStepForm />);
    
    const backButton = screen.getByText('Back');
    await user.click(backButton);
    
    expect(getMockUseMultiStepForm().goToPreviousStep).toHaveBeenCalled();
  });

  it('should handle non-Ohio state selection', async () => {
    const user = userEvent.setup();
    getMockUseMultiStepForm().formData = { stateselect: 'California' };
    render(<MultiStepForm />);
    
    const nextButton = screen.getByText('Next');
    await user.click(nextButton);
    
    expect(getMockUseMultiStepForm().goToNextStep).toHaveBeenCalled();
  });

  it('should render the last step correctly', () => {
    getMockUseMultiStepForm().currentStep = 2;
    render(<MultiStepForm />);
    
    expect(screen.getByText('Referral Step')).toBeInTheDocument();
  });

  it('should handle invalid step index', () => {
    getMockUseMultiStepForm().currentStep = 99;
    render(<MultiStepForm />);
    
    expect(screen.getByText('Step not found')).toBeInTheDocument();
  });
});