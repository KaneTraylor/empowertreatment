import { useState, useCallback, useEffect } from 'react';
import { FormData } from '@/types/form';

const STORAGE_KEY = 'empower-treatment-form-data';

const initialFormData: FormData = {
  stateselect: '',
  email: '',
  mobileNumber: '',
  firstName: '',
  lastName: '',
  offer: '',
  opioiduse: '',
  relationshipwithSuboxone: '',
  difficultyfollowing: [],
  youinsured: '',
  reasonJoiningEmpower: '',
  interestedintreatment: '',
};

export function useMultiStepForm() {
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState<FormData>(initialFormData);
  const [stepHistory, setStepHistory] = useState<number[]>([0]);

  // Load saved form data from localStorage
  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsedData = JSON.parse(saved);
        setFormData({ ...initialFormData, ...parsedData });
      } catch (error) {
        console.error('Failed to load saved form data:', error);
      }
    }
  }, []);

  // Save form data to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
  }, [formData]);

  const updateFormData = useCallback((updates: Partial<FormData>) => {
    setFormData(prev => ({ ...prev, ...updates }));
  }, []);

  const goToStep = useCallback((step: number) => {
    setStepHistory(prev => [...prev, step]);
    setCurrentStep(step);
  }, []);

  const goToNextStep = useCallback(() => {
    const nextStep = currentStep + 1;
    goToStep(nextStep);
  }, [currentStep, goToStep]);

  const goToPreviousStep = useCallback(() => {
    if (stepHistory.length > 1) {
      const newHistory = [...stepHistory];
      newHistory.pop(); // Remove current step
      const previousStep = newHistory[newHistory.length - 1];
      setStepHistory(newHistory);
      setCurrentStep(previousStep);
    }
  }, [stepHistory]);

  const resetForm = useCallback(() => {
    setFormData(initialFormData);
    setCurrentStep(0);
    setStepHistory([0]);
    localStorage.removeItem(STORAGE_KEY);
  }, []);

  return {
    currentStep,
    formData,
    updateFormData,
    goToNextStep,
    goToPreviousStep,
    goToStep,
    resetForm,
    stepHistory,
  };
}