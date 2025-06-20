'use client';

import { useState } from 'react';
import { Header } from '@/components/Header';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

interface VerificationResult {
  isAccepted: boolean;
  coverageDetails?: {
    inNetwork: boolean;
    estimatedCoverage: string;
    deductible: string;
    outOfPocket: string;
    preAuthRequired: boolean;
  };
}

export default function InsuranceVerification() {
  const [step, setStep] = useState<'provider' | 'details' | 'verifying' | 'results'>('provider');
  const [formData, setFormData] = useState({
    insuranceProvider: '',
    memberID: '',
    dateOfBirth: '',
    groupNumber: '',
    firstName: '',
    lastName: '',
    phone: '',
    email: ''
  });
  const [verificationResult, setVerificationResult] = useState<VerificationResult | null>(null);

  // List of insurance providers
  const insuranceProviders = [
    { value: 'aetna', label: 'Aetna', logo: '🏥' },
    { value: 'anthem-bcbs', label: 'Anthem Blue Cross Blue Shield', logo: '🏥' },
    { value: 'bcbs', label: 'Blue Cross Blue Shield', logo: '🏥' },
    { value: 'cigna', label: 'Cigna', logo: '🏥' },
    { value: 'humana', label: 'Humana', logo: '🏥' },
    { value: 'kaiser', label: 'Kaiser Permanente', logo: '🏥' },
    { value: 'medicaid', label: 'Medicaid', logo: '🏥' },
    { value: 'medicare', label: 'Medicare', logo: '🏥' },
    { value: 'united', label: 'United Healthcare', logo: '🏥' },
    { value: 'wellcare', label: 'WellCare', logo: '🏥' },
    { value: 'other', label: 'Other Insurance Provider', logo: '🏥' }
  ];

  const handleProviderSelect = (provider: string) => {
    setFormData({ ...formData, insuranceProvider: provider });
    setStep('details');
  };

  const handleVerification = async (e: React.FormEvent) => {
    e.preventDefault();
    setStep('verifying');

    try {
      const response = await fetch('/api/verify-insurance', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();
      console.log('Verification result:', result);

      if (result.success && result.mockResult) {
        setVerificationResult(result.mockResult);
        setStep('results');
      } else {
        // Handle error
        console.error('Verification failed:', result);
        setVerificationResult({
          isAccepted: false
        });
        setStep('results');
      }
    } catch (error) {
      console.error('Error verifying insurance:', error);
      // Fallback to showing not accepted
      setVerificationResult({
        isAccepted: false
      });
      setStep('results');
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleBack = () => {
    if (step === 'details') {
      setStep('provider');
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
              Insurance Verification
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Check your insurance coverage for treatment at Empower. Get instant verification and understand your benefits.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Progress Bar */}
      {(step === 'provider' || step === 'details') && (
        <div className="max-w-4xl mx-auto px-5 md:px-8 lg:px-12 mb-8">
          <div className="flex items-center justify-center space-x-4">
            <div className="flex items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                step === 'provider' ? 'bg-primary text-white' : 'bg-green-500 text-white'
              }`}>
                {step === 'provider' ? '1' : '✓'}
              </div>
              <span className="ml-2 text-sm font-medium text-gray-700">Choose Provider</span>
            </div>
            <div className="w-24 h-1 bg-gray-300">
              <div className={`h-full bg-primary transition-all duration-300 ${
                step === 'details' ? 'w-full' : 'w-0'
              }`}></div>
            </div>
            <div className="flex items-center">
              <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                step === 'details' ? 'bg-primary text-white' : 'bg-gray-300 text-gray-600'
              }`}>
                2
              </div>
              <span className="ml-2 text-sm font-medium text-gray-700">Enter Details</span>
            </div>
          </div>
        </div>
      )}

      {/* Main Content */}
      <section className="pb-24 px-5 md:px-8 lg:px-12">
        <div className="max-w-4xl mx-auto">
          {/* Step 1: Choose Provider */}
          {step === 'provider' && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white rounded-2xl shadow-xl p-8 md:p-12"
            >
              <h2 className="text-2xl font-semibold text-gray-900 mb-2">Select Your Insurance Provider</h2>
              <p className="text-gray-600 mb-8">Choose your insurance provider from the list below. All listed providers are in-network with Empower Treatment.</p>
              
              <div className="grid md:grid-cols-2 gap-4">
                {insuranceProviders.map((provider) => (
                  <button
                    key={provider.value}
                    onClick={() => handleProviderSelect(provider.value)}
                    className="flex items-center p-4 border-2 border-gray-200 rounded-lg hover:border-primary hover:bg-primary/5 transition-all duration-200 text-left group"
                  >
                    <span className="text-2xl mr-3">{provider.logo}</span>
                    <span className="font-medium text-gray-900 group-hover:text-primary">
                      {provider.label}
                    </span>
                  </button>
                ))}
              </div>

              <div className="mt-8 p-4 bg-green-50 border border-green-200 rounded-lg">
                <p className="text-sm text-green-800">
                  <strong>Good News!</strong> All insurance providers listed above are in-network with Empower Treatment, 
                  which means lower out-of-pocket costs for you.
                </p>
              </div>
            </motion.div>
          )}

          {/* Step 2: Enter Details */}
          {step === 'details' && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
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

              <h2 className="text-2xl font-semibold text-gray-900 mb-2">Enter Your Information</h2>
              <p className="text-gray-600 mb-8">
                Provider selected: <strong>{insuranceProviders.find(p => p.value === formData.insuranceProvider)?.label}</strong>
              </p>
              
              <form onSubmit={handleVerification} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <Input
                    name="memberID"
                    label="Member ID"
                    placeholder="Found on your insurance card"
                    value={formData.memberID}
                    onChange={handleInputChange}
                    required
                  />

                  <Input
                    name="groupNumber"
                    label="Group Number"
                    placeholder="If applicable"
                    value={formData.groupNumber}
                    onChange={handleInputChange}
                  />

                  <Input
                    name="firstName"
                    label="First Name"
                    value={formData.firstName}
                    onChange={handleInputChange}
                    required
                  />

                  <Input
                    name="lastName"
                    label="Last Name"
                    value={formData.lastName}
                    onChange={handleInputChange}
                    required
                  />

                  <Input
                    name="dateOfBirth"
                    label="Date of Birth"
                    type="date"
                    value={formData.dateOfBirth}
                    onChange={handleInputChange}
                    required
                  />

                  <Input
                    name="phone"
                    label="Phone Number"
                    type="tel"
                    placeholder="(555) 123-4567"
                    value={formData.phone}
                    onChange={handleInputChange}
                    required
                  />

                  <div className="md:col-span-2">
                    <Input
                      name="email"
                      label="Email Address"
                      type="email"
                      placeholder="your@email.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                </div>

                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <p className="text-sm text-blue-800">
                    <strong>Privacy Notice:</strong> Your information is secure and will only be used to verify your insurance benefits. 
                    We comply with all HIPAA regulations.
                  </p>
                </div>

                <div className="flex justify-center pt-4">
                  <Button type="submit" size="lg" className="min-w-[200px]">
                    Verify Coverage
                  </Button>
                </div>
              </form>
            </motion.div>
          )}

          {/* Verifying State */}
          {step === 'verifying' && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.3 }}
              className="bg-white rounded-2xl shadow-xl p-12 text-center"
            >
              <div className="flex justify-center mb-6">
                <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
              </div>
              <h2 className="text-2xl font-semibold text-gray-900 mb-4">Verifying Your Coverage</h2>
              <p className="text-gray-600">This typically takes 10-30 seconds...</p>
            </motion.div>
          )}

          {/* Results */}
          {step === 'results' && verificationResult && (
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="space-y-6"
            >
              {/* Results Card */}
              <div className={`bg-white rounded-2xl shadow-xl p-8 md:p-12 border-t-4 ${
                verificationResult.isAccepted ? 'border-green-500' : 'border-yellow-500'
              }`}>
                <div className="text-center mb-8">
                  {verificationResult.isAccepted ? (
                    <>
                      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <h2 className="text-3xl font-bold text-gray-900 mb-2">Great News!</h2>
                      <p className="text-xl text-gray-600">Your insurance is accepted at Empower Treatment</p>
                    </>
                  ) : (
                    <>
                      <div className="w-20 h-20 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                        <svg className="w-10 h-10 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                        </svg>
                      </div>
                      <h2 className="text-3xl font-bold text-gray-900 mb-2">Alternative Options Available</h2>
                      <p className="text-xl text-gray-600">We can help you explore other payment options</p>
                    </>
                  )}
                </div>

                {verificationResult.isAccepted && verificationResult.coverageDetails && (
                  <div className="space-y-6">
                    <div className="bg-gray-50 rounded-xl p-6">
                      <h3 className="font-semibold text-gray-900 mb-4">Your Coverage Details</h3>
                      <div className="space-y-3">
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Network Status:</span>
                          <span className="font-medium text-gray-900">
                            {verificationResult.coverageDetails.inNetwork ? 'In-Network' : 'Out-of-Network'}
                          </span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Estimated Coverage:</span>
                          <span className="font-medium text-gray-900">{verificationResult.coverageDetails.estimatedCoverage}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Deductible:</span>
                          <span className="font-medium text-gray-900">{verificationResult.coverageDetails.deductible}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Out-of-Pocket Maximum:</span>
                          <span className="font-medium text-gray-900">{verificationResult.coverageDetails.outOfPocket}</span>
                        </div>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-600">Pre-Authorization:</span>
                          <span className="font-medium text-gray-900">
                            {verificationResult.coverageDetails.preAuthRequired ? 'Required' : 'Not Required'}
                          </span>
                        </div>
                      </div>
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                      <p className="text-sm text-blue-800">
                        <strong>Note:</strong> These are estimated benefits based on typical coverage. 
                        Our admissions team will conduct a full verification and explain your exact benefits.
                      </p>
                    </div>
                  </div>
                )}

                {!verificationResult.isAccepted && (
                  <div className="space-y-6">
                    <div className="bg-gray-50 rounded-xl p-6">
                      <h3 className="font-semibold text-gray-900 mb-4">Other Payment Options</h3>
                      <ul className="space-y-3 text-gray-600">
                        <li className="flex items-start">
                          <svg className="w-5 h-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span>Flexible payment plans available</span>
                        </li>
                        <li className="flex items-start">
                          <svg className="w-5 h-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span>Sliding scale fees based on income</span>
                        </li>
                        <li className="flex items-start">
                          <svg className="w-5 h-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span>Out-of-network benefits may still apply</span>
                        </li>
                        <li className="flex items-start">
                          <svg className="w-5 h-5 text-green-500 mt-0.5 mr-2 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                          </svg>
                          <span>Assistance with insurance appeals</span>
                        </li>
                      </ul>
                    </div>
                  </div>
                )}

                {/* Next Steps */}
                <div className="mt-8 text-center space-y-4">
                  <h3 className="text-xl font-semibold text-gray-900">Ready to Take the Next Step?</h3>
                  <p className="text-gray-600">Our admissions team is here to help you understand your coverage and start treatment.</p>
                  <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                    <Link href="/form">
                      <Button size="lg" className="min-w-[200px]">
                        Start Application
                      </Button>
                    </Link>
                    <a href="tel:+17402000277">
                      <Button variant="outline" size="lg" className="min-w-[200px]">
                        Call (740) 200-0277
                      </Button>
                    </a>
                  </div>
                </div>
              </div>

              {/* Additional Information */}
              <div className="bg-white rounded-2xl shadow-xl p-8">
                <h3 className="text-xl font-semibold text-gray-900 mb-4">What Happens Next?</h3>
                <div className="space-y-4">
                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-primary font-semibold">1</span>
                    </div>
                    <div className="ml-4">
                      <h4 className="font-medium text-gray-900">Complete Your Application</h4>
                      <p className="text-gray-600 text-sm mt-1">Fill out our brief online form to help us understand your needs.</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-primary font-semibold">2</span>
                    </div>
                    <div className="ml-4">
                      <h4 className="font-medium text-gray-900">Speak with Our Team</h4>
                      <p className="text-gray-600 text-sm mt-1">Have a confidential conversation about your treatment options and benefits.</p>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5">
                      <span className="text-primary font-semibold">3</span>
                    </div>
                    <div className="ml-4">
                      <h4 className="font-medium text-gray-900">Begin Your Recovery</h4>
                      <p className="text-gray-600 text-sm mt-1">Start treatment with a personalized plan designed for your success.</p>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </section>
    </div>
  );
}