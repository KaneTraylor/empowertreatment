import { motion } from 'framer-motion';

interface SectionProps {
  onAcknowledge: () => void;
  isAcknowledged: boolean;
}

export function CommunicableDiseasesSection({ onAcknowledge, isAcknowledged }: SectionProps) {
  const diseases = [
    {
      title: "1. Tuberculosis",
      content: [
        "Tuberculosis (commonly known as TB) is a bacterial disease usually affecting the lungs.",
        "The bacteria causing tuberculosis is spread through the air, such as through coughing or sneezing.",
        "The most important way to stop the spread of TB is to cover the mouth and nose when coughing or sneezing."
      ],
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      ),
      color: "blue"
    },
    {
      title: "2. Hepatitis",
      content: [
        "Hepatitis B (HBV) is a serious, sometimes deadly disease, caused by a virus that infects and attacks the liver.",
        "HBV can also be spread indirectly because it can survive on surfaces dried and at room temperature for at least a week!",
        "Prevention includes:",
        "• Do not share needles",
        "• Use condoms during sex",
        "• Get the Hepatitis B vaccination"
      ],
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
        </svg>
      ),
      color: "yellow"
    },
    {
      title: "3. HIV/AIDS",
      content: [
        "Human Immunodeficiency Virus attacks the body's immune system causing it to weaken and become vulnerable to infections.",
        "HIV is transmitted mainly through sexual contact and sharing contaminated needles.",
        "HIV is NOT transmitted indirectly by touching or working around people who are HIV-positive."
      ],
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      color: "red"
    },
    {
      title: "4. COVID-19",
      content: [
        "COVID-19 is a respiratory virus that can cause a range of symptoms at varying severities.",
        "COVID-19 is primarily spread via respiratory droplets produced by coughing, sneezing, talking, etc.",
        "Precautions include:",
        "• Maintaining a distance of 6ft or more around individuals",
        "• Wearing facial coverings",
        "• Washing hands for at least 20 seconds"
      ],
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.618 5.984A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
      color: "purple"
    }
  ];

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">
        Section 4: Communicable Diseases Information & Prevention
      </h2>

      <div className="space-y-8">
        {/* Introduction */}
        <section>
          <div className="bg-blue-50 border-l-4 border-blue-500 p-6 rounded-r-lg">
            <p className="text-gray-700">
              Understanding communicable diseases and how to prevent their spread is essential for maintaining 
              a healthy recovery environment. This section provides important information about common 
              communicable diseases and prevention measures.
            </p>
          </div>
        </section>

        {/* Disease Information */}
        <section>
          <h3 className="text-xl font-semibold text-gray-800 mb-6">Disease Information</h3>
          
          <div className="space-y-6">
            {diseases.map((disease, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="bg-white border border-gray-200 rounded-lg overflow-hidden"
              >
                <div className={`bg-${disease.color}-50 border-b border-${disease.color}-200 p-4`}>
                  <div className="flex items-center">
                    <div className={`w-10 h-10 bg-${disease.color}-100 rounded-full flex items-center justify-center mr-3`}>
                      <div className={`text-${disease.color}-600`}>
                        {disease.icon}
                      </div>
                    </div>
                    <h4 className="text-lg font-semibold text-gray-900">{disease.title}</h4>
                  </div>
                </div>
                
                <div className="p-4">
                  <ul className="space-y-2">
                    {disease.content.map((item, itemIndex) => (
                      <li key={itemIndex} className="text-gray-700">
                        {item.startsWith('•') ? (
                          <span className="ml-4">{item}</span>
                        ) : (
                          item
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* General Prevention Guidelines */}
        <section>
          <h3 className="text-xl font-semibold text-gray-800 mb-4">General Prevention Guidelines</h3>
          
          <div className="bg-green-50 border border-green-200 rounded-lg p-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h4 className="font-semibold text-green-900 mb-3 flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Personal Hygiene
                </h4>
                <ul className="space-y-2 text-green-800 text-sm">
                  <li>• Wash hands frequently with soap and water</li>
                  <li>• Cover mouth and nose when coughing or sneezing</li>
                  <li>• Avoid touching face with unwashed hands</li>
                  <li>• Shower regularly and maintain personal cleanliness</li>
                </ul>
              </div>
              
              <div>
                <h4 className="font-semibold text-green-900 mb-3 flex items-center">
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                  </svg>
                  Shared Spaces
                </h4>
                <ul className="space-y-2 text-green-800 text-sm">
                  <li>• Do not share personal items (toothbrushes, razors, etc.)</li>
                  <li>• Clean and disinfect shared surfaces regularly</li>
                  <li>• Properly dispose of tissues and waste</li>
                  <li>• Report any illness to house staff immediately</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Important Notice */}
        <section>
          <div className="bg-red-50 border border-red-200 rounded-lg p-6">
            <div className="flex items-start">
              <svg className="w-6 h-6 text-red-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
              <div className="ml-3">
                <h4 className="text-lg font-semibold text-red-900 mb-2">Important Notice</h4>
                <p className="text-red-800">
                  If you have been diagnosed with a communicable disease or are experiencing symptoms, 
                  you must notify house staff immediately. This is for your safety and the safety of 
                  all residents. Medical privacy will be maintained while ensuring appropriate precautions 
                  are taken.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Resources */}
        <section>
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Additional Resources</h3>
          
          <div className="bg-gray-100 rounded-lg p-6">
            <p className="text-gray-700 mb-4">
              For more information about communicable diseases and prevention:
            </p>
            <ul className="space-y-2 text-gray-700">
              <li className="flex items-center">
                <svg className="w-4 h-4 text-[#005c65] mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
                Contact your case manager or house staff
              </li>
              <li className="flex items-center">
                <svg className="w-4 h-4 text-[#005c65] mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
                Visit the CDC website for current health guidelines
              </li>
              <li className="flex items-center">
                <svg className="w-4 h-4 text-[#005c65] mr-2 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
                Speak with your healthcare provider about vaccinations
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