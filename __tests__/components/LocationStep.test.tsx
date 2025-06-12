import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { LocationStep } from '@/components/form/steps/LocationStep';

// Helper component to manage state for testing
const LocationStepWrapper = ({ onNext = jest.fn(), onBack = jest.fn() }) => {
  const [data, setData] = React.useState({
    stateselect: '',
    email: '',
    mobileNumber: '',
  });

  const updateData = (updates: any) => {
    setData(prev => ({ ...prev, ...updates }));
  };

  return (
    <LocationStep
      data={data}
      updateData={updateData}
      onNext={onNext}
      onBack={onBack}
      isFirstStep={true}
      isLastStep={false}
    />
  );
};

describe('LocationStep', () => {
  it('should render state selection field initially', () => {
    render(<LocationStepWrapper />);
    
    expect(screen.getByText('Where do you live?')).toBeInTheDocument();
    expect(screen.getByText('Primary state of residence')).toBeInTheDocument();
    expect(screen.getByRole('combobox')).toBeInTheDocument();
    // Email and phone fields are not shown until state is selected
    expect(screen.queryByText('Email')).not.toBeInTheDocument();
    expect(screen.queryByText('Phone number')).not.toBeInTheDocument();
  });

  it('should disable Next button when no state is selected', () => {
    render(<LocationStepWrapper />);
    
    const nextButton = screen.getByText('Next');
    expect(nextButton).toBeDisabled();
  });

  it('should show email and phone fields after selecting Ohio', async () => {
    const user = userEvent.setup();
    render(<LocationStepWrapper />);
    
    // Select state
    const stateSelect = screen.getByRole('combobox');
    await user.selectOptions(stateSelect, 'Ohio');
    
    // Now email and phone fields should be visible
    await waitFor(() => {
      expect(screen.getByText('🎉 We serve your state')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('company@company.com')).toBeInTheDocument();
      expect(screen.getByPlaceholderText('+1 (XXX) XXX - XXXX')).toBeInTheDocument();
      expect(screen.getAllByText('(optional)')).toHaveLength(2);
    });
  });

  it('should show different message for non-Ohio state', async () => {
    const user = userEvent.setup();
    render(<LocationStepWrapper />);
    
    // Select non-Ohio state
    const stateSelect = screen.getByRole('combobox');
    await user.selectOptions(stateSelect, 'California');
    
    await waitFor(() => {
      expect(screen.getByText("We're not licensed in your state yet")).toBeInTheDocument();
      expect(screen.getByText('Get notified when we launch in California')).toBeInTheDocument();
    });
  });

  it('should validate that at least email or phone is provided after state selection', async () => {
    const user = userEvent.setup();
    render(<LocationStepWrapper />);
    
    // Select state first
    const stateSelect = screen.getByRole('combobox');
    await user.selectOptions(stateSelect, 'Ohio');
    
    // Wait for fields to appear
    await waitFor(() => {
      expect(screen.getByPlaceholderText('company@company.com')).toBeInTheDocument();
    });
    
    // Try to submit without email and phone
    const nextButton = screen.getByText('Next');
    await user.click(nextButton);
    
    await waitFor(() => {
      expect(screen.getByText('Please provide either an email or phone number')).toBeInTheDocument();
    });
  });

  it('should accept just email without phone', async () => {
    const user = userEvent.setup();
    const mockOnNext = jest.fn();
    render(<LocationStepWrapper onNext={mockOnNext} />);
    
    // Select state
    const stateSelect = screen.getByRole('combobox');
    await user.selectOptions(stateSelect, 'Ohio');
    
    // Wait for fields to appear
    await waitFor(() => {
      expect(screen.getByPlaceholderText('company@company.com')).toBeInTheDocument();
    });
    
    // Enter only email (no phone)
    const emailInput = screen.getByPlaceholderText('company@company.com');
    await user.type(emailInput, 'test@example.com');
    
    // Try to submit
    const nextButton = screen.getByText('Next');
    await user.click(nextButton);
    
    await waitFor(() => {
      expect(mockOnNext).toHaveBeenCalled();
    });
  });

  it('should accept just phone without email', async () => {
    const user = userEvent.setup();
    const mockOnNext = jest.fn();
    render(<LocationStepWrapper onNext={mockOnNext} />);
    
    // Select state
    const stateSelect = screen.getByRole('combobox');
    await user.selectOptions(stateSelect, 'Ohio');
    
    // Wait for fields to appear
    await waitFor(() => {
      expect(screen.getByPlaceholderText('+1 (XXX) XXX - XXXX')).toBeInTheDocument();
    });
    
    // Enter only phone (no email)
    const phoneInput = screen.getByPlaceholderText('+1 (XXX) XXX - XXXX');
    await user.type(phoneInput, '5551234567');
    
    // Try to submit
    const nextButton = screen.getByText('Next');
    await user.click(nextButton);
    
    await waitFor(() => {
      expect(mockOnNext).toHaveBeenCalled();
    });
  });

  it('should validate email format when provided', async () => {
    const user = userEvent.setup();
    render(<LocationStepWrapper />);
    
    // Select state
    const stateSelect = screen.getByRole('combobox');
    await user.selectOptions(stateSelect, 'Ohio');
    
    // Wait for fields to appear
    await waitFor(() => {
      expect(screen.getByPlaceholderText('company@company.com')).toBeInTheDocument();
    });
    
    // Enter invalid email (no phone)
    const emailInput = screen.getByPlaceholderText('company@company.com');
    await user.type(emailInput, 'invalid-email');
    
    // Try to submit
    const nextButton = screen.getByText('Next');
    await user.click(nextButton);
    
    await waitFor(() => {
      expect(screen.getByText('Email is invalid')).toBeInTheDocument();
    });
  });

  it('should validate phone number length when provided', async () => {
    const user = userEvent.setup();
    render(<LocationStepWrapper />);
    
    // Select state
    const stateSelect = screen.getByRole('combobox');
    await user.selectOptions(stateSelect, 'Ohio');
    
    // Wait for fields to appear
    await waitFor(() => {
      expect(screen.getByPlaceholderText('+1 (XXX) XXX - XXXX')).toBeInTheDocument();
    });
    
    // Enter short phone (no email)
    const phoneInput = screen.getByPlaceholderText('+1 (XXX) XXX - XXXX');
    await user.type(phoneInput, '123');
    
    // Try to submit
    const nextButton = screen.getByText('Next');
    await user.click(nextButton);
    
    await waitFor(() => {
      expect(screen.getByText('Phone number must be 10 digits')).toBeInTheDocument();
    });
  });

  it('should call onNext with valid data', async () => {
    const user = userEvent.setup();
    const mockOnNext = jest.fn();
    render(<LocationStepWrapper onNext={mockOnNext} />);
    
    // Select state
    const stateSelect = screen.getByRole('combobox');
    await user.selectOptions(stateSelect, 'Ohio');
    
    // Wait for fields to appear
    await waitFor(() => {
      expect(screen.getByPlaceholderText('company@company.com')).toBeInTheDocument();
    });
    
    // Enter email
    const emailInput = screen.getByPlaceholderText('company@company.com');
    await user.type(emailInput, 'test@example.com');
    
    // Enter phone
    const phoneInput = screen.getByPlaceholderText('+1 (XXX) XXX - XXXX');
    await user.type(phoneInput, '5551234567');
    
    // Submit
    const nextButton = screen.getByText('Next');
    await user.click(nextButton);
    
    await waitFor(() => {
      expect(mockOnNext).toHaveBeenCalled();
    });
  });

  it('should not show back button on first step', () => {
    render(<LocationStepWrapper />);
    
    expect(screen.queryByText('Back')).not.toBeInTheDocument();
  });
});