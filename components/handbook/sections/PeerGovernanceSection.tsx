import { motion } from 'framer-motion';

interface SectionProps {
  onAcknowledge: () => void;
  isAcknowledged: boolean;
}

export function PeerGovernanceSection({ onAcknowledge, isAcknowledged }: SectionProps) {
  const qualifications = [
    "Set a positive resident example",
    "Promote Recovery",
    "Be able to communicate with staff and other residents",
    "Be able to work with other HOH, and Navigators",
    "Facilitate evening wrap ups in houses",
    "Assist in chore assigning, instruction, and follow up",
    "Meet periodically with housing staff to discuss concerns, issues, and ideas"
  ];

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">
        Section 11: Peer Governance
      </h2>

      <div className="space-y-8">
        {/* Introduction */}
        <section>
          <div className="bg-[#005c65]/5 border-l-4 border-[#005c65] p-6 rounded-r-lg">
            <p className="text-gray-700 text-lg">
              It is the intent of SR/ET to have voluntary peer leaders (Head of House – HOH) within the Recovery Residences. 
              The purpose is to provide peer to peer support and mentorship through honesty, integrity and accountability.
            </p>
          </div>
        </section>

        {/* Head of House Role */}
        <section>
          <h3 className="text-xl font-semibold text-gray-800 mb-6">Head of House (HOH) Position</h3>
          
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-6 mb-6">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-white rounded-full flex items-center justify-center shadow-md mr-4">
                <svg className="w-6 h-6 text-[#005c65]" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
              </div>
              <div>
                <h4 className="text-lg font-semibold text-gray-900">Peer Leadership Opportunity</h4>
                <p className="text-gray-600">Support fellow residents in their recovery journey</p>
              </div>
            </div>
          </div>
        </section>

        {/* Qualifications */}
        <section>
          <h3 className="text-xl font-semibold text-gray-800 mb-4">HOH Qualifications</h3>
          
          <div className="bg-white border border-gray-200 rounded-lg p-6">
            <p className="text-gray-700 mb-4">The Head of House must meet the following qualifications:</p>
            
            <div className="space-y-3">
              {qualifications.map((qualification, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  className="flex items-start"
                >
                  <div className="w-6 h-6 bg-[#005c65]/10 rounded-full flex items-center justify-center flex-shrink-0 mt-0.5 mr-3">
                    <span className="text-xs font-bold text-[#005c65]">{index + 1}</span>
                  </div>
                  <p className="text-gray-700">{qualification}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Core Values */}
        <section>
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Core Values of Peer Governance</h3>
          
          <div className="grid md:grid-cols-3 gap-4">
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-lg p-6 text-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-md">
                <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Honesty</h4>
              <p className="text-sm text-gray-600">Building trust through truthful communication</p>
            </div>
            
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg p-6 text-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-md">
                <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 10h4.764a2 2 0 011.789 2.894l-3.5 7A2 2 0 0115.263 21h-4.017c-.163 0-.326-.02-.485-.06L7 20m7-10V5a2 2 0 00-2-2h-.095c-.5 0-.905.405-.905.905 0 .714-.211 1.412-.608 2.006L7 11v9m7-10h-2M7 20H5a2 2 0 01-2-2v-6a2 2 0 012-2h2.5" />
                </svg>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Integrity</h4>
              <p className="text-sm text-gray-600">Leading by example with strong moral principles</p>
            </div>
            
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-lg p-6 text-center">
              <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-md">
                <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                </svg>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Accountability</h4>
              <p className="text-sm text-gray-600">Taking responsibility for house community</p>
            </div>
          </div>
        </section>

        {/* Benefits */}
        <section>
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Benefits of Peer Governance</h3>
          
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <ul className="space-y-3">
              <li className="flex items-start">
                <svg className="w-5 h-5 text-yellow-600 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700">Creates a supportive community environment</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-yellow-600 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700">Provides leadership development opportunities</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-yellow-600 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700">Encourages peer-to-peer mentorship</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-yellow-600 mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span className="text-gray-700">Strengthens recovery through service to others</span>
              </li>
            </ul>
          </div>
        </section>

        {/* How to Become HOH */}
        <section>
          <div className="bg-gray-100 rounded-lg p-6">
            <h4 className="font-semibold text-gray-900 mb-3">Interested in Becoming a Head of House?</h4>
            <p className="text-gray-700 mb-4">
              If you&apos;re interested in serving as a Head of House and believe you meet the qualifications, 
              speak with your case manager or housing staff. This is a voluntary position that can enhance 
              your recovery journey while helping others.
            </p>
            <div className="flex items-center text-[#005c65]">
              <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <span className="text-sm font-medium">Talk to staff to learn more about this opportunity</span>
            </div>
          </div>
        </section>
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