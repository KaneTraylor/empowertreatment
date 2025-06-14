import { motion } from 'framer-motion';

interface SectionProps {
  onAcknowledge: () => void;
  isAcknowledged: boolean;
}

export function MoveInSection({ onAcknowledge, isAcknowledged }: SectionProps) {
  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">
        Section 9: Move-In, Termination & Reconsideration Procedures
      </h2>

      <div className="space-y-8">
        {/* Move In */}
        <section>
          <h3 className="text-xl font-semibold text-gray-800 mb-4">1. Move In</h3>
          <div className="bg-green-50 border border-green-200 rounded-lg p-6">
            <p className="text-gray-700 mb-4">
              Before moving into recovery housing, the following requirements must be met:
            </p>
            <ul className="space-y-3">
              <li className="flex items-start">
                <svg className="w-5 h-5 text-green-600 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700">
                  Emergency / Crisis Information form must be submitted to SR office prior to move in.
                </span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-green-600 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700">
                  Resident Fee and security deposit, if applicable, must be paid before move in.
                </span>
              </li>
            </ul>
          </div>
        </section>

        {/* Termination */}
        <section>
          <h3 className="text-xl font-semibold text-gray-800 mb-4">2. Termination</h3>
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <div className="flex items-start mb-4">
              <svg className="w-5 h-5 text-red-600 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <p className="text-gray-700">
                <strong>Important:</strong> Residents&apos; Housing agreement is on a weekly basis.
              </p>
            </div>
            
            <p className="text-gray-700 mb-3">
              Reasons for resident agreement termination include:
            </p>
            <ul className="space-y-2">
              <li className="flex items-start">
                <span className="w-2 h-2 bg-red-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <span className="text-gray-700">Failure to pay resident fee when due</span>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-red-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <span className="text-gray-700">Housing rules violation</span>
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-red-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                <span className="text-gray-700">Failure of drug screen or refusal to take drug screen</span>
              </li>
            </ul>
          </div>
        </section>

        {/* Reconsideration */}
        <section>
          <h3 className="text-xl font-semibold text-gray-800 mb-4">3. Reconsideration</h3>
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-6">
            <div className="flex items-start">
              <svg className="w-5 h-5 text-blue-600 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-11a1 1 0 10-2 0v2H7a1 1 0 100 2h2v2a1 1 0 102 0v-2h2a1 1 0 100-2h-2V7z" clipRule="evenodd" />
              </svg>
              <p className="text-gray-700">
                Residents that leave housing for any reason are able to re-apply for housing under the guidelines 
                listed on the current application.
              </p>
            </div>
          </div>
        </section>

        {/* Summary Note */}
        <div className="bg-gray-100 rounded-lg p-6 mt-6">
          <h4 className="font-semibold text-gray-900 mb-3">Key Points to Remember</h4>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="text-center">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-2">
                <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
              </div>
              <p className="text-sm text-gray-700">Complete all forms and pay fees before move-in</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-2">
                <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <p className="text-sm text-gray-700">Housing agreements are renewed weekly</p>
            </div>
            
            <div className="text-center">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center mx-auto mb-2">
                <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                </svg>
              </div>
              <p className="text-sm text-gray-700">Re-application is possible after leaving</p>
            </div>
          </div>
        </div>
      </div>

      {/* Acknowledgment Button */}
      <div className="mt-8 pt-6 border-t border-gray-200">
        <button
          onClick={onAcknowledge}
          disabled={isAcknowledged}
          className={`w-full px-6 py-3 rounded-lg font-medium transition-all ${
            isAcknowledged
              ? 'bg-green-100 text-green-800 cursor-default'
              : 'bg-[#005c65] text-white hover:bg-[#004a52]'
          }`}
        >
          {isAcknowledged ? (
            <span className="flex items-center justify-center">
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Section Acknowledged
            </span>
          ) : (
            'I have read and understand this section'
          )}
        </button>
      </div>
    </div>
  );
}