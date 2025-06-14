import { motion } from 'framer-motion';
import { useState } from 'react';

interface SectionProps {
  onAcknowledge: () => void;
  isAcknowledged: boolean;
  allSectionsComplete: boolean;
}

export function AcknowledgmentSection({ onAcknowledge, isAcknowledged, allSectionsComplete }: SectionProps) {
  const [residentName, setResidentName] = useState('');
  const [date, setDate] = useState(new Date().toISOString().split('T')[0]);
  const [agreed, setAgreed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', { residentName, agreed, allSectionsComplete });
    
    if (residentName && agreed && allSectionsComplete) {
      setIsSubmitting(true);
      try {
        // Send acknowledgment to API
        const response = await fetch('/api/submit-handbook-acknowledgment', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            residentName,
            signatureDate: date,
          }),
        });

        const result = await response.json();
        
        if (result.success) {
          console.log('Acknowledgment submitted successfully');
          onAcknowledge();
        } else {
          console.error('Failed to submit acknowledgment:', result.message);
          alert('There was an error submitting your acknowledgment. Please try again.');
        }
      } catch (error) {
        console.error('Error submitting acknowledgment:', error);
        alert('There was an error submitting your acknowledgment. Please check your connection and try again.');
      } finally {
        setIsSubmitting(false);
      }
    }
  };

  // Debug logging
  console.log('AcknowledgmentSection render:', { allSectionsComplete, isAcknowledged });

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">
        Section 12: Residents&apos; Handbook Acknowledgement
      </h2>

      <div className="space-y-8">
        {/* Acknowledgment Statement */}
        <section>
          <div className="bg-[#005c65]/5 border-l-4 border-[#005c65] p-6 rounded-r-lg">
            <p className="text-gray-700 text-lg">
              By signing and dating below, I attest that I agree to abide by the articles of this resident handbook 
              including the rules and responsibilities and understand that violation of the rules contained can result 
              in disciplinary action including dismissal from housing.
            </p>
          </div>
        </section>

        {/* Progress Check */}
        {!allSectionsComplete && (
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <div className="flex items-start">
              <svg className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-yellow-800">
                  Complete All Sections First
                </h3>
                <p className="mt-2 text-sm text-yellow-700">
                  You must read and acknowledge all previous sections before you can submit your final acknowledgment.
                </p>
                <p className="mt-1 text-xs text-yellow-600">
                  Debug: allSectionsComplete = {String(allSectionsComplete)}
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Acknowledgment Form */}
        <section>
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Digital Signature</h3>
              
              <div className="space-y-4">
                <div>
                  <label htmlFor="residentName" className="block text-sm font-medium text-gray-700 mb-2">
                    Resident Full Name
                  </label>
                  <input
                    type="text"
                    id="residentName"
                    value={residentName}
                    onChange={(e) => setResidentName(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#005c65] focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                    placeholder="Enter your full name"
                    disabled={!allSectionsComplete || isAcknowledged}
                    required
                  />
                </div>
                
                <div>
                  <label htmlFor="date" className="block text-sm font-medium text-gray-700 mb-2">
                    Date
                  </label>
                  <input
                    type="date"
                    id="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-[#005c65] focus:border-transparent disabled:bg-gray-100 disabled:cursor-not-allowed"
                    disabled={!allSectionsComplete || isAcknowledged}
                    required
                  />
                </div>
                
                <div className="pt-4">
                  <label className="flex items-start">
                    <input
                      type="checkbox"
                      checked={agreed}
                      onChange={(e) => setAgreed(e.target.checked)}
                      className="mt-1 w-4 h-4 text-[#005c65] rounded border-gray-300 focus:ring-[#005c65] disabled:opacity-50"
                      disabled={!allSectionsComplete || isAcknowledged}
                    />
                    <span className="ml-3 text-sm text-gray-700">
                      I have read, understood, and agree to all terms and conditions outlined in this Recovery Housing 
                      Resident Handbook. I understand that failure to comply with these rules may result in termination 
                      from the housing program.
                    </span>
                  </label>
                </div>
              </div>
            </div>

            {/* Summary of Key Points */}
            <div className="bg-gray-50 rounded-lg p-6">
              <h4 className="font-semibold text-gray-900 mb-3">By submitting this acknowledgment, you confirm that you:</h4>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex items-start">
                  <svg className="w-4 h-4 text-green-600 mt-0.5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Understand all housing rules and responsibilities
                </li>
                <li className="flex items-start">
                  <svg className="w-4 h-4 text-green-600 mt-0.5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Know your rights and the grievance procedures
                </li>
                <li className="flex items-start">
                  <svg className="w-4 h-4 text-green-600 mt-0.5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Are aware of emergency procedures and contacts
                </li>
                <li className="flex items-start">
                  <svg className="w-4 h-4 text-green-600 mt-0.5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Agree to participate in life skills development
                </li>
                <li className="flex items-start">
                  <svg className="w-4 h-4 text-green-600 mt-0.5 mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Will follow the code of ethics and good neighbor policy
                </li>
              </ul>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={!allSectionsComplete || !residentName || !agreed || isAcknowledged || isSubmitting}
              className={`w-full px-6 py-3 rounded-lg font-medium transition-all ${
                isAcknowledged
                  ? 'bg-green-100 text-green-800 cursor-default'
                  : !allSectionsComplete || !residentName || !agreed || isSubmitting
                  ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                  : 'bg-[#005c65] text-white hover:bg-[#004a52]'
              }`}
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-3 h-5 w-5" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Submitting...
                </span>
              ) : isAcknowledged ? (
                <span className="flex items-center justify-center">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  Handbook Acknowledged - {residentName} ({date})
                </span>
              ) : (
                'Submit Acknowledgment'
              )}
            </button>
          </form>
        </section>

        {/* Success Message */}
        {isAcknowledged && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="bg-green-50 border border-green-200 rounded-lg p-6"
          >
            <div className="flex items-start">
              <svg className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
              <div className="ml-3">
                <h3 className="text-sm font-medium text-green-800">
                  Thank you for completing the handbook!
                </h3>
                <p className="mt-2 text-sm text-green-700">
                  Your acknowledgment has been recorded. A copy of this handbook is available for your reference at any time 
                  through the housing portal.
                </p>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
}