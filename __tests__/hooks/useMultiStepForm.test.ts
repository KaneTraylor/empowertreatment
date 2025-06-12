import { renderHook, act } from '@testing-library/react';
import { useMultiStepForm } from '@/hooks/useMultiStepForm';

// Mock localStorage
const localStorageMock = (() => {
  let store: { [key: string]: string } = {};
  
  return {
    getItem: jest.fn((key: string) => store[key] || null),
    setItem: jest.fn((key: string, value: string) => {
      store[key] = value;
    }),
    removeItem: jest.fn((key: string) => {
      delete store[key];
    }),
    clear: jest.fn(() => {
      store = {};
    }),
  };
})();

Object.defineProperty(window, 'localStorage', {
  value: localStorageMock,
});

describe('useMultiStepForm', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorage.clear();
  });

  it('should initialize with default values', () => {
    const { result } = renderHook(() => useMultiStepForm());

    expect(result.current.currentStep).toBe(0);
    expect(result.current.formData).toEqual({
      stateselect: '',
      email: '',
      mobileNumber: '',
      fname: '',
      lname: '',
      offer: '',
      opioiduse: '',
      relationshipwithSuboxone: '',
      difficultyfollowing: [],
      youinsured: '',
      reasonJoiningEmpower: '',
      interestedintreatment: '',
    });
    expect(result.current.stepHistory).toEqual([0]);
  });

  it('should load saved form data from localStorage', () => {
    const savedData = {
      stateselect: 'Ohio',
      email: 'test@example.com',
      fname: 'John',
    };
    // Set the data in localStorage before rendering the hook
    localStorageMock.setItem('empower-treatment-form-data', JSON.stringify(savedData));

    const { result } = renderHook(() => useMultiStepForm());

    expect(result.current.formData.stateselect).toBe('Ohio');
    expect(result.current.formData.email).toBe('test@example.com');
    expect(result.current.formData.fname).toBe('John');
  });

  it('should update form data', () => {
    const { result } = renderHook(() => useMultiStepForm());

    act(() => {
      result.current.updateFormData({
        stateselect: 'Ohio',
        email: 'test@example.com',
      });
    });

    expect(result.current.formData.stateselect).toBe('Ohio');
    expect(result.current.formData.email).toBe('test@example.com');
    expect(localStorageMock.setItem).toHaveBeenCalled();
  });

  it('should navigate to next step', () => {
    const { result } = renderHook(() => useMultiStepForm());

    act(() => {
      result.current.goToNextStep();
    });

    expect(result.current.currentStep).toBe(1);
    expect(result.current.stepHistory).toEqual([0, 1]);
  });

  it('should navigate to previous step', () => {
    const { result } = renderHook(() => useMultiStepForm());

    // First go to step 1
    act(() => {
      result.current.goToNextStep();
    });

    // Then go back
    act(() => {
      result.current.goToPreviousStep();
    });

    expect(result.current.currentStep).toBe(0);
    expect(result.current.stepHistory).toEqual([0]);
  });

  it('should not go back if on first step', () => {
    const { result } = renderHook(() => useMultiStepForm());

    act(() => {
      result.current.goToPreviousStep();
    });

    expect(result.current.currentStep).toBe(0);
    expect(result.current.stepHistory).toEqual([0]);
  });

  it('should go to specific step', () => {
    const { result } = renderHook(() => useMultiStepForm());

    act(() => {
      result.current.goToStep(3);
    });

    expect(result.current.currentStep).toBe(3);
    expect(result.current.stepHistory).toEqual([0, 3]);
  });

  it('should reset form', () => {
    const { result } = renderHook(() => useMultiStepForm());

    // Add some data and navigate
    act(() => {
      result.current.updateFormData({ stateselect: 'Ohio' });
      result.current.goToNextStep();
    });

    // Reset
    act(() => {
      result.current.resetForm();
    });

    expect(result.current.currentStep).toBe(0);
    expect(result.current.formData.stateselect).toBe('');
    expect(result.current.stepHistory).toEqual([0]);
    expect(localStorageMock.removeItem).toHaveBeenCalledWith('empower-treatment-form-data');
  });
});