import { motion } from 'framer-motion';

interface SectionProps {
  onAcknowledge: () => void;
  isAcknowledged: boolean;
}

export function EmergencySection({ onAcknowledge, isAcknowledged }: SectionProps) {
  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">
        Section 6: Emergency Protocols
      </h2>

      <div className="space-y-8">
        {/* Emergency Numbers */}
        <section>
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Emergency Numbers</h3>
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-red-900">Fire/Police Emergency</p>
                  <p className="text-2xl font-bold text-red-700">911</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Poison Control</p>
                  <p className="text-xl font-bold text-gray-700">1-800-222-1222</p>
                </div>
              </div>
            </div>
            
            <div className="grid md:grid-cols-2 gap-4 mt-4">
              <div className="flex items-center">
                <div className="w-12 h-12 bg-orange-100 rounded-full flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Gas Company Emergency</p>
                  <p className="text-xl font-bold text-gray-700">1-800-344-4077</p>
                </div>
              </div>
              
              <div className="flex items-center">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mr-4">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 4a2 2 0 114 0v1a1 1 0 001 1h3a1 1 0 011 1v3a1 1 0 01-1 1h-1a2 2 0 100 4h1a1 1 0 011 1v3a1 1 0 01-1 1h-3a1 1 0 01-1-1v-1a2 2 0 10-4 0v1a1 1 0 01-1 1H7a1 1 0 01-1-1v-3a1 1 0 00-1-1H4a2 2 0 110-4h1a1 1 0 001-1V7a1 1 0 011-1h3a1 1 0 001-1V4z" />
                  </svg>
                </div>
                <div>
                  <p className="font-semibold text-gray-900">Maintenance Emergency</p>
                  <p className="text-lg font-bold text-gray-700">Contact Housing Staff</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Emergency Procedures */}
        <section>
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Emergency Procedures</h3>
          
          <div className="space-y-4">
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="flex items-start">
                <div className="w-10 h-10 bg-red-100 rounded-full flex items-center justify-center flex-shrink-0 mr-4">
                  <svg className="w-5 h-5 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 mb-2">Fire / Bomb Threat / Evacuation</h4>
                  <p className="text-gray-700">
                    Residents will be removed from the house and will meet at the location set for this type of emergency.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="flex items-start">
                <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0 mr-4">
                  <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 15a4 4 0 004 4h9a5 5 0 10-.1-9.999 5.002 5.002 0 10-9.78 2.096A4.001 4.001 0 003 15z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 mb-2">Tornado / Severe Weather</h4>
                  <p className="text-gray-700">
                    Residents will gather in a designated indoor location.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="bg-white border border-gray-200 rounded-lg p-6">
              <div className="flex items-start">
                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0 mr-4">
                  <svg className="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900 mb-2">Loss of Electricity / Other</h4>
                  <p className="text-gray-700">
                    Residents should call SR maintenance.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Crisis Situations */}
        <section>
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Level II Emergency/Crisis Information</h3>
          
          <div className="bg-amber-50 border border-amber-200 rounded-lg p-6 mb-4">
            <p className="text-gray-700 mb-4">
              Crisis situations may include, but are not limited to:
            </p>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <span className="w-2 h-2 bg-amber-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                Intoxication / substance use
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-amber-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                A mental health episode that is more severe than the usual behavior
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-amber-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                Vandalism or destruction of property
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-amber-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                Aggression/violence
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-amber-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                Severe disrespect toward another person
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-amber-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                Delusion/hallucinations
              </li>
              <li className="flex items-start">
                <span className="w-2 h-2 bg-amber-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                Leaving without notice
              </li>
            </ul>
          </div>
          
          <div className="bg-red-100 border-2 border-red-300 rounded-lg p-6 text-center">
            <svg className="w-12 h-12 text-red-600 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <p className="text-xl font-bold text-red-900 mb-2">
              For a mental health, medical emergency, or threat to safety
            </p>
            <p className="text-3xl font-bold text-red-700">
              Call 9-1-1
            </p>
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