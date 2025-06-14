import { motion } from 'framer-motion';

interface SectionProps {
  onAcknowledge: () => void;
  isAcknowledged: boolean;
}

export function GoodNeighborSection({ onAcknowledge, isAcknowledged }: SectionProps) {
  const rules = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.636 18.364a9 9 0 010-12.728m12.728 0a9 9 0 010 12.728m-9.9-2.829a5 5 0 010-7.07m7.072 0a5 5 0 010 7.07M13 12a1 1 0 11-2 0 1 1 0 012 0z" />
        </svg>
      ),
      title: "No shouting or any loud noise or music",
      description: "Keep voices and activities at reasonable levels at all times"
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Quiet time from 10:00 PM to 7:00 AM",
      description: "Respect quiet hours in and around our locations"
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18.364 18.364A9 9 0 005.636 5.636m12.728 12.728A9 9 0 015.636 5.636m12.728 12.728L5.636 5.636" />
        </svg>
      ),
      title: "Smoking in designated areas only",
      description: "Use only approved smoking areas, never in front yards or common areas"
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
        </svg>
      ),
      title: "Keep yards clear of clutter and trash",
      description: "Maintain clean and tidy outdoor spaces"
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
      title: "Well-maintained yards",
      description: "We will keep yards well maintained regularly"
    }
  ];

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">
        Section 8: &ldquo;Good Neighbor&rdquo; Policy
      </h2>

      <div className="space-y-8">
        {/* Introduction */}
        <section>
          <div className="bg-[#005c65]/5 border-l-4 border-[#005c65] p-6 rounded-r-lg">
            <p className="text-gray-700 text-lg">
              It is the policy of all Self-Reliance River-View South/ Empower Treatment Residences to be a 
              &ldquo;good neighbor&rdquo; to those who live around us.
            </p>
          </div>
        </section>

        {/* Policy Rules */}
        <section>
          <h3 className="text-xl font-semibold text-gray-800 mb-6">Common Rules</h3>
          <p className="text-gray-700 mb-6">Common rules include, but are not limited to:</p>
          
          <div className="space-y-4">
            {rules.map((rule, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="bg-white border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-start">
                  <div className="w-12 h-12 bg-[#005c65]/10 rounded-full flex items-center justify-center flex-shrink-0 mr-4">
                    <div className="text-[#005c65]">
                      {rule.icon}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 mb-1">{rule.title}</h4>
                    <p className="text-gray-600 text-sm">{rule.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Visual Reminder */}
        <section>
          <div className="bg-gradient-to-br from-blue-50 to-purple-50 rounded-lg p-8 text-center">
            <div className="max-w-2xl mx-auto">
              <svg className="w-16 h-16 text-[#005c65] mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
              </svg>
              <h3 className="text-2xl font-bold text-gray-900 mb-3">Building Community Trust</h3>
              <p className="text-gray-700">
                Being a good neighbor isn&apos;t just about following rules—it&apos;s about creating positive 
                relationships and showing that recovery housing is an asset to the community.
              </p>
            </div>
          </div>
        </section>

        {/* Additional Guidelines */}
        <section>
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Additional Guidelines</h3>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-green-50 border border-green-200 rounded-lg p-4">
              <h4 className="font-semibold text-green-800 mb-2 flex items-center">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                DO&apos;s
              </h4>
              <ul className="text-sm text-green-700 space-y-1">
                <li>• Wave and greet neighbors politely</li>
                <li>• Keep sidewalks clear</li>
                <li>• Park vehicles properly</li>
                <li>• Report any concerns to staff</li>
              </ul>
            </div>
            
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
              <h4 className="font-semibold text-red-800 mb-2 flex items-center">
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                DON&apos;Ts
              </h4>
              <ul className="text-sm text-red-700 space-y-1">
                <li>• Loiter on neighboring properties</li>
                <li>• Block driveways or sidewalks</li>
                <li>• Leave trash or belongings outside</li>
                <li>• Engage in loud conversations outdoors</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Community Impact */}
        <section>
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6">
            <div className="flex items-start">
              <svg className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
              </svg>
              <div className="ml-3">
                <h4 className="text-lg font-semibold text-yellow-900 mb-2">Remember Your Impact</h4>
                <p className="text-yellow-800">
                  Your behavior affects not only your own recovery but also the reputation of recovery housing 
                  in the community. By being a good neighbor, you help ensure that recovery housing remains 
                  welcome in residential neighborhoods, creating opportunities for others seeking recovery.
                </p>
              </div>
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