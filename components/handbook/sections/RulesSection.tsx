import { motion } from 'framer-motion';

interface SectionProps {
  onAcknowledge: () => void;
  isAcknowledged: boolean;
}

export function RulesSection({ onAcknowledge, isAcknowledged }: SectionProps) {
  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">
        Section 3: Rules and Responsibilities for Living in Housing
      </h2>

      <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
        <p className="text-red-800 font-medium">
          To help us ensure that our recovery houses are safe and helpful to residents, there are rules and 
          responsibilities set into place for residents. Each resident must follow these guidelines; failure to 
          follow rules and guidelines will result in dismissal from Level II Recovery Housing.
        </p>
      </div>

      <div className="space-y-6">
        {/* 1. Drug/Alcohol Use */}
        <section className="border-l-4 border-red-500 pl-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">1. Illicit Drug/Alcohol Use are Strictly Prohibited</h3>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start">
              <span className="text-red-500 mr-2">•</span>
              Having and/or using drugs and alcohol is not allowed, both on and off of the recovery house property.
            </li>
            <li className="flex items-start">
              <span className="text-red-500 mr-2">•</span>
              If a resident has drugs or alcohol and/or uses these substances, they will be removed from Level II Recovery Housing.
            </li>
            <li className="flex items-start">
              <span className="text-red-500 mr-2">•</span>
              Residents should expect to be drug screened randomly or if a staff member has reason to believe they have been using.
            </li>
            <li className="flex items-start">
              <span className="text-red-500 mr-2">•</span>
              If a resident fails or refuses to submit to a test, this will result in immediate dismissal from housing.
            </li>
          </ul>
        </section>

        {/* 2. Treatment Compliance */}
        <section className="border-l-4 border-[#005c65] pl-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">2. Compliance in Substance Use Disorder Treatment</h3>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start">
              <span className="text-[#005c65] mr-2">•</span>
              Residents in recovery housing must be compliant in their treatment plan with Empower Treatment.
            </li>
            <li className="flex items-start">
              <span className="text-[#005c65] mr-2">•</span>
              Noncompliance in treatment plans may result in dismissal from housing.
            </li>
          </ul>
        </section>

        {/* 3. Medication Management */}
        <section className="border-l-4 border-blue-500 pl-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">3. Medication Management</h3>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start">
              <span className="text-blue-500 mr-2">•</span>
              For the safety of all residents, staff must be made aware of all prescribed medications as well as any over the counter medications being used by residents.
            </li>
            <li className="flex items-start">
              <span className="text-blue-500 mr-2">•</span>
              Residents are responsible for following their medication plans as prescribed by their doctor.
            </li>
            <li className="flex items-start">
              <span className="text-blue-500 mr-2">•</span>
              Residents will be given a secure space (lockbox, locker, etc.) to store their medications.
            </li>
          </ul>
        </section>

        {/* 4. Fee Schedule */}
        <section className="border-l-4 border-green-500 pl-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">4. Subsidies, & Resident Fee Schedule</h3>
          
          <div className="bg-gray-50 rounded-lg p-4 mb-4">
            <h4 className="font-semibold text-gray-800 mb-2">Fee Schedule:</h4>
            <table className="w-full text-sm">
              <tbody>
                <tr className="border-b">
                  <td className="py-2">First 30 Days (Intensive Outpatient Program)</td>
                  <td className="font-semibold text-green-600">Free</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2">First 4 Weeks</td>
                  <td className="font-semibold">$55.00/Week</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2">Weeks 4-8</td>
                  <td className="font-semibold">$85.00/Week</td>
                </tr>
                <tr>
                  <td className="py-2">Weeks 8 - Move Out</td>
                  <td className="font-semibold">$110.00/Week</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div className="bg-gray-50 rounded-lg p-4 mb-4">
            <h4 className="font-semibold text-gray-800 mb-2">Outpatient Program Fees:</h4>
            <table className="w-full text-sm">
              <tbody>
                <tr className="border-b">
                  <td className="py-2">First 4 Weeks</td>
                  <td className="font-semibold">$55.00/Week</td>
                </tr>
                <tr className="border-b">
                  <td className="py-2">Weeks 4-8</td>
                  <td className="font-semibold">$85.00/Week</td>
                </tr>
                <tr>
                  <td className="py-2">Weeks 8 - Move Out</td>
                  <td className="font-semibold">$110.00/Week</td>
                </tr>
              </tbody>
            </table>
          </div>

          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start">
              <span className="text-green-500 mr-2">•</span>
              Resident fees are due, in full, by each Friday at 12:00PM and are to be paid via physical or online payment.
            </li>
            <li className="flex items-start">
              <span className="text-green-500 mr-2">•</span>
              If residents do not pay rent by the Friday deadline, they will have a conversation with their case manager and create a plan to pay the rent by the following Monday at 5PM.
            </li>
          </ul>
        </section>

        {/* 5. Employment Expectations */}
        <section className="border-l-4 border-yellow-500 pl-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">5. Employment Expectations</h3>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start">
              <span className="text-yellow-500 mr-2">•</span>
              Residents should find a job that aligns with their recovery plan. People living in recovery housing must have a job before they move into the house, and must work for a minimum of 20 hours weekly.
            </li>
            <li className="flex items-start">
              <span className="text-yellow-500 mr-2">•</span>
              Unemployed residents are expected to apply to at least two jobs per week.
            </li>
          </ul>
        </section>

        {/* 6. Outpatient Treatment */}
        <section className="border-l-4 border-purple-500 pl-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">6. Outpatient Treatment Plan and Recovery Activity</h3>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start">
              <span className="text-purple-500 mr-2">•</span>
              People living in recovery housing must follow the treatment plan they are working on with their Empower Treatment counselor and case manager.
            </li>
            <li className="flex items-start">
              <span className="text-purple-500 mr-2">•</span>
              All residents must complete a minimum of 3 recovery activities a week.
            </li>
            <li className="flex items-start">
              <span className="text-purple-500 mr-2">•</span>
              L2 Recovery Houses have a &quot;Wrap Up&quot; meeting every night that is led by the Head of House. All residents are required to attend.
            </li>
          </ul>
        </section>

        {/* 7. Chores */}
        <section className="border-l-4 border-indigo-500 pl-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">7. Chores</h3>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start">
              <span className="text-indigo-500 mr-2">•</span>
              Residents are responsible for keeping their rooms clean and clutter-free.
            </li>
            <li className="flex items-start">
              <span className="text-indigo-500 mr-2">•</span>
              Residents are also responsible for helping to keep the shared areas of the recovery houses clean.
            </li>
          </ul>
        </section>

        {/* 8. Living Area */}
        <section className="border-l-4 border-pink-500 pl-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">8. Living Area</h3>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start">
              <span className="text-pink-500 mr-2">•</span>
              Residents must keep all living areas clean and tidy from trash and clutter.
            </li>
            <li className="flex items-start">
              <span className="text-pink-500 mr-2">•</span>
              Extension cords are not allowed in any housing location and residents cannot have electrical appliances in their sleeping rooms.
            </li>
            <li className="flex items-start">
              <span className="text-pink-500 mr-2">•</span>
              Residents are not able to bring their own furniture or appliances into housing.
            </li>
          </ul>
        </section>

        {/* 9. Room Searches */}
        <section className="border-l-4 border-gray-500 pl-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">9. Room Searches and Checks</h3>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start">
              <span className="text-gray-500 mr-2">•</span>
              SR / ET staff are able to search any resident&apos;s room, property and/or persons during their stay.
            </li>
          </ul>
        </section>

        {/* 10. Curfew */}
        <section className="border-l-4 border-orange-500 pl-6">
          <h3 className="text-lg font-semibold text-gray-800 mb-3">10. Curfew/Quiet Times</h3>
          <ul className="space-y-2 text-gray-700">
            <li className="flex items-start">
              <span className="text-orange-500 mr-2">•</span>
              Sunday - Thursday: Curfew is at 10:00PM.
            </li>
            <li className="flex items-start">
              <span className="text-orange-500 mr-2">•</span>
              Friday & Saturday: Curfew is at 11:00PM
            </li>
            <li className="flex items-start">
              <span className="text-orange-500 mr-2">•</span>
              To be respectful to those living in the house, as well as neighbors, residents are to respect quiet times from 10:00 PM to 7:00 AM.
            </li>
          </ul>
        </section>

        {/* Additional Rules */}
        <div className="space-y-6 mt-8">
          <h3 className="text-xl font-semibold text-gray-800">Additional Rules</h3>
          
          {/* Violence */}
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <h4 className="font-semibold text-red-900 mb-2">11. Altercations / Threats of Violence / Derogatory Language</h4>
            <ul className="space-y-1 text-red-800 text-sm">
              <li>• Fights of any kind, including verbal arguments, are not allowed.</li>
              <li>• If there is ever a physical fight, residents will be removed from housing immediately, and the authorities will be contacted.</li>
              <li>• Any threats of violence by a resident will be considered serious and will not be tolerated.</li>
            </ul>
          </div>

          {/* Weapons */}
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <h4 className="font-semibold text-red-900 mb-2">12. Weapons</h4>
            <p className="text-red-800 text-sm">No weapons or devices intended for use as weapons are allowed.</p>
          </div>

          {/* Tobacco */}
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
            <h4 className="font-semibold text-yellow-900 mb-2">13. Tobacco Use, E-Cigarettes, Vape</h4>
            <p className="text-yellow-800 text-sm">
              Tobacco, E-Cigarettes, and Vape are not allowed to be used inside of the recovery houses. 
              However, there are designated &quot;smoking areas&quot; outside of each house that can be used.
            </p>
          </div>

          {/* Addictive Substances */}
          <div className="bg-orange-50 border border-orange-200 rounded-lg p-4">
            <h4 className="font-semibold text-orange-900 mb-2">14. Potentially Addictive Substances and Behaviors</h4>
            <ul className="space-y-1 text-orange-800 text-sm">
              <li>• Addictive substances including, but not limited to, steroids, kratom, marijuana, inhalants, and energy drinks, is strictly prohibited in recovery houses.</li>
              <li>• Addictive behaviors, including but not limited to, sex, gambling, excessive gaming, excessive shopping, plastic surgery, binge eating, and thrill-seeking behaviors are not permitted while in recovery housing.</li>
            </ul>
          </div>

          {/* Additional House Rules */}
          <div className="grid md:grid-cols-2 gap-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-semibold text-gray-800 mb-2">15. Visitors</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• All visitors must be approved by staff before being able to enter a Level II Recovery House.</li>
                <li>• Visits are time limited and are not to go past curfew.</li>
              </ul>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-semibold text-gray-800 mb-2">16. Passes</h4>
              <p className="text-sm text-gray-700">
                Residents may receive a weekend pass based on their weekly compliance in recovery activities and approval from their clinical treatment team.
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-semibold text-gray-800 mb-2">17. Personal Property / Privacy / Security</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• All residents will respect the privacy and the personal space of other residents at all times.</li>
                <li>• Residents are not allowed to post any photos of SR/ET properties or residents on any social media sites.</li>
                <li>• Self-Reliance River-View South and Empower Treatment are not responsible for lost or stolen items of residents.</li>
              </ul>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-semibold text-gray-800 mb-2">18. Food</h4>
              <p className="text-sm text-gray-700">
                Each resident is responsible for purchasing and preparing their own food.
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-semibold text-gray-800 mb-2">19. Pets</h4>
              <p className="text-sm text-gray-700">
                SR/ET does not allow any pets in any Recovery Housing locations.
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-semibold text-gray-800 mb-2">20. Personal Relationships</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• There will be no sexual activity of any kind between any combinations of sexes on or near the recovery housing property.</li>
                <li>• Residents who are in romantic relationships of any combination with other residents are not allowed to reside at the same property.</li>
              </ul>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-semibold text-gray-800 mb-2">21. Personal Appearance</h4>
              <p className="text-sm text-gray-700">
                Residents are to be properly clothed at all times.
              </p>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-semibold text-gray-800 mb-2">22. Vehicles</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Residents are allowed to have one vehicle on-site at their recovery housing location.</li>
                <li>• Residents must have valid driver&apos;s license, proof of active vehicle insurance, copy of vehicle registration.</li>
              </ul>
            </div>

            <div className="bg-gray-50 rounded-lg p-4">
              <h4 className="font-semibold text-gray-800 mb-2">23. Keys</h4>
              <ul className="text-sm text-gray-700 space-y-1">
                <li>• Residents are not permitted to make copies of any keys provided to them while living in the recovery houses.</li>
                <li>• Residents are not permitted to loan their personal key to any other person, including other residents.</li>
              </ul>
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