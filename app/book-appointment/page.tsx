'use client';

import { useState } from 'react';
import { Header } from '@/components/Header';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';
import Image from 'next/image';

// Clinician data
const clinicians = [
  {
    id: 'sara',
    name: 'Sara',
    title: 'Nurse Practitioner (NP)',
    specialties: ['Medication Management', 'Mental Health Assessment', 'Psychiatric Evaluation'],
    bio: 'Specializes in medication management and comprehensive mental health treatment.',
    image: '/clinicians/sara.jpg', // You'll add this
    calendarUrl: 'https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ0jrg-D9avjhLEjQrGEp5Uc5YXk98oJHlj0_hpmNOH65UZmJQrgQ0hOsmwYyHitcm_0C8q9Kji3'
  },
  {
    id: 'kelsey',
    name: 'Kelsey',
    title: 'LCDC III',
    specialties: ['Substance Use Counseling', 'Individual Therapy', 'Recovery Support'],
    bio: 'Licensed Chemical Dependency Counselor specializing in addiction recovery.',
    image: '/clinicians/kelsey.jpg', // You'll add this
    calendarUrl: 'https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ0Kqy_5aHsCOvckFOVAwHN6q1aa_DiMI_HesQ_sXZYMHfTihmjP3OeC1_Ddqb080io2s0Gq86in'
  },
  {
    id: 'alex',
    name: 'Alex',
    title: 'CDCA',
    specialties: ['Chemical Dependency Counseling', 'Group Therapy', 'Peer Support'],
    bio: 'Certified Chemical Dependency Counselor Assistant focused on group therapy and peer support.',
    image: '/clinicians/alex.jpg', // You'll add this
    calendarUrl: 'https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ1Pte65Q0yMwEr3DYPV6lkSZ6lgA2gQKtW-OE8EheavEQVY-gCE0_T_LhvIqfH1qvm3fwxFFvyQ'
  }
];

const assessmentCalendar = {
  id: 'assessment',
  name: 'Initial Assessment Team',
  title: 'New Patient Evaluation',
  specialties: ['Comprehensive Assessment', 'Treatment Planning', 'Insurance Verification'],
  bio: 'Our assessment team will evaluate your needs and create a personalized treatment plan.',
  image: '/clinicians/team.jpg', // You'll add this
  calendarUrl: 'https://calendar.google.com/calendar/u/0/appointments/schedules/AcZssZ1poUjTRWAGf1Md3gDKPh7_FI4xD8abtrN2_-b-kcKCx-W-yTYzOAsJ8VddgYydJQPbCEf6NPBz'
};

type Step = 'patient-type' | 'need-selection' | 'clinician-selection' | 'booking';

export default function BookAppointment() {
  const [currentStep, setCurrentStep] = useState<Step>('patient-type');
  const [patientType, setPatientType] = useState<'new' | 'existing' | null>(null);
  const [selectedNeed, setSelectedNeed] = useState<string | null>(null);
  const [selectedClinician, setSelectedClinician] = useState<any>(null);
  const [showCalendar, setShowCalendar] = useState(false);

  // Need-based routing logic
  const needsMapping = {
    'medication': ['sara'],
    'substance-use': ['kelsey', 'alex'],
    'mental-health': ['sara', 'kelsey'],
    'group-therapy': ['alex'],
    'assessment': ['assessment']
  };

  const handlePatientType = (type: 'new' | 'existing') => {
    setPatientType(type);
    if (type === 'new') {
      // New patients go straight to assessment
      setSelectedClinician(assessmentCalendar);
      setCurrentStep('booking');
    } else {
      setCurrentStep('need-selection');
    }
  };

  const handleNeedSelection = (need: string) => {
    setSelectedNeed(need);
    const recommendedClinicians = needsMapping[need as keyof typeof needsMapping] || [];
    
    if (recommendedClinicians.length === 1) {
      // If only one clinician for this need, skip selection
      const clinicianId = recommendedClinicians[0];
      const clinician = clinicianId === 'assessment' 
        ? assessmentCalendar 
        : clinicians.find(c => c.id === clinicianId);
      setSelectedClinician(clinician);
      setCurrentStep('booking');
    } else {
      setCurrentStep('clinician-selection');
    }
  };

  const getRecommendedClinicians = () => {
    if (!selectedNeed) return clinicians;
    const recommendedIds = needsMapping[selectedNeed as keyof typeof needsMapping] || [];
    return clinicians.filter(c => recommendedIds.includes(c.id));
  };

  const handleBack = () => {
    if (currentStep === 'need-selection') {
      setCurrentStep('patient-type');
      setPatientType(null);
    } else if (currentStep === 'clinician-selection') {
      setCurrentStep('need-selection');
      setSelectedNeed(null);
    } else if (currentStep === 'booking') {
      if (patientType === 'new') {
        setCurrentStep('patient-type');
        setPatientType(null);
      } else {
        setCurrentStep('clinician-selection');
      }
      setSelectedClinician(null);
      setShowCalendar(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-5 md:px-8 lg:px-12">
        <div className="max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
              Book Your Appointment
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Let us help you find the right clinician for your needs and schedule a convenient time.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Progress Indicator */}
      <div className="max-w-4xl mx-auto px-5 md:px-8 lg:px-12 mb-8">
        <div className="flex items-center justify-center space-x-2">
          {['Patient Type', 'Your Needs', 'Choose Clinician', 'Book Time'].map((label, index) => {
            const steps: Step[] = ['patient-type', 'need-selection', 'clinician-selection', 'booking'];
            const isActive = steps.indexOf(currentStep) >= index;
            const isCompleted = steps.indexOf(currentStep) > index;
            
            // Skip middle steps for new patients
            if (patientType === 'new' && (index === 1 || index === 2)) {
              return null;
            }
            
            return (
              <div key={label} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all ${
                  isActive ? 'bg-primary text-white' : 'bg-gray-300 text-gray-600'
                }`}>
                  {isCompleted ? '✓' : index + 1}
                </div>
                <span className={`ml-2 text-sm hidden sm:inline ${
                  isActive ? 'text-gray-900 font-medium' : 'text-gray-500'
                }`}>
                  {label}
                </span>
                {index < 3 && (
                  <div className={`w-12 h-0.5 ml-2 ${
                    isCompleted ? 'bg-primary' : 'bg-gray-300'
                  }`} />
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Main Content */}
      <section className="pb-24 px-5 md:px-8 lg:px-12">
        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            {/* Step 1: Patient Type */}
            {currentStep === 'patient-type' && (
              <motion.div
                key="patient-type"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-2xl shadow-xl p-8 md:p-12"
              >
                <h2 className="text-2xl font-semibold text-gray-900 mb-8 text-center">
                  Are you a new or existing patient?
                </h2>
                
                <div className="grid md:grid-cols-2 gap-6">
                  <button
                    onClick={() => handlePatientType('new')}
                    className="p-8 border-2 border-gray-200 rounded-xl hover:border-primary hover:shadow-lg transition-all group"
                  >
                    <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                      <svg className="w-10 h-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">I&apos;m a New Patient</h3>
                    <p className="text-gray-600">First time at Empower Treatment</p>
                  </button>

                  <button
                    onClick={() => handlePatientType('existing')}
                    className="p-8 border-2 border-gray-200 rounded-xl hover:border-primary hover:shadow-lg transition-all group"
                  >
                    <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-primary/20 transition-colors">
                      <svg className="w-10 h-10 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                      </svg>
                    </div>
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">I&apos;m an Existing Patient</h3>
                    <p className="text-gray-600">I&apos;ve been here before</p>
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 2: Need Selection (Existing Patients) */}
            {currentStep === 'need-selection' && (
              <motion.div
                key="need-selection"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-2xl shadow-xl p-8 md:p-12"
              >
                <button
                  onClick={handleBack}
                  className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Back
                </button>

                <h2 className="text-2xl font-semibold text-gray-900 mb-8">
                  What brings you in today?
                </h2>
                
                <div className="space-y-4">
                  <button
                    onClick={() => handleNeedSelection('medication')}
                    className="w-full p-6 text-left border-2 border-gray-200 rounded-xl hover:border-primary hover:shadow-md transition-all group"
                  >
                    <div className="flex items-start">
                      <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-blue-200 transition-colors">
                        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                        </svg>
                      </div>
                      <div className="ml-4">
                        <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary transition-colors">
                          Medication Management
                        </h3>
                        <p className="text-gray-600 mt-1">Prescription refills, dosage adjustments, or new medications</p>
                      </div>
                    </div>
                  </button>

                  <button
                    onClick={() => handleNeedSelection('substance-use')}
                    className="w-full p-6 text-left border-2 border-gray-200 rounded-xl hover:border-primary hover:shadow-md transition-all group"
                  >
                    <div className="flex items-start">
                      <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-green-200 transition-colors">
                        <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                      </div>
                      <div className="ml-4">
                        <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary transition-colors">
                          Substance Use Support
                        </h3>
                        <p className="text-gray-600 mt-1">Addiction counseling, recovery support, or relapse prevention</p>
                      </div>
                    </div>
                  </button>

                  <button
                    onClick={() => handleNeedSelection('mental-health')}
                    className="w-full p-6 text-left border-2 border-gray-200 rounded-xl hover:border-primary hover:shadow-md transition-all group"
                  >
                    <div className="flex items-start">
                      <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-purple-200 transition-colors">
                        <svg className="w-6 h-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                      <div className="ml-4">
                        <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary transition-colors">
                          Mental Health Therapy
                        </h3>
                        <p className="text-gray-600 mt-1">Individual therapy for depression, anxiety, trauma, or other concerns</p>
                      </div>
                    </div>
                  </button>

                  <button
                    onClick={() => handleNeedSelection('group-therapy')}
                    className="w-full p-6 text-left border-2 border-gray-200 rounded-xl hover:border-primary hover:shadow-md transition-all group"
                  >
                    <div className="flex items-start">
                      <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center flex-shrink-0 group-hover:bg-orange-200 transition-colors">
                        <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                      </div>
                      <div className="ml-4">
                        <h3 className="text-lg font-semibold text-gray-900 group-hover:text-primary transition-colors">
                          Group Therapy
                        </h3>
                        <p className="text-gray-600 mt-1">Connect with others in recovery or facing similar challenges</p>
                      </div>
                    </div>
                  </button>
                </div>
              </motion.div>
            )}

            {/* Step 3: Clinician Selection */}
            {currentStep === 'clinician-selection' && (
              <motion.div
                key="clinician-selection"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-2xl shadow-xl p-8 md:p-12"
              >
                <button
                  onClick={handleBack}
                  className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Back
                </button>

                <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                  Choose Your Clinician
                </h2>
                <p className="text-gray-600 mb-8">
                  Based on your needs, we recommend these clinicians:
                </p>
                
                <div className="space-y-6">
                  {getRecommendedClinicians().map((clinician) => (
                    <div
                      key={clinician.id}
                      className="border-2 border-gray-200 rounded-xl p-6 hover:border-primary hover:shadow-lg transition-all cursor-pointer"
                      onClick={() => {
                        setSelectedClinician(clinician);
                        setCurrentStep('booking');
                      }}
                    >
                      <div className="flex items-start space-x-4">
                        <div className="w-20 h-20 bg-gray-200 rounded-lg flex-shrink-0 overflow-hidden">
                          {/* Placeholder for clinician photo */}
                          <div className="w-full h-full flex items-center justify-center text-gray-400">
                            <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                          </div>
                        </div>
                        <div className="flex-1">
                          <h3 className="text-xl font-semibold text-gray-900">{clinician.name}</h3>
                          <p className="text-primary font-medium mb-2">{clinician.title}</p>
                          <p className="text-gray-600 mb-3">{clinician.bio}</p>
                          <div className="flex flex-wrap gap-2">
                            {clinician.specialties.map((specialty) => (
                              <span
                                key={specialty}
                                className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded-full"
                              >
                                {specialty}
                              </span>
                            ))}
                          </div>
                        </div>
                        <div className="flex-shrink-0">
                          <svg className="w-6 h-6 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Step 4: Booking */}
            {currentStep === 'booking' && selectedClinician && (
              <motion.div
                key="booking"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -30 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-2xl shadow-xl p-8 md:p-12"
              >
                <button
                  onClick={handleBack}
                  className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
                >
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                  </svg>
                  Back
                </button>

                <div className="text-center mb-8">
                  <h2 className="text-2xl font-semibold text-gray-900 mb-2">
                    Schedule with {selectedClinician.name}
                  </h2>
                  <p className="text-gray-600">{selectedClinician.title}</p>
                </div>

                {!showCalendar ? (
                  <div className="text-center">
                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mb-6">
                      <h3 className="font-semibold text-blue-900 mb-2">Before You Book:</h3>
                      <ul className="text-sm text-blue-800 space-y-2 text-left max-w-md mx-auto">
                        <li className="flex items-start">
                          <svg className="w-5 h-5 mt-0.5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          Have your insurance information ready
                        </li>
                        <li className="flex items-start">
                          <svg className="w-5 h-5 mt-0.5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          List of current medications
                        </li>
                        <li className="flex items-start">
                          <svg className="w-5 h-5 mt-0.5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          Questions or concerns to discuss
                        </li>
                      </ul>
                    </div>

                    <Button
                      size="lg"
                      onClick={() => setShowCalendar(true)}
                      className="min-w-[200px]"
                    >
                      View Available Times
                    </Button>
                  </div>
                ) : (
                  <div>
                    <div className="bg-gray-100 rounded-lg p-4 mb-4">
                      <p className="text-sm text-gray-600 text-center">
                        You&apos;ll be redirected to our secure scheduling system
                      </p>
                    </div>
                    <iframe
                      src={selectedClinician.calendarUrl}
                      className="w-full h-[600px] rounded-lg border-2 border-gray-200"
                      frameBorder="0"
                    />
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </section>

      {/* Help Section */}
      <section className="pb-24 px-5 md:px-8 lg:px-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-gray-100 rounded-2xl p-8 text-center">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">Need Help Booking?</h3>
            <p className="text-gray-600 mb-4">
              Our team is here to help you find the right appointment time and answer any questions.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="tel:+17402000277">
                <Button variant="outline" size="lg">
                  <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                  Call (740) 200-0277
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}