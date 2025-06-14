interface SectionProps {
  onAcknowledge: () => void;
  isAcknowledged: boolean;
}

export function ResidentRightsSection({ onAcknowledge, isAcknowledged }: SectionProps) {
  const rights = [
    "The right to be treated with consideration and respect for personal dignity, autonomy, and privacy.",
    "The right to be informed of available services.",
    "The right to be informed of the reason(s) for terminating participation in housing.",
    "The right not to be discriminated against in the provision of housing on the basis of race, ethnicity, age, color, religion, sex, national origin, disability, HIV infection whether asymptomatic or symptomatic, AIDS.",
    "The right to be informed of all rights.",
    "The right to exercise any and all rights without reprisal.",
    "The right to file a grievance in accordance with SR procedures.",
    "The right to have oral and written instructions concerning the procedure for filing a grievance.",
    "The right to confidentiality of communications and personally identifying information within the limitations and requirements for disclosure of resident information under state and federal laws and regulations.",
    "The right to full explanation regarding the loss or restriction of housing privileges, and methods to reinstate the privileges."
  ];

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">
        Section 2: Resident Rights & Grievance Policies
      </h2>

      <div className="space-y-8">
        {/* Rights of Residents */}
        <section>
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Rights of Residents</h3>
          <div className="bg-gray-50 rounded-lg p-6">
            <ol className="space-y-3">
              {rights.map((right, index) => (
                <li key={index} className="flex">
                  <span className="font-semibold text-[#005c65] mr-3 mt-0.5">{index + 1}.</span>
                  <span className="text-gray-700">{right}</span>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* Empower Treatment's Grievance Policy */}
        <section>
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Empower Treatment's Grievance Policy</h3>
          <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
            <p className="text-gray-700">
              Empower Treatment takes Client's rights very seriously and we understand all of our work is lost if a 
              client's rights are violated and they no longer feel safe in our care. Empower Treatment makes sure that 
              all relevant laws and standards are followed closely when protecting client rights. Clients have a right 
              to file a grievance. <strong>Clients will not be punished or removed from services if they choose to file 
              a complaint or grievance.</strong>
            </p>
          </div>
        </section>

        {/* Process for Filing a Grievance */}
        <section>
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Process for Filing a Grievance with Empower Treatment</h3>
          <div className="space-y-4">
            <p className="text-gray-700">
              The client can choose to complete ET's "Grievance Summary Form" that is available through Empower 
              Treatment's website. The client can also choose to contact Empower Treatment's Client Rights Officer (CRO) 
              to file the grievance verbally. A client should expect a response from Empower Treatment within 24 business 
              hours of filing a grievance.
            </p>
            
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
              <div className="flex items-start">
                <svg className="w-5 h-5 text-yellow-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
                <p className="ml-3 text-yellow-800 text-sm">
                  <strong>Important:</strong> You will receive a response within 24 business hours of filing your grievance.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Client Rights Officer Contact */}
        <section>
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Empower Treatment's Client Rights Officer</h3>
          <div className="bg-[#005c65] text-white rounded-lg p-6">
            <div className="space-y-3">
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
                </svg>
                <span className="font-semibold">Nadia Torres</span>
              </div>
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v4a1 1 0 00.293.707l2.828 2.829a1 1 0 101.415-1.415L11 9.586V6z" clipRule="evenodd" />
                </svg>
                <span>Available Monday - Friday, 9:00 AM - 5:00 PM</span>
              </div>
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                  <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                <span>Email: musleh.nadia@gmail.com</span>
              </div>
              <div className="flex items-center">
                <svg className="w-5 h-5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" />
                </svg>
                <span>Phone: (614) 530-5150, ask to be connected with CRO</span>
              </div>
            </div>
          </div>
        </section>

        {/* Your Rights Matter */}
        <div className="bg-green-50 border border-green-200 rounded-lg p-4 mt-6">
          <div className="flex items-start">
            <svg className="w-5 h-5 text-green-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            <p className="ml-3 text-green-800 text-sm">
              <strong>Remember:</strong> Your rights are protected, and you can exercise them without fear of retaliation. 
              We are committed to ensuring you feel safe and respected throughout your recovery journey.
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