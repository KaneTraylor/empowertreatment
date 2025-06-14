'use client';

import { useState } from 'react';
import { Header } from '@/components/Header';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';

interface PassFormData {
  // Resident Information
  residentName: string;
  roomNumber: string;
  phone: string;
  
  // Pass Details
  departureDate: string;
  departureTime: string;
  returnDate: string;
  returnTime: string;
  destination: string;
  destinationAddress: string;
  purposeOfVisit: string;
  
  // Emergency Contact
  emergencyContactName: string;
  emergencyContactPhone: string;
  emergencyContactRelationship: string;
  
  // Transportation
  transportationMethod: string;
  driverName?: string;
  vehicleInfo?: string;
  
  // Agreements
  agreements: string[];
  
  // Digital Signature
  signature: string;
  signatureDate: string;
}

const stepTitles = [
  'Your Information',
  'Pass Details',
  'Destination & Contact',
  'Transportation',
  'Review & Sign'
];

export default function WeekendPassPage() {
  const [formData, setFormData] = useState<PassFormData>({
    residentName: '',
    roomNumber: '',
    phone: '',
    departureDate: '',
    departureTime: '',
    returnDate: '',
    returnTime: '',
    destination: '',
    destinationAddress: '',
    purposeOfVisit: '',
    emergencyContactName: '',
    emergencyContactPhone: '',
    emergencyContactRelationship: '',
    transportationMethod: '',
    driverName: '',
    vehicleInfo: '',
    agreements: [],
    signature: '',
    signatureDate: new Date().toISOString().split('T')[0]
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 5;

  const agreementOptions = [
    { value: 'sobriety', label: 'I will maintain sobriety during my pass and understand I may be tested upon return' },
    { value: 'return-time', label: 'I will return by the specified date and time' },
    { value: 'contact', label: 'I will remain reachable by phone at all times' },
    { value: 'behavior', label: 'I will represent the recovery house positively in the community' },
    { value: 'consequences', label: 'I understand that violating any rules may result in discharge from the program' }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    // Format phone number
    const digits = value.replace(/\D/g, '');
    let formatted = digits;
    
    if (digits.length >= 6) {
      formatted = `(${digits.slice(0, 3)}) ${digits.slice(3, 6)}-${digits.slice(6, 10)}`;
    } else if (digits.length >= 3) {
      formatted = `(${digits.slice(0, 3)}) ${digits.slice(3)}`;
    }
    
    setFormData(prev => ({ ...prev, [name]: formatted }));
  };

  const handleNext = () => {
    if (currentStep < totalSteps && validateStep()) {
      setCurrentStep(currentStep + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const validateStep = () => {
    switch (currentStep) {
      case 1:
        return formData.residentName && formData.roomNumber && formData.phone.replace(/\D/g, '').length === 10;
      case 2:
        return formData.departureDate && formData.departureTime && formData.returnDate && formData.returnTime;
      case 3:
        return formData.destination && formData.destinationAddress && formData.purposeOfVisit && 
               formData.emergencyContactName && formData.emergencyContactPhone.replace(/\D/g, '').length === 10 &&
               formData.emergencyContactRelationship;
      case 4:
        return formData.transportationMethod && 
               (formData.transportationMethod !== 'self-driving' && formData.transportationMethod !== 'picked-up' || 
                (formData.driverName && formData.vehicleInfo));
      case 5:
        return formData.agreements.length === 5 && formData.signature.trim().length > 2;
      default:
        return false;
    }
  };

  const handleAgreementChange = (value: string) => {
    setFormData(prev => ({
      ...prev,
      agreements: prev.agreements.includes(value)
        ? prev.agreements.filter(item => item !== value)
        : [...prev.agreements, value]
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep()) return;

    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      const response = await fetch('/api/submit-weekend-pass', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (response.ok && result.success) {
        setSubmitStatus('success');
      } else {
        setSubmitStatus('error');
        setErrorMessage(result.message || 'An error occurred. Please try again.');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
      setErrorMessage('Unable to submit form. Please check your connection and try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-3xl mx-auto px-4 py-8">
        {/* Header */}
        <div className="mb-8">
          <Link href="/housing-portal" className="inline-flex items-center text-[#005c65] hover:text-[#004a52] mb-4">
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Housing Portal
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Weekend Pass Request</h1>
          <p className="text-gray-600 mt-2">Complete all steps to submit your pass request for staff approval.</p>
        </div>

        {submitStatus === 'success' ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white rounded-2xl shadow-lg p-8 text-center"
          >
            <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Request Submitted Successfully!</h2>
            <p className="text-lg text-gray-600 mb-8">
              Your weekend pass request has been sent to staff for approval. 
              You&apos;ll receive a text message once it&apos;s been reviewed.
            </p>
            <div className="bg-blue-50 rounded-lg p-4 mb-8">
              <p className="text-sm font-medium text-blue-900">Expected Response Time</p>
              <p className="text-lg text-blue-700">2-4 hours during business hours</p>
            </div>
            <Link
              href="/housing-portal"
              className="inline-flex items-center justify-center bg-[#005c65] text-white rounded-full px-8 py-3 hover:bg-[#004a52] transition-colors"
            >
              Return to Portal
            </Link>
          </motion.div>
        ) : (
          <>
            {/* Progress Bar */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <div className="flex justify-between items-center mb-4">
                {stepTitles.map((title, index) => (
                  <div key={index} className="flex flex-col items-center flex-1">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all ${
                      index + 1 <= currentStep 
                        ? 'bg-[#005c65] text-white' 
                        : 'bg-gray-200 text-gray-500'
                    }`}>
                      {index + 1 <= currentStep && index + 1 < currentStep ? (
                        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      ) : (
                        index + 1
                      )}
                    </div>
                    <span className={`text-xs mt-2 hidden md:block ${
                      index + 1 <= currentStep ? 'text-gray-900 font-medium' : 'text-gray-500'
                    }`}>
                      {title}
                    </span>
                    {index < stepTitles.length - 1 && (
                      <div className={`absolute h-1 w-full top-5 left-1/2 -z-10 ${
                        index + 1 < currentStep ? 'bg-[#005c65]' : 'bg-gray-200'
                      }`} style={{ width: 'calc(100% - 40px)' }} />
                    )}
                  </div>
                ))}
              </div>
              <div className="text-center mt-2 md:hidden">
                <span className="text-sm font-medium text-gray-900">{stepTitles[currentStep - 1]}</span>
              </div>
            </div>

            {/* Form */}
            <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                  className="p-6 md:p-8"
                >
                  {/* Step 1: Resident Information */}
                  {currentStep === 1 && (
                    <div className="space-y-6">
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Your Information</h2>
                        <p className="text-gray-600">Please provide your basic information.</p>
                      </div>
                      
                      <div className="space-y-5">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Full Name *
                          </label>
                          <input
                            type="text"
                            name="residentName"
                            value={formData.residentName}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#005c65] focus:border-transparent transition-all"
                            placeholder="Enter your full name"
                            required
                          />
                        </div>
                        
                        <div className="grid md:grid-cols-2 gap-5">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Room Number *
                            </label>
                            <input
                              type="text"
                              name="roomNumber"
                              value={formData.roomNumber}
                              onChange={handleInputChange}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#005c65] focus:border-transparent transition-all"
                              placeholder="e.g., 203"
                              required
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Phone Number *
                            </label>
                            <input
                              type="tel"
                              name="phone"
                              value={formData.phone}
                              onChange={handlePhoneChange}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#005c65] focus:border-transparent transition-all"
                              placeholder="(555) 123-4567"
                              required
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 2: Pass Details */}
                  {currentStep === 2 && (
                    <div className="space-y-6">
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Pass Details</h2>
                        <p className="text-gray-600">When will you be leaving and returning?</p>
                      </div>
                      
                      <div className="space-y-5">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-4">
                            Departure Information
                          </label>
                          <div className="grid md:grid-cols-2 gap-5">
                            <div>
                              <label className="block text-xs text-gray-600 mb-1">Date *</label>
                              <input
                                type="date"
                                name="departureDate"
                                value={formData.departureDate}
                                onChange={handleInputChange}
                                min={new Date().toISOString().split('T')[0]}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#005c65] focus:border-transparent transition-all"
                                required
                              />
                            </div>
                            <div>
                              <label className="block text-xs text-gray-600 mb-1">Time *</label>
                              <input
                                type="time"
                                name="departureTime"
                                value={formData.departureTime}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#005c65] focus:border-transparent transition-all"
                                required
                              />
                            </div>
                          </div>
                        </div>
                        
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-4">
                            Return Information
                          </label>
                          <div className="grid md:grid-cols-2 gap-5">
                            <div>
                              <label className="block text-xs text-gray-600 mb-1">Date *</label>
                              <input
                                type="date"
                                name="returnDate"
                                value={formData.returnDate}
                                onChange={handleInputChange}
                                min={formData.departureDate || new Date().toISOString().split('T')[0]}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#005c65] focus:border-transparent transition-all"
                                required
                              />
                            </div>
                            <div>
                              <label className="block text-xs text-gray-600 mb-1">Time *</label>
                              <input
                                type="time"
                                name="returnTime"
                                value={formData.returnTime}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#005c65] focus:border-transparent transition-all"
                                required
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 3: Destination & Emergency Contact */}
                  {currentStep === 3 && (
                    <div className="space-y-6">
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Destination & Emergency Contact</h2>
                        <p className="text-gray-600">Where are you going and who can we contact in case of emergency?</p>
                      </div>
                      
                      <div className="space-y-6">
                        <div className="space-y-5">
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Destination *
                            </label>
                            <input
                              type="text"
                              name="destination"
                              value={formData.destination}
                              onChange={handleInputChange}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#005c65] focus:border-transparent transition-all"
                              placeholder="e.g., Parent's house, Work event"
                              required
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Full Address *
                            </label>
                            <input
                              type="text"
                              name="destinationAddress"
                              value={formData.destinationAddress}
                              onChange={handleInputChange}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#005c65] focus:border-transparent transition-all"
                              placeholder="123 Main St, City, State 12345"
                              required
                            />
                          </div>
                          
                          <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">
                              Purpose of Visit *
                            </label>
                            <textarea
                              name="purposeOfVisit"
                              value={formData.purposeOfVisit}
                              onChange={handleInputChange}
                              rows={3}
                              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#005c65] focus:border-transparent transition-all resize-none"
                              placeholder="Please explain the reason for your pass request..."
                              required
                            />
                          </div>
                        </div>
                        
                        <div className="border-t pt-6">
                          <h3 className="text-lg font-semibold text-gray-900 mb-4">Emergency Contact</h3>
                          <div className="space-y-5">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Contact Name *
                              </label>
                              <input
                                type="text"
                                name="emergencyContactName"
                                value={formData.emergencyContactName}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#005c65] focus:border-transparent transition-all"
                                placeholder="Full name"
                                required
                              />
                            </div>
                            
                            <div className="grid md:grid-cols-2 gap-5">
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  Phone Number *
                                </label>
                                <input
                                  type="tel"
                                  name="emergencyContactPhone"
                                  value={formData.emergencyContactPhone}
                                  onChange={handlePhoneChange}
                                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#005c65] focus:border-transparent transition-all"
                                  placeholder="(555) 123-4567"
                                  required
                                />
                              </div>
                              
                              <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                  Relationship *
                                </label>
                                <input
                                  type="text"
                                  name="emergencyContactRelationship"
                                  value={formData.emergencyContactRelationship}
                                  onChange={handleInputChange}
                                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#005c65] focus:border-transparent transition-all"
                                  placeholder="e.g., Mother, Sponsor"
                                  required
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Step 4: Transportation */}
                  {currentStep === 4 && (
                    <div className="space-y-6">
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Transportation Details</h2>
                        <p className="text-gray-600">How will you be traveling to and from your destination?</p>
                      </div>
                      
                      <div className="space-y-5">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-2">
                            Transportation Method *
                          </label>
                          <select
                            name="transportationMethod"
                            value={formData.transportationMethod}
                            onChange={handleInputChange}
                            className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#005c65] focus:border-transparent transition-all"
                            required
                          >
                            <option value="">Select transportation method</option>
                            <option value="self-driving">Driving myself</option>
                            <option value="picked-up">Being picked up</option>
                            <option value="uber-lyft">Uber/Lyft</option>
                            <option value="public-transit">Public transportation</option>
                            <option value="walking">Walking</option>
                            <option value="other">Other</option>
                          </select>
                        </div>

                        {(formData.transportationMethod === 'self-driving' || formData.transportationMethod === 'picked-up') && (
                          <div className="space-y-5 p-5 bg-gray-50 rounded-lg">
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Driver Name *
                              </label>
                              <input
                                type="text"
                                name="driverName"
                                value={formData.driverName || ''}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#005c65] focus:border-transparent transition-all bg-white"
                                placeholder={formData.transportationMethod === 'self-driving' ? 'Your name' : 'Name of person picking you up'}
                                required
                              />
                            </div>
                            
                            <div>
                              <label className="block text-sm font-medium text-gray-700 mb-2">
                                Vehicle Information *
                              </label>
                              <input
                                type="text"
                                name="vehicleInfo"
                                value={formData.vehicleInfo || ''}
                                onChange={handleInputChange}
                                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#005c65] focus:border-transparent transition-all bg-white"
                                placeholder="Make, model, color, license plate"
                                required
                              />
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Step 5: Review & Sign */}
                  {currentStep === 5 && (
                    <div className="space-y-6">
                      <div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Review & Sign</h2>
                        <p className="text-gray-600">Please review your information and agree to all terms.</p>
                      </div>
                      
                      {/* Summary */}
                      <div className="bg-gray-50 rounded-lg p-5 space-y-4">
                        <h3 className="font-semibold text-gray-900">Pass Summary</h3>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Departure:</span>
                            <span className="font-medium">{formData.departureDate} at {formData.departureTime}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Return:</span>
                            <span className="font-medium">{formData.returnDate} at {formData.returnTime}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Destination:</span>
                            <span className="font-medium">{formData.destination}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Transportation:</span>
                            <span className="font-medium">{formData.transportationMethod.replace('-', ' ')}</span>
                          </div>
                        </div>
                      </div>
                      
                      {/* Agreements */}
                      <div className="space-y-4">
                        <h3 className="font-semibold text-gray-900">Terms & Conditions</h3>
                        <p className="text-sm text-gray-600">You must agree to all conditions to submit your request.</p>
                        <div className="space-y-3">
                          {agreementOptions.map((option) => (
                            <label key={option.value} className="flex items-start cursor-pointer group">
                              <input
                                type="checkbox"
                                checked={formData.agreements.includes(option.value)}
                                onChange={() => handleAgreementChange(option.value)}
                                className="mt-1 w-4 h-4 text-[#005c65] border-gray-300 rounded focus:ring-[#005c65]"
                              />
                              <span className="ml-3 text-sm text-gray-700 group-hover:text-gray-900">
                                {option.label}
                              </span>
                            </label>
                          ))}
                        </div>
                      </div>
                      
                      {/* Digital Signature */}
                      <div className="border-t pt-6">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Digital Signature *
                        </label>
                        <input
                          type="text"
                          name="signature"
                          value={formData.signature}
                          onChange={handleInputChange}
                          className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#005c65] focus:border-transparent transition-all font-cursive text-lg"
                          placeholder="Type your full name"
                          required
                        />
                        <p className="mt-2 text-xs text-gray-500">
                          By typing your name above, you agree that this constitutes your legal signature.
                        </p>
                      </div>
                    </div>
                  )}
                </motion.div>
              </AnimatePresence>

              {/* Error Message */}
              {submitStatus === 'error' && (
                <div className="mx-6 mb-6 p-4 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex">
                    <svg className="w-5 h-5 text-red-400 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                    <div className="ml-3">
                      <p className="text-sm font-medium text-red-800">{errorMessage}</p>
                      <p className="mt-1 text-sm text-red-700">
                        If this problem persists, please call <a href="tel:740-200-0277" className="underline">(740) 200-0277</a>
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation */}
              <div className="border-t px-6 py-4 flex justify-between items-center bg-gray-50 rounded-b-xl">
                <div>
                  {currentStep > 1 && (
                    <button
                      type="button"
                      onClick={handleBack}
                      disabled={isSubmitting}
                      className="inline-flex items-center px-4 py-2 text-sm font-medium text-gray-700 hover:text-gray-900 transition-colors"
                    >
                      <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                      </svg>
                      Back
                    </button>
                  )}
                </div>
                
                <div>
                  {currentStep < totalSteps ? (
                    <button
                      type="button"
                      onClick={handleNext}
                      disabled={!validateStep()}
                      className={`inline-flex items-center px-6 py-3 rounded-lg font-medium transition-all ${
                        validateStep()
                          ? 'bg-[#005c65] text-white hover:bg-[#004a52]'
                          : 'bg-gray-200 text-gray-400 cursor-not-allowed'
                      }`}
                    >
                      Next
                      <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                    </button>
                  ) : (
                    <button
                      type="submit"
                      disabled={isSubmitting || !validateStep()}
                      className={`inline-flex items-center px-6 py-3 rounded-lg font-medium transition-all ${
                        isSubmitting || !validateStep()
                          ? 'bg-gray-200 text-gray-400 cursor-not-allowed'
                          : 'bg-[#005c65] text-white hover:bg-[#004a52]'
                      }`}
                    >
                      {isSubmitting ? (
                        <>
                          <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-gray-400" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                          </svg>
                          Submitting...
                        </>
                      ) : (
                        <>
                          Submit Request
                          <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                        </>
                      )}
                    </button>
                  )}
                </div>
              </div>
            </form>

            {/* Help Section */}
            <div className="mt-8 bg-blue-50 rounded-xl p-6 text-center">
              <h3 className="text-lg font-semibold text-blue-900 mb-2">Need Help?</h3>
              <p className="text-blue-700 mb-4">
                If you have any questions or need assistance with your pass request, our staff is here to help.
              </p>
              <a
                href="tel:740-200-0277"
                className="inline-flex items-center justify-center bg-blue-600 text-white rounded-lg px-6 py-3 hover:bg-blue-700 transition-colors"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Call (740) 200-0277
              </a>
            </div>
          </>
        )}
      </div>
    </div>
  );
}