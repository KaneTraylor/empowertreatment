'use client';

import { useState } from 'react';
import { Header } from '@/components/Header';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Button } from '@/components/ui/Button';
import { CheckboxGroup } from '@/components/ui/CheckboxGroup';

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
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 5;

  const agreementOptions = [
    { value: 'sobriety', label: 'I agree to maintain sobriety during my pass and understand I may be tested upon return' },
    { value: 'return-time', label: 'I agree to return by the specified date and time' },
    { value: 'contact', label: 'I agree to remain reachable by phone at all times' },
    { value: 'behavior', label: 'I agree to represent the recovery house positively in the community' },
    { value: 'consequences', label: 'I understand that violating any rules may result in discharge from the program' }
  ];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const validateStep = () => {
    switch (currentStep) {
      case 1:
        return formData.residentName && formData.roomNumber && formData.phone;
      case 2:
        return formData.departureDate && formData.departureTime && formData.returnDate && formData.returnTime;
      case 3:
        return formData.destination && formData.destinationAddress && formData.purposeOfVisit && 
               formData.emergencyContactName && formData.emergencyContactPhone;
      case 4:
        return formData.transportationMethod;
      case 5:
        return formData.agreements.length === 5 && formData.signature;
      default:
        return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateStep()) return;

    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      const response = await fetch('/api/submit-weekend-pass', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setSubmitStatus('success');
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Minimal header for mobile */}
      <div className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <h1 className="text-lg font-semibold text-gray-900">Weekend Pass Request</h1>
          <a href="tel:740-200-0277" className="text-sm text-[#005c65]">Need help?</a>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-white shadow-sm">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            {[...Array(totalSteps)].map((_, index) => (
              <div key={index} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium transition-all ${
                  index + 1 <= currentStep ? 'bg-[#005c65] text-white' : 'bg-gray-300 text-gray-600'
                }`}>
                  {index + 1}
                </div>
                {index < totalSteps - 1 && (
                  <div className={`w-full h-1 mx-2 ${
                    index + 1 < currentStep ? 'bg-[#005c65]' : 'bg-gray-300'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <div className="mt-2 text-sm text-gray-600 text-center">
            Step {currentStep} of {totalSteps}
          </div>
        </div>
      </div>

      {/* Form Content */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        {submitStatus === 'success' ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-green-50 rounded-2xl p-8 text-center"
          >
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h2 className="text-2xl font-semibold text-gray-900 mb-2">Request Submitted!</h2>
            <p className="text-gray-600 mb-6">
              Your weekend pass request has been sent to staff for approval. 
              You&apos;ll receive a text message once it&apos;s been reviewed.
            </p>
            <p className="text-sm text-gray-500">
              Typical response time: 2-4 hours during business hours
            </p>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white rounded-xl shadow-sm p-6 md:p-8">
            {/* Step 1: Resident Information */}
            {currentStep === 1 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">Your Information</h2>
                <div className="space-y-4">
                  <Input
                    label="Full Name"
                    name="residentName"
                    value={formData.residentName}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter your full name"
                  />
                  <Input
                    label="Room Number"
                    name="roomNumber"
                    value={formData.roomNumber}
                    onChange={handleInputChange}
                    required
                    placeholder="e.g., Room 203"
                  />
                  <Input
                    label="Phone Number"
                    name="phone"
                    type="tel"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                    placeholder="(555) 123-4567"
                  />
                </div>
              </motion.div>
            )}

            {/* Step 2: Pass Details */}
            {currentStep === 2 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">Pass Details</h2>
                <div className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <Input
                      label="Departure Date"
                      name="departureDate"
                      type="date"
                      value={formData.departureDate}
                      onChange={handleInputChange}
                      required
                      min={new Date().toISOString().split('T')[0]}
                    />
                    <Input
                      label="Departure Time"
                      name="departureTime"
                      type="time"
                      value={formData.departureTime}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                  <div className="grid md:grid-cols-2 gap-4">
                    <Input
                      label="Return Date"
                      name="returnDate"
                      type="date"
                      value={formData.returnDate}
                      onChange={handleInputChange}
                      required
                      min={formData.departureDate || new Date().toISOString().split('T')[0]}
                    />
                    <Input
                      label="Return Time"
                      name="returnTime"
                      type="time"
                      value={formData.returnTime}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 3: Destination & Emergency Contact */}
            {currentStep === 3 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">Destination & Emergency Contact</h2>
                <div className="space-y-6">
                  <div className="space-y-4">
                    <Input
                      label="Destination"
                      name="destination"
                      value={formData.destination}
                      onChange={handleInputChange}
                      required
                      placeholder="e.g., Parent's house, Work event"
                    />
                    <Input
                      label="Full Address"
                      name="destinationAddress"
                      value={formData.destinationAddress}
                      onChange={handleInputChange}
                      required
                      placeholder="Street address, City, State ZIP"
                    />
                    <Textarea
                      label="Purpose of Visit"
                      name="purposeOfVisit"
                      value={formData.purposeOfVisit}
                      onChange={handleInputChange}
                      required
                      rows={3}
                      placeholder="Please explain the reason for your pass request..."
                    />
                  </div>
                  
                  <div className="border-t pt-6">
                    <h3 className="text-lg font-medium text-gray-900 mb-4">Emergency Contact</h3>
                    <div className="space-y-4">
                      <Input
                        label="Contact Name"
                        name="emergencyContactName"
                        value={formData.emergencyContactName}
                        onChange={handleInputChange}
                        required
                      />
                      <Input
                        label="Contact Phone"
                        name="emergencyContactPhone"
                        type="tel"
                        value={formData.emergencyContactPhone}
                        onChange={handleInputChange}
                        required
                      />
                      <Input
                        label="Relationship"
                        name="emergencyContactRelationship"
                        value={formData.emergencyContactRelationship}
                        onChange={handleInputChange}
                        required
                        placeholder="e.g., Mother, Sponsor"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Step 4: Transportation */}
            {currentStep === 4 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">Transportation Details</h2>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      How will you be traveling?
                    </label>
                    <select
                      name="transportationMethod"
                      value={formData.transportationMethod}
                      onChange={handleInputChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#005c65] focus:border-transparent"
                      required
                    >
                      <option value="">Select transportation method</option>
                      <option value="self-driving">Driving myself</option>
                      <option value="picked-up">Being picked up</option>
                      <option value="uber-lyft">Uber/Lyft</option>
                      <option value="public-transit">Public transportation</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  {(formData.transportationMethod === 'self-driving' || formData.transportationMethod === 'picked-up') && (
                    <>
                      <Input
                        label="Driver Name"
                        name="driverName"
                        value={formData.driverName || ''}
                        onChange={handleInputChange}
                        placeholder={formData.transportationMethod === 'self-driving' ? 'Your name' : 'Name of person picking you up'}
                      />
                      <Input
                        label="Vehicle Information"
                        name="vehicleInfo"
                        value={formData.vehicleInfo || ''}
                        onChange={handleInputChange}
                        placeholder="Make, model, color, license plate"
                      />
                    </>
                  )}
                </div>
              </motion.div>
            )}

            {/* Step 5: Agreements & Signature */}
            {currentStep === 5 && (
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <h2 className="text-2xl font-semibold text-gray-900 mb-6">Agreements & Signature</h2>
                <div className="space-y-6">
                  <div>
                    <h3 className="text-lg font-medium text-gray-900 mb-4">
                      Please read and agree to all conditions:
                    </h3>
                    <CheckboxGroup
                      options={agreementOptions}
                      value={formData.agreements}
                      onChange={(value) => setFormData(prev => ({ ...prev, agreements: value }))}
                      required
                    />
                  </div>

                  <div className="border-t pt-6">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Digital Signature
                    </label>
                    <Input
                      name="signature"
                      value={formData.signature}
                      onChange={handleInputChange}
                      required
                      placeholder="Type your full name"
                    />
                    <p className="mt-2 text-sm text-gray-500">
                      By typing your name above, you agree that this constitutes your legal signature.
                    </p>
                  </div>
                </div>
              </motion.div>
            )}

            {/* Error Message */}
            {submitStatus === 'error' && (
              <div className="mt-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                An error occurred. Please try again or call (740) 200-0277.
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="mt-8 flex justify-between">
              {currentStep > 1 && (
                <Button
                  type="button"
                  variant="outline"
                  onClick={handleBack}
                  disabled={isSubmitting}
                >
                  Back
                </Button>
              )}
              
              <div className={currentStep === 1 ? 'ml-auto' : ''}>
                {currentStep < totalSteps ? (
                  <Button
                    type="button"
                    onClick={handleNext}
                    disabled={!validateStep()}
                  >
                    Next
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    disabled={isSubmitting || !validateStep()}
                    className="min-w-[150px]"
                  >
                    {isSubmitting ? 'Submitting...' : 'Submit Request'}
                  </Button>
                )}
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}