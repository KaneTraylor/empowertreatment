export interface FormData {
  // Location Information
  stateselect: string;
  
  // Contact Information
  email: string;
  mobileNumber: string;
  firstName: string;
  lastName: string;
  
  // Referral Information
  offer: 'yes' | 'no' | '';
  providerName?: string;
  
  // Opioid Use Information
  opioiduse: 'no-control' | 'under-control' | 'never-used' | '';
  relationshipwithSuboxone: 'currently-taking' | 'taken-past' | 'never-taken' | '';
  Suboxonelastweek?: 'yes' | 'no' | '';
  prescribedbymedical?: 'yes' | 'no' | '';
  days?: string;
  takingdailySuboxone?: 'yes' | 'no' | 'not-sure' | '';
  feelstable?: 'yes' | 'no' | '';
  notincludingSuboxone?: 'none' | 'less-week' | 'week-month' | 'month-more' | '';
  frequentlyusingopioids?: 'none' | 'less-week' | 'week-month' | 'month-more' | '';
  usingheroin?: 'yes' | 'no' | '';
  
  // Difficulties
  difficultyfollowing: string[];
  
  // Insurance
  youinsured: 'yes' | 'no' | '';
  insuranceselect?: string;
  
  // Treatment Readiness
  reasonJoiningEmpower: string;
  interestedintreatment: 'asap' | 'few-weeks' | '';
  
  // Appointment
  appointmentNotification?: boolean;
  appointmentDate?: string;
  appointmentTime?: string;
  appointmentDateTime?: string;
}

export interface StepConfig {
  id: string;
  title: string;
  description?: string;
  component: React.ComponentType<StepProps>;
  validate?: (data: FormData) => boolean;
  nextStep?: (data: FormData) => string | null;
}

export interface StepProps {
  data: FormData;
  updateData: (updates: Partial<FormData>) => void;
  onNext: () => void;
  onBack: () => void;
  isFirstStep: boolean;
  isLastStep: boolean;
}