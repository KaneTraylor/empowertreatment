import { motion } from 'framer-motion';

interface SectionProps {
  onAcknowledge: () => void;
  isAcknowledged: boolean;
}

export function WelcomeSection({ onAcknowledge, isAcknowledged }: SectionProps) {
  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">
        Section 1: Program Description; Values; Mission; Vision
      </h2>

      <div className="space-y-8">
        {/* Purpose of Recovery Housing */}
        <section>
          <h3 className="text-xl font-semibold text-gray-800 mb-3">Purpose of Recovery Housing</h3>
          <p className="text-gray-700 leading-relaxed">
            Empower Treatment partners with Self-Reliance River-View South to offer recovery housing in Portsmouth, Ohio. 
            Our recovery houses are safe and substance-free. We know that it can be hard to reach your recovery goals if 
            others around you are using drugs and alcohol. Recovery housing is a great resource for people who are looking 
            to focus on their recovery from addiction and want to be linked with other peers in recovery.
          </p>
        </section>

        {/* About Empower Treatment */}
        <section>
          <h3 className="text-xl font-semibold text-gray-800 mb-3">About Empower Treatment</h3>
          <div className="bg-[#005c65]/5 border-l-4 border-[#005c65] p-4 rounded-r-lg mb-4">
            <p className="text-gray-700 mb-2">
              Empower Treatment envisions an Ohio where every single community member has access to empowering, equitable, 
              and harm-reduction driven behavioral health services. To achieve this, we provide evidence-based and 
              accessibility-focused care through telehealth and in-home means, going the extra mile to meet every patient 
              where they are at.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold text-[#005c65] mb-2">Our Mission</h4>
              <p className="text-gray-700 text-sm">
                To empower community members living with addiction through accessible, compassionate, and individualized 
                behavioral healthcare treatment, regardless of their ability to pay.
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold text-[#005c65] mb-2">Our Vision</h4>
              <p className="text-gray-700 text-sm">
                To empower a future that responds to the disease of addiction with compassionate, connective, and 
                universally accessible treatment.
              </p>
            </div>
          </div>
        </section>

        {/* About Self-Reliance River-View South */}
        <section>
          <h3 className="text-xl font-semibold text-gray-800 mb-3">About Self-Reliance River-View South</h3>
          <p className="text-gray-700 mb-4">
            Self-Reliance River-View South is a provider of quality, affordable housing solutions, all of which are 
            Ohio Recovery Housing Certified. SR values respect, diversity, integrity, and excellence.
          </p>
          
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold text-[#005c65] mb-2">SR's Mission</h4>
              <p className="text-gray-700 text-sm">
                Focused on being a provider of quality recovery housing and seeking to provide sustainable, quality 
                housing to under-served groups in our service area.
              </p>
            </div>
            <div className="bg-gray-50 p-4 rounded-lg">
              <h4 className="font-semibold text-[#005c65] mb-2">SR's Vision</h4>
              <p className="text-gray-700 text-sm">
                A safe, affordable home for everyone.
              </p>
            </div>
          </div>
        </section>

        {/* Partnership Note */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
          <div className="flex items-start">
            <svg className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            <p className="ml-3 text-blue-800 text-sm">
              This partnership between Empower Treatment and Self-Reliance River-View South ensures you receive 
              comprehensive support for both your recovery journey and stable housing needs.
            </p>
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