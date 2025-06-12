import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { OTPStep } from '@/components/form/steps/OTPStep';

// Mock fetch
global.fetch = jest.fn();

describe('OTPStep', () => {
  const mockOnNext = jest.fn();
  const mockOnBack = jest.fn();
  const mockUpdateData = jest.fn();
  
  const defaultProps = {
    data: {
      email: 'test@example.com',
      mobileNumber: '5551234567',
    },
    updateData: mockUpdateData,
    onNext: mockOnNext,
    onBack: mockOnBack,
    isFirstStep: false,
    isLastStep: false,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (global.fetch as jest.Mock).mockClear();
  });

  it('should render OTP input fields', () => {
    render(<OTPStep {...defaultProps} />);
    
    const inputs = screen.getAllByRole('textbox');
    expect(inputs).toHaveLength(6);
  });

  it('should auto-focus next input when digit is entered', async () => {
    const user = userEvent.setup();
    render(<OTPStep {...defaultProps} />);
    
    const inputs = screen.getAllByRole('textbox');
    
    await user.type(inputs[0], '1');
    expect(inputs[1]).toHaveFocus();
    
    await user.type(inputs[1], '2');
    expect(inputs[2]).toHaveFocus();
  });

  it('should handle backspace to focus previous input', async () => {
    const user = userEvent.setup();
    render(<OTPStep {...defaultProps} />);
    
    const inputs = screen.getAllByRole('textbox');
    
    // Type in first two inputs
    await user.type(inputs[0], '1');
    await user.type(inputs[1], '2');
    
    // Backspace on third input should focus second
    await user.type(inputs[2], '{backspace}');
    expect(inputs[1]).toHaveFocus();
  });

  it('should handle paste of 6-digit code', async () => {
    const user = userEvent.setup();
    render(<OTPStep {...defaultProps} />);
    
    const inputs = screen.getAllByRole('textbox');
    
    // Paste full OTP
    await user.click(inputs[0]);
    await user.paste('123456');
    
    // Check all inputs are filled
    expect(inputs[0]).toHaveValue('1');
    expect(inputs[1]).toHaveValue('2');
    expect(inputs[2]).toHaveValue('3');
    expect(inputs[3]).toHaveValue('4');
    expect(inputs[4]).toHaveValue('5');
    expect(inputs[5]).toHaveValue('6');
  });

  it('should only accept numeric input', async () => {
    const user = userEvent.setup();
    render(<OTPStep {...defaultProps} />);
    
    const inputs = screen.getAllByRole('textbox');
    
    await user.type(inputs[0], 'a');
    expect(inputs[0]).toHaveValue('');
    
    await user.type(inputs[0], '1');
    expect(inputs[0]).toHaveValue('1');
  });

  it('should verify OTP successfully', async () => {
    const user = userEvent.setup();
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: true,
      json: async () => ({ success: true }),
    });
    
    render(<OTPStep {...defaultProps} />);
    
    const inputs = screen.getAllByRole('textbox');
    
    // Enter OTP
    for (let i = 0; i < 6; i++) {
      await user.type(inputs[i], String(i + 1));
    }
    
    // Submit
    const submitButton = screen.getByText('Submit');
    await user.click(submitButton);
    
    await waitFor(() => {
      expect(global.fetch).toHaveBeenCalledWith('/api/verify-otp', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ otp: '123456' }),
      });
      expect(mockOnNext).toHaveBeenCalled();
    });
  });

  it('should show error for invalid OTP', async () => {
    const user = userEvent.setup();
    (global.fetch as jest.Mock).mockResolvedValueOnce({
      ok: false,
      json: async () => ({ success: false, message: 'Invalid OTP' }),
    });
    
    render(<OTPStep {...defaultProps} />);
    
    const inputs = screen.getAllByRole('textbox');
    
    // Enter OTP
    for (let i = 0; i < 6; i++) {
      await user.type(inputs[i], '9');
    }
    
    // Submit
    const submitButton = screen.getByText('Submit');
    await user.click(submitButton);
    
    await waitFor(() => {
      expect(screen.getByText('Invalid OTP. Please try again.')).toBeInTheDocument();
      expect(mockOnNext).not.toHaveBeenCalled();
    });
  });

  it('should disable submit button when OTP is incomplete', () => {
    render(<OTPStep {...defaultProps} />);
    
    const submitButton = screen.getByText('Submit');
    expect(submitButton).toBeDisabled();
  });

  it('should enable submit button when OTP is complete', async () => {
    const user = userEvent.setup();
    render(<OTPStep {...defaultProps} />);
    
    const inputs = screen.getAllByRole('textbox');
    const submitButton = screen.getByText('Submit');
    
    // Enter full OTP
    for (let i = 0; i < 6; i++) {
      await user.type(inputs[i], String(i + 1));
    }
    
    expect(submitButton).not.toBeDisabled();
  });
});