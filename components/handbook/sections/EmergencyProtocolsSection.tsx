import { motion } from 'framer-motion';

interface SectionProps {
  onAcknowledge: () => void;
  isAcknowledged: boolean;
}

export function EmergencyProtocolsSection({ onAcknowledge, isAcknowledged }: SectionProps) {
  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">
        Section 6: Emergency Protocols
      </h2>

      <div className="space-y-8">
        {/* Emergency Contact Numbers */}
        <section>
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Emergency Contact Numbers</h3>
          <div className="bg-red-50 border-2 border-red-300 rounded-lg p-6">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="font-bold text-red-900">Life-Threatening Emergency:</span>
                <span className="text-2xl font-bold text-red-900">911</span>
              </div>
              <div className="border-t border-red-200 pt-3 space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">House Manager:</span>
                  <span className="font-medium">(740) 555-0123</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Empower Treatment Crisis Line:</span>
                  <span className="font-medium">1-800-555-0456</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-gray-700">Poison Control:</span>
                  <span className="font-medium">1-800-222-1222</span>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Types of Emergencies */}
        <section>
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Types of Emergencies</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold text-red-700 mb-2">🚨 Call 911 Immediately For:</h4>
              <ul className="text-gray-700 text-sm space-y-1">
                <li>• Unconscious or unresponsive person</li>
                <li>• Difficulty breathing or chest pain</li>
                <li>• Severe bleeding or injury</li>
                <li>• Overdose symptoms</li>
                <li>• Fire or gas leak</li>
                <li>• Violence or immediate danger</li>
              </ul>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold text-yellow-700 mb-2">⚠️ Contact House Manager For:</h4>
              <ul className="text-gray-700 text-sm space-y-1">
                <li>• Non-life-threatening medical issues</li>
                <li>• Property damage or maintenance emergencies</li>
                <li>• Security concerns</li>
                <li>• Resident conflicts requiring intervention</li>
                <li>• Missing resident concerns</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Fire Emergency Procedures */}
        <section>
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Fire Emergency Procedures</h3>
          <div className="bg-orange-50 border-l-4 border-orange-500 p-4 rounded-r-lg">
            <p className="font-bold text-orange-900 mb-3">R.A.C.E. Protocol:</p>
            <ol className="space-y-2">
              <li className="flex items-start">
                <span className="font-bold text-orange-700 mr-2">R</span>
                <div>
                  <span className="font-medium">Rescue:</span>
                  <span className="text-gray-700"> Remove anyone from immediate danger</span>
                </div>
              </li>
              <li className="flex items-start">
                <span className="font-bold text-orange-700 mr-2">A</span>
                <div>
                  <span className="font-medium">Alert:</span>
                  <span className="text-gray-700"> Pull fire alarm and call 911</span>
                </div>
              </li>
              <li className="flex items-start">
                <span className="font-bold text-orange-700 mr-2">C</span>
                <div>
                  <span className="font-medium">Confine:</span>
                  <span className="text-gray-700"> Close doors to contain fire/smoke</span>
                </div>
              </li>
              <li className="flex items-start">
                <span className="font-bold text-orange-700 mr-2">E</span>
                <div>
                  <span className="font-medium">Evacuate:</span>
                  <span className="text-gray-700"> Exit via nearest safe route to designated meeting point</span>
                </div>
              </li>
            </ol>
            <div className="mt-4 p-3 bg-orange-100 rounded">
              <p className="text-sm text-orange-900">
                <strong>Meeting Point:</strong> Front parking lot by the street sign
              </p>
            </div>
          </div>
        </section>

        {/* Medical Emergency Procedures */}
        <section>
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Medical Emergency Response</h3>
          <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg">
            <ol className="list-decimal list-inside space-y-2 text-gray-700">
              <li>Ensure your safety first - don't put yourself at risk</li>
              <li>Call 911 immediately for serious conditions</li>
              <li>Stay with the person if safe to do so</li>
              <li>Follow dispatcher instructions exactly</li>
              <li>Have someone meet emergency responders at the door</li>
              <li>Notify house management as soon as possible</li>
            </ol>
          </div>
        </section>

        {/* Overdose Response */}
        <section>
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Overdose Response Protocol</h3>
          <div className="bg-purple-50 border-2 border-purple-300 rounded-lg p-4">
            <div className="flex items-start mb-3">
              <svg className="w-6 h-6 text-purple-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <p className="ml-3 font-medium text-purple-900">
                Narcan (naloxone) is available on-site. Location: Kitchen first aid cabinet
              </p>
            </div>
            <div className="space-y-3">
              <p className="font-medium text-gray-800">Signs of overdose:</p>
              <ul className="list-disc list-inside text-gray-700 text-sm space-y-1">
                <li>Unconsciousness or inability to wake up</li>
                <li>Slow or no breathing</li>
                <li>Blue lips or fingernails</li>
                <li>Gurgling or snoring sounds</li>
              </ul>
              <p className="font-medium text-gray-800 mt-3">Response steps:</p>
              <ol className="list-decimal list-inside text-gray-700 text-sm space-y-1">
                <li>Call 911 immediately</li>
                <li>Administer Narcan if trained</li>
                <li>Perform rescue breathing if trained</li>
                <li>Stay with person until help arrives</li>
              </ol>
            </div>
          </div>
        </section>

        {/* Natural Disaster Procedures */}
        <section>
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Natural Disaster Procedures</h3>
          <div className="space-y-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-800 mb-2">🌪️ Tornado</h4>
              <p className="text-gray-700 text-sm">
                Move to basement or interior room on lowest floor. Stay away from windows. 
                Cover your head and neck with your hands.
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-800 mb-2">⛈️ Severe Thunderstorm</h4>
              <p className="text-gray-700 text-sm">
                Stay indoors, away from windows. Unplug electronics. Avoid using plumbing fixtures.
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold text-gray-800 mb-2">🌊 Flooding</h4>
              <p className="text-gray-700 text-sm">
                Move to higher ground immediately. Never walk or drive through flood waters. 
                Follow evacuation orders.
              </p>
            </div>
          </div>
        </section>

        {/* Important Reminders */}
        <section>
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Important Reminders</h3>
          <div className="bg-yellow-50 border border-yellow-300 rounded-lg p-4">
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-start">
                <span className="text-yellow-600 mr-2">⚡</span>
                <span>Know the location of all emergency exits</span>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-600 mr-2">⚡</span>
                <span>Participate in all emergency drills</span>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-600 mr-2">⚡</span>
                <span>Keep emergency numbers posted in your room</span>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-600 mr-2">⚡</span>
                <span>Report any safety hazards immediately</span>
              </li>
              <li className="flex items-start">
                <span className="text-yellow-600 mr-2">⚡</span>
                <span>Never disable smoke detectors or fire alarms</span>
              </li>
            </ul>
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