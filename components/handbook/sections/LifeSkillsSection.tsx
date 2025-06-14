import { motion } from 'framer-motion';

interface SectionProps {
  onAcknowledge: () => void;
  isAcknowledged: boolean;
}

export function LifeSkillsSection({ onAcknowledge, isAcknowledged }: SectionProps) {
  const skills = [
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
        </svg>
      ),
      title: "Cleaning and Laundry Skills",
      description: "Learn proper cleaning techniques and how to maintain personal and shared living spaces",
      color: "blue"
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
        </svg>
      ),
      title: "Meal Planning and Basic Cooking",
      description: "Develop healthy eating habits and learn to prepare nutritious meals on a budget",
      color: "green"
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
      ),
      title: "Personal Hygiene and Healthy Lifestyle",
      description: "Maintain personal hygiene and make choices that support your recovery and overall health",
      color: "purple"
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Budgeting Income",
      description: "Learn to manage finances, create budgets, and plan for financial stability",
      color: "yellow"
    },
    {
      icon: (
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      ),
      title: "Time Management",
      description: "Develop skills to balance work, recovery activities, and personal time effectively",
      color: "red"
    }
  ];

  return (
    <div className="p-8">
      <h2 className="text-3xl font-bold text-gray-900 mb-6">
        Section 10: Life Skills Development
      </h2>

      <div className="space-y-8">
        {/* Introduction */}
        <section>
          <div className="bg-[#005c65]/5 border-l-4 border-[#005c65] p-6 rounded-r-lg">
            <p className="text-gray-700 text-lg">
              SR and ET believe that life skills development is a key part to overall recovery success. 
              Our program focuses on building practical skills that will support your independence and 
              long-term recovery.
            </p>
          </div>
        </section>

        {/* Skills Grid */}
        <section>
          <h3 className="text-xl font-semibold text-gray-800 mb-6">Skills You Will Learn</h3>
          
          <div className="grid md:grid-cols-2 gap-6">
            {skills.map((skill, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow"
              >
                <div className="flex items-start">
                  <div className={`w-12 h-12 bg-${skill.color}-100 rounded-full flex items-center justify-center flex-shrink-0 mr-4`}>
                    <div className={`text-${skill.color}-600`}>
                      {skill.icon}
                    </div>
                  </div>
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 mb-2">{skill.title}</h4>
                    <p className="text-gray-600 text-sm">{skill.description}</p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Benefits */}
        <section>
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Benefits of Life Skills Development</h3>
          
          <div className="bg-gradient-to-r from-green-50 to-blue-50 rounded-lg p-6">
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-md">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Independence</h4>
                <p className="text-sm text-gray-600">Build confidence in managing daily life tasks on your own</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-md">
                  <svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Empowerment</h4>
                <p className="text-sm text-gray-600">Feel empowered to make positive choices for your future</p>
              </div>
              
              <div className="text-center">
                <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mx-auto mb-3 shadow-md">
                  <svg className="w-8 h-8 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                  </svg>
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Community</h4>
                <p className="text-sm text-gray-600">Learn alongside peers who share similar recovery goals</p>
              </div>
            </div>
          </div>
        </section>

        {/* How Skills Are Taught */}
        <section>
          <h3 className="text-xl font-semibold text-gray-800 mb-4">How Life Skills Are Taught</h3>
          
          <div className="space-y-3">
            <div className="flex items-center bg-white border border-gray-200 rounded-lg p-4">
              <span className="w-8 h-8 bg-[#005c65] text-white rounded-full flex items-center justify-center font-bold mr-4">1</span>
              <p className="text-gray-700">Group workshops and educational sessions</p>
            </div>
            
            <div className="flex items-center bg-white border border-gray-200 rounded-lg p-4">
              <span className="w-8 h-8 bg-[#005c65] text-white rounded-full flex items-center justify-center font-bold mr-4">2</span>
              <p className="text-gray-700">Hands-on practice in the recovery house setting</p>
            </div>
            
            <div className="flex items-center bg-white border border-gray-200 rounded-lg p-4">
              <span className="w-8 h-8 bg-[#005c65] text-white rounded-full flex items-center justify-center font-bold mr-4">3</span>
              <p className="text-gray-700">Peer mentorship and support</p>
            </div>
            
            <div className="flex items-center bg-white border border-gray-200 rounded-lg p-4">
              <span className="w-8 h-8 bg-[#005c65] text-white rounded-full flex items-center justify-center font-bold mr-4">4</span>
              <p className="text-gray-700">Individual guidance from house staff</p>
            </div>
          </div>
        </section>

        {/* Note */}
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-6 mt-6">
          <div className="flex items-start">
            <svg className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            <p className="ml-3 text-blue-800">
              Life skills development is integrated into your daily routine at the recovery house. 
              Your participation and engagement in learning these skills is an important part of your recovery journey.
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