'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { CheckboxGroup } from '@/components/ui/CheckboxGroup';
import { Textarea } from '@/components/ui/Textarea';
import { Button } from '@/components/ui/Button';

export function YouthServicesForms() {
  const [activeForm, setActiveForm] = useState<'group-home' | 'parent' | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  
  // Group Home Form State
  const [groupHomeData, setGroupHomeData] = useState({
    contactName: '',
    organizationName: '',
    email: '',
    phone: '',
    state: '',
    referralType: 'individual' as 'individual' | 'multiple' | 'entire-house',
    youthName: '',
    youthAge: '',
    numberOfYouth: '',
    ageRange: '',
    groupDescription: '',
    primaryConcerns: [] as string[],
    currentMedications: '',
    insuranceProvider: '',
    previousTreatment: '',
    urgencyLevel: 'soon' as 'immediate' | 'soon' | 'planning',
    additionalNotes: '',
    consent: false
  });
  
  // Parent Form State
  const [parentData, setParentData] = useState({
    contactName: '',
    email: '',
    phone: '',
    state: '',
    youthName: '',
    youthAge: '',
    primaryConcerns: [] as string[],
    currentMedications: '',
    insuranceProvider: '',
    previousTreatment: '',
    urgencyLevel: 'soon' as 'immediate' | 'soon' | 'planning',
    additionalNotes: '',
    consent: false
  });

  const primaryConcernOptions = [
    { value: 'anxiety', label: 'Anxiety' },
    { value: 'depression', label: 'Depression' },
    { value: 'substance-use', label: 'Substance Use' },
    { value: 'trauma', label: 'Trauma/PTSD' },
    { value: 'behavioral-issues', label: 'Behavioral Issues' },
    { value: 'self-harm', label: 'Self-Harm' },
    { value: 'eating-disorders', label: 'Eating Disorders' },
    { value: 'family-conflicts', label: 'Family Conflicts' },
    { value: 'school-issues', label: 'School Issues' },
    { value: 'peer-relationships', label: 'Peer Relationships' },
    { value: 'identity-questions', label: 'Identity/Self-Discovery' },
    { value: 'other', label: 'Other' }
  ];

  const stateOptions = [
    { value: '', label: 'Select State' },
    { value: 'AL', label: 'Alabama' },
    { value: 'AK', label: 'Alaska' },
    { value: 'AZ', label: 'Arizona' },
    { value: 'AR', label: 'Arkansas' },
    { value: 'CA', label: 'California' },
    { value: 'CO', label: 'Colorado' },
    { value: 'CT', label: 'Connecticut' },
    { value: 'DE', label: 'Delaware' },
    { value: 'FL', label: 'Florida' },
    { value: 'GA', label: 'Georgia' },
    { value: 'HI', label: 'Hawaii' },
    { value: 'ID', label: 'Idaho' },
    { value: 'IL', label: 'Illinois' },
    { value: 'IN', label: 'Indiana' },
    { value: 'IA', label: 'Iowa' },
    { value: 'KS', label: 'Kansas' },
    { value: 'KY', label: 'Kentucky' },
    { value: 'LA', label: 'Louisiana' },
    { value: 'ME', label: 'Maine' },
    { value: 'MD', label: 'Maryland' },
    { value: 'MA', label: 'Massachusetts' },
    { value: 'MI', label: 'Michigan' },
    { value: 'MN', label: 'Minnesota' },
    { value: 'MS', label: 'Mississippi' },
    { value: 'MO', label: 'Missouri' },
    { value: 'MT', label: 'Montana' },
    { value: 'NE', label: 'Nebraska' },
    { value: 'NV', label: 'Nevada' },
    { value: 'NH', label: 'New Hampshire' },
    { value: 'NJ', label: 'New Jersey' },
    { value: 'NM', label: 'New Mexico' },
    { value: 'NY', label: 'New York' },
    { value: 'NC', label: 'North Carolina' },
    { value: 'ND', label: 'North Dakota' },
    { value: 'OH', label: 'Ohio' },
    { value: 'OK', label: 'Oklahoma' },
    { value: 'OR', label: 'Oregon' },
    { value: 'PA', label: 'Pennsylvania' },
    { value: 'RI', label: 'Rhode Island' },
    { value: 'SC', label: 'South Carolina' },
    { value: 'SD', label: 'South Dakota' },
    { value: 'TN', label: 'Tennessee' },
    { value: 'TX', label: 'Texas' },
    { value: 'UT', label: 'Utah' },
    { value: 'VT', label: 'Vermont' },
    { value: 'VA', label: 'Virginia' },
    { value: 'WA', label: 'Washington' },
    { value: 'WV', label: 'West Virginia' },
    { value: 'WI', label: 'Wisconsin' },
    { value: 'WY', label: 'Wyoming' }
  ];

  const handleSubmit = async (formType: 'group-home' | 'parent') => {
    console.log('Starting youth form submission:', formType);
    setIsSubmitting(true);
    setSubmitStatus('idle');

    const data = formType === 'group-home' ? groupHomeData : parentData;
    console.log('Form data:', data);

    // Validate required fields
    if (formType === 'group-home') {
      if (!data.youthName && data.referralType === 'individual') {
        console.error('Youth name required for individual referral');
        setSubmitStatus('error');
        setIsSubmitting(false);
        return;
      }
    }

    try {
      const response = await fetch('/api/submit-youth-form', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          formType,
          ...data
        }),
      });

      console.log('Response status:', response.status);
      const result = await response.json();
      console.log('Response data:', result);

      if (response.ok && result.success) {
        console.log('Form submitted successfully');
        setSubmitStatus('success');
        // Reset form
        if (formType === 'group-home') {
          setGroupHomeData({
            contactName: '',
            organizationName: '',
            email: '',
            phone: '',
            state: '',
            referralType: 'individual',
            youthName: '',
            youthAge: '',
            numberOfYouth: '',
            ageRange: '',
            groupDescription: '',
            primaryConcerns: [],
            currentMedications: '',
            insuranceProvider: '',
            previousTreatment: '',
            urgencyLevel: 'soon',
            additionalNotes: '',
            consent: false
          });
        } else {
          setParentData({
            contactName: '',
            email: '',
            phone: '',
            state: '',
            youthName: '',
            youthAge: '',
            primaryConcerns: [],
            currentMedications: '',
            insuranceProvider: '',
            previousTreatment: '',
            urgencyLevel: 'soon',
            additionalNotes: '',
            consent: false
          });
        }
        // Reset to form selection after 5 seconds
        setTimeout(() => {
          setActiveForm(null);
          setSubmitStatus('idle');
        }, 5000);
      } else {
        console.error('Form submission failed:', result.message || 'Unknown error');
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
    <section className="py-16 md:py-24 bg-white">
      <div className="max-w-7xl mx-auto px-5 md:px-8 lg:px-12">
        {/* Section Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold text-gray-900 mb-4">
            Get Started with Youth Services
          </h2>
          <p className="text-lg md:text-xl text-gray-600 max-w-3xl mx-auto">
            Whether you&apos;re a parent seeking help for your teen or a group home looking for quality care, 
            we&apos;re here to support you. Choose the form that applies to you.
          </p>
        </motion.div>

        {/* Form Selection */}
        {!activeForm && (
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {/* Group Home Option */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-[#faf8f5] rounded-2xl p-8 hover:shadow-lg transition-all duration-300 cursor-pointer"
              onClick={() => setActiveForm('group-home')}
            >
              <div className="w-16 h-16 bg-[#005c65]/10 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-[#005c65]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-3">Group Home Referral</h3>
              <p className="text-gray-600 mb-6">
                For group homes and residential facilities seeking mental health services for their residents.
              </p>
              <div className="flex items-center text-[#005c65] font-medium">
                <span>Complete referral form</span>
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </motion.div>

            {/* Parent Option */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-[#faf8f5] rounded-2xl p-8 hover:shadow-lg transition-all duration-300 cursor-pointer"
              onClick={() => setActiveForm('parent')}
            >
              <div className="w-16 h-16 bg-[#ef3d3d]/10 rounded-full flex items-center justify-center mb-6">
                <svg className="w-8 h-8 text-[#ef3d3d]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-3">Parent/Guardian Inquiry</h3>
              <p className="text-gray-600 mb-6">
                For parents and guardians seeking help for their teen&apos;s mental health and well-being.
              </p>
              <div className="flex items-center text-[#ef3d3d] font-medium">
                <span>Start your inquiry</span>
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </div>
            </motion.div>
          </div>
        )}

        {/* Group Home Form */}
        {activeForm === 'group-home' && submitStatus !== 'success' && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto"
          >
            <button
              onClick={() => setActiveForm(null)}
              className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to selection
            </button>

            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">Group Home Referral Form</h3>
              
              <form onSubmit={(e) => { e.preventDefault(); handleSubmit('group-home'); }} className="space-y-6">
                {/* Contact Information */}
                <div>
                  <h4 className="text-lg font-medium text-gray-900 mb-4">Contact Information</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <Input
                      label="Your Name"
                      required
                      value={groupHomeData.contactName}
                      onChange={(e) => setGroupHomeData({ ...groupHomeData, contactName: e.target.value })}
                    />
                    <Input
                      label="Organization/Facility Name"
                      required
                      value={groupHomeData.organizationName}
                      onChange={(e) => setGroupHomeData({ ...groupHomeData, organizationName: e.target.value })}
                    />
                    <Input
                      label="Email"
                      type="email"
                      required
                      value={groupHomeData.email}
                      onChange={(e) => setGroupHomeData({ ...groupHomeData, email: e.target.value })}
                    />
                    <Input
                      label="Phone"
                      type="tel"
                      required
                      value={groupHomeData.phone}
                      onChange={(e) => setGroupHomeData({ ...groupHomeData, phone: e.target.value })}
                    />
                    <Select
                      label="State"
                      required
                      value={groupHomeData.state}
                      onChange={(e) => setGroupHomeData({ ...groupHomeData, state: e.target.value })}
                      options={stateOptions}
                    />
                  </div>
                </div>

                {/* Referral Type */}
                <div>
                  <h4 className="text-lg font-medium text-gray-900 mb-4">Referral Type</h4>
                  <div className="space-y-3">
                    <label className="flex items-start cursor-pointer">
                      <input
                        type="radio"
                        name="referralType"
                        value="individual"
                        checked={groupHomeData.referralType === 'individual'}
                        onChange={(e) => setGroupHomeData({ ...groupHomeData, referralType: e.target.value as any })}
                        className="mt-1 mr-3"
                      />
                      <div>
                        <span className="font-medium">Individual Youth</span>
                        <p className="text-sm text-gray-600">Referral for a specific youth</p>
                      </div>
                    </label>
                    <label className="flex items-start cursor-pointer">
                      <input
                        type="radio"
                        name="referralType"
                        value="multiple"
                        checked={groupHomeData.referralType === 'multiple'}
                        onChange={(e) => setGroupHomeData({ ...groupHomeData, referralType: e.target.value as any })}
                        className="mt-1 mr-3"
                      />
                      <div>
                        <span className="font-medium">Multiple Youth</span>
                        <p className="text-sm text-gray-600">Referral for several specific youth</p>
                      </div>
                    </label>
                    <label className="flex items-start cursor-pointer">
                      <input
                        type="radio"
                        name="referralType"
                        value="entire-house"
                        checked={groupHomeData.referralType === 'entire-house'}
                        onChange={(e) => setGroupHomeData({ ...groupHomeData, referralType: e.target.value as any })}
                        className="mt-1 mr-3"
                      />
                      <div>
                        <span className="font-medium">Entire House/Facility</span>
                        <p className="text-sm text-gray-600">Services for all residents in your facility</p>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Youth Information - Conditional based on referral type */}
                <div>
                  <h4 className="text-lg font-medium text-gray-900 mb-4">Youth Information</h4>
                  {groupHomeData.referralType === 'individual' && (
                    <div className="grid md:grid-cols-2 gap-4">
                      <Input
                        label="Youth's Name"
                        required
                        value={groupHomeData.youthName}
                        onChange={(e) => setGroupHomeData({ ...groupHomeData, youthName: e.target.value })}
                      />
                      <Input
                        label="Age"
                        type="number"
                        min="13"
                        max="25"
                        required
                        value={groupHomeData.youthAge}
                        onChange={(e) => setGroupHomeData({ ...groupHomeData, youthAge: e.target.value })}
                      />
                    </div>
                  )}
                  {groupHomeData.referralType === 'multiple' && (
                    <div className="space-y-4">
                      <Textarea
                        label="Youth Names and Ages"
                        placeholder="Please list each youth's name and age (e.g., John Doe - 16, Jane Smith - 17)"
                        rows={4}
                        required
                        value={groupHomeData.groupDescription}
                        onChange={(e) => setGroupHomeData({ ...groupHomeData, groupDescription: e.target.value })}
                      />
                      <Input
                        label="Number of Youth"
                        type="number"
                        min="2"
                        required
                        value={groupHomeData.numberOfYouth}
                        onChange={(e) => setGroupHomeData({ ...groupHomeData, numberOfYouth: e.target.value })}
                      />
                    </div>
                  )}
                  {groupHomeData.referralType === 'entire-house' && (
                    <div className="grid md:grid-cols-2 gap-4">
                      <Input
                        label="Number of Residents"
                        type="number"
                        min="1"
                        required
                        value={groupHomeData.numberOfYouth}
                        onChange={(e) => setGroupHomeData({ ...groupHomeData, numberOfYouth: e.target.value })}
                      />
                      <Input
                        label="Age Range of Residents"
                        placeholder="e.g., 14-18"
                        required
                        value={groupHomeData.ageRange}
                        onChange={(e) => setGroupHomeData({ ...groupHomeData, ageRange: e.target.value })}
                      />
                    </div>
                  )}
                </div>

                {/* Assessment Information */}
                <div>
                  <h4 className="text-lg font-medium text-gray-900 mb-4">Assessment Information</h4>
                  
                  <div className="mb-4">
                    <CheckboxGroup
                      label="Primary Concerns (select all that apply)"
                      options={primaryConcernOptions}
                      value={groupHomeData.primaryConcerns}
                      onChange={(value) => setGroupHomeData({ ...groupHomeData, primaryConcerns: value })}
                      required
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <Input
                      label="Current Medications (if any)"
                      value={groupHomeData.currentMedications}
                      onChange={(e) => setGroupHomeData({ ...groupHomeData, currentMedications: e.target.value })}
                    />
                    <Input
                      label="Insurance Provider"
                      value={groupHomeData.insuranceProvider}
                      onChange={(e) => setGroupHomeData({ ...groupHomeData, insuranceProvider: e.target.value })}
                    />
                  </div>

                  <div className="mt-4">
                    <Input
                      label="Previous Treatment History"
                      value={groupHomeData.previousTreatment}
                      onChange={(e) => setGroupHomeData({ ...groupHomeData, previousTreatment: e.target.value })}
                    />
                  </div>

                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      How urgent is this referral?
                    </label>
                    <div className="space-y-2">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="urgency"
                          value="immediate"
                          checked={groupHomeData.urgencyLevel === 'immediate'}
                          onChange={(e) => setGroupHomeData({ ...groupHomeData, urgencyLevel: e.target.value as any })}
                          className="mr-2"
                        />
                        <span className="text-red-600 font-medium">Immediate - Crisis situation</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="urgency"
                          value="soon"
                          checked={groupHomeData.urgencyLevel === 'soon'}
                          onChange={(e) => setGroupHomeData({ ...groupHomeData, urgencyLevel: e.target.value as any })}
                          className="mr-2"
                        />
                        <span>Within the next few days</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="urgency"
                          value="planning"
                          checked={groupHomeData.urgencyLevel === 'planning'}
                          onChange={(e) => setGroupHomeData({ ...groupHomeData, urgencyLevel: e.target.value as any })}
                          className="mr-2"
                        />
                        <span>Planning for future care</span>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Additional Information */}
                <div>
                  <Textarea
                    label="Additional Notes or Special Considerations"
                    rows={4}
                    value={groupHomeData.additionalNotes}
                    onChange={(e) => setGroupHomeData({ ...groupHomeData, additionalNotes: e.target.value })}
                  />
                </div>

                {/* Consent */}
                <div>
                  <label className="flex items-start">
                    <input
                      type="checkbox"
                      required
                      checked={groupHomeData.consent}
                      onChange={(e) => setGroupHomeData({ ...groupHomeData, consent: e.target.checked })}
                      className="mt-1 mr-3"
                    />
                    <span className="text-sm text-gray-600">
                      I confirm that I have the authority to make this referral and consent to sharing this information 
                      with Empower Treatment for the purpose of arranging care for the named youth.
                    </span>
                  </label>
                </div>

                {submitStatus === 'error' && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                    An error occurred. Please try again or call us directly at (740) 200-0277.
                  </div>
                )}

                <Button
                  type="submit"
                  disabled={isSubmitting || !groupHomeData.consent}
                  className="w-full"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Referral'}
                </Button>
              </form>
            </div>
          </motion.div>
        )}

        {/* Parent Form */}
        {activeForm === 'parent' && submitStatus !== 'success' && (
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto"
          >
            <button
              onClick={() => setActiveForm(null)}
              className="flex items-center text-gray-600 hover:text-gray-900 mb-6"
            >
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to selection
            </button>

            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-2xl font-semibold text-gray-900 mb-6">Parent/Guardian Inquiry Form</h3>
              
              <form onSubmit={(e) => { e.preventDefault(); handleSubmit('parent'); }} className="space-y-6">
                {/* Contact Information */}
                <div>
                  <h4 className="text-lg font-medium text-gray-900 mb-4">Your Information</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <Input
                      label="Your Name"
                      required
                      value={parentData.contactName}
                      onChange={(e) => setParentData({ ...parentData, contactName: e.target.value })}
                    />
                    <Input
                      label="Email"
                      type="email"
                      required
                      value={parentData.email}
                      onChange={(e) => setParentData({ ...parentData, email: e.target.value })}
                    />
                    <Input
                      label="Phone"
                      type="tel"
                      required
                      value={parentData.phone}
                      onChange={(e) => setParentData({ ...parentData, phone: e.target.value })}
                    />
                    <Select
                      label="State"
                      required
                      value={parentData.state}
                      onChange={(e) => setParentData({ ...parentData, state: e.target.value })}
                      options={stateOptions}
                    />
                  </div>
                </div>

                {/* Teen Information */}
                <div>
                  <h4 className="text-lg font-medium text-gray-900 mb-4">Teen Information</h4>
                  <div className="grid md:grid-cols-2 gap-4">
                    <Input
                      label="Teen's First Name"
                      required
                      value={parentData.youthName}
                      onChange={(e) => setParentData({ ...parentData, youthName: e.target.value })}
                    />
                    <Input
                      label="Age"
                      type="number"
                      min="13"
                      max="25"
                      required
                      value={parentData.youthAge}
                      onChange={(e) => setParentData({ ...parentData, youthAge: e.target.value })}
                    />
                  </div>
                </div>

                {/* Assessment Information */}
                <div>
                  <h4 className="text-lg font-medium text-gray-900 mb-4">What brings you here?</h4>
                  
                  <div className="mb-4">
                    <CheckboxGroup
                      label="Primary Concerns (select all that apply)"
                      options={primaryConcernOptions}
                      value={parentData.primaryConcerns}
                      onChange={(value) => setParentData({ ...parentData, primaryConcerns: value })}
                      required
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <Input
                      label="Current Medications (if any)"
                      value={parentData.currentMedications}
                      onChange={(e) => setParentData({ ...parentData, currentMedications: e.target.value })}
                    />
                    <Input
                      label="Insurance Provider"
                      value={parentData.insuranceProvider}
                      onChange={(e) => setParentData({ ...parentData, insuranceProvider: e.target.value })}
                    />
                  </div>

                  <div className="mt-4">
                    <Input
                      label="Previous Counseling or Treatment (if any)"
                      value={parentData.previousTreatment}
                      onChange={(e) => setParentData({ ...parentData, previousTreatment: e.target.value })}
                    />
                  </div>

                  <div className="mt-4">
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      How soon are you looking to start?
                    </label>
                    <div className="space-y-2">
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="urgency-parent"
                          value="immediate"
                          checked={parentData.urgencyLevel === 'immediate'}
                          onChange={(e) => setParentData({ ...parentData, urgencyLevel: e.target.value as any })}
                          className="mr-2"
                        />
                        <span className="text-red-600 font-medium">Immediate - My teen is in crisis</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="urgency-parent"
                          value="soon"
                          checked={parentData.urgencyLevel === 'soon'}
                          onChange={(e) => setParentData({ ...parentData, urgencyLevel: e.target.value as any })}
                          className="mr-2"
                        />
                        <span>Within the next few days</span>
                      </label>
                      <label className="flex items-center">
                        <input
                          type="radio"
                          name="urgency-parent"
                          value="planning"
                          checked={parentData.urgencyLevel === 'planning'}
                          onChange={(e) => setParentData({ ...parentData, urgencyLevel: e.target.value as any })}
                          className="mr-2"
                        />
                        <span>Just exploring options</span>
                      </label>
                    </div>
                  </div>
                </div>

                {/* Additional Information */}
                <div>
                  <Textarea
                    label="Is there anything else you'd like us to know?"
                    rows={4}
                    value={parentData.additionalNotes}
                    onChange={(e) => setParentData({ ...parentData, additionalNotes: e.target.value })}
                    placeholder="Share any additional context that might help us better understand your teen's needs..."
                  />
                </div>

                {/* Consent */}
                <div>
                  <label className="flex items-start">
                    <input
                      type="checkbox"
                      required
                      checked={parentData.consent}
                      onChange={(e) => setParentData({ ...parentData, consent: e.target.checked })}
                      className="mt-1 mr-3"
                    />
                    <span className="text-sm text-gray-600">
                      I understand that this information will be used to help match my teen with appropriate services. 
                      I consent to being contacted by Empower Treatment to discuss care options.
                    </span>
                  </label>
                </div>

                {submitStatus === 'error' && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
                    An error occurred. Please try again or call us directly at (740) 200-0277.
                  </div>
                )}

                <Button
                  type="submit"
                  disabled={isSubmitting || !parentData.consent}
                  className="w-full"
                >
                  {isSubmitting ? 'Submitting...' : 'Submit Inquiry'}
                </Button>
              </form>
            </div>
          </motion.div>
        )}

        {/* Success Message */}
        {submitStatus === 'success' && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6 }}
            className="max-w-2xl mx-auto text-center"
          >
            <div className="bg-green-50 rounded-2xl p-12">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">Thank You!</h3>
              <p className="text-lg text-gray-600 mb-6">
                Your inquiry has been received. Our youth services team will contact you within 
                {activeForm === 'group-home' ? (groupHomeData.urgencyLevel === 'immediate' ? ' 24 hours' : ' 24-48 hours') : (parentData.urgencyLevel === 'immediate' ? ' 24 hours' : ' 24-48 hours')}.
              </p>
              <p className="text-gray-600">
                If you need immediate assistance, please call us at{' '}
                <a href="tel:740-200-0277" className="text-[#ef3d3d] font-medium">(740) 200-0277</a>.
              </p>
            </div>
          </motion.div>
        )}
      </div>
    </section>
  );
}