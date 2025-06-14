'use client';

import { useState } from 'react';
import { Header } from '@/components/Header';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { WelcomeSection } from '@/components/handbook/sections/WelcomeSection';
import { ResidentRightsSection } from '@/components/handbook/sections/ResidentRightsSection';
import { RulesSection } from '@/components/handbook/sections/RulesSection';
import { CommunicableDiseasesSection } from '@/components/handbook/sections/CommunicableDiseasesSection';
import { PestPreventionSection } from '@/components/handbook/sections/PestPreventionSection';
import { EmergencySection } from '@/components/handbook/sections/EmergencySection';
import { CodeOfEthicsSection } from '@/components/handbook/sections/CodeOfEthicsSection';
import { GoodNeighborSection } from '@/components/handbook/sections/GoodNeighborSection';
import { MoveInSection } from '@/components/handbook/sections/MoveInSection';
import { LifeSkillsSection } from '@/components/handbook/sections/LifeSkillsSection';
import { PeerGovernanceSection } from '@/components/handbook/sections/PeerGovernanceSection';
import { AcknowledgmentSection } from '@/components/handbook/sections/AcknowledgmentSection';

export default function HousingHandbook() {
  const [currentSection, setCurrentSection] = useState(0);
  const [acknowledgedSections, setAcknowledgedSections] = useState<number[]>([]);

  const sections = [
    { id: 1, title: 'Program Description; Values; Mission; Vision', component: WelcomeSection },
    { id: 2, title: 'Resident Rights & Grievance Policies', component: ResidentRightsSection },
    { id: 3, title: 'Rules and Responsibilities', component: RulesSection },
    { id: 4, title: 'Communicable Diseases Information', component: CommunicableDiseasesSection },
    { id: 5, title: 'Pest Prevention', component: PestPreventionSection },
    { id: 6, title: 'Emergency Protocols', component: EmergencySection },
    { id: 7, title: 'Code of Ethics', component: CodeOfEthicsSection },
    { id: 8, title: '"Good Neighbor" Policy', component: GoodNeighborSection },
    { id: 9, title: 'Move-In & Termination Procedures', component: MoveInSection },
    { id: 10, title: 'Life Skills Development', component: LifeSkillsSection },
    { id: 11, title: 'Peer Governance', component: PeerGovernanceSection },
    { id: 12, title: 'Handbook Acknowledgment', component: AcknowledgmentSection },
  ];

  const CurrentSectionComponent = sections[currentSection].component;

  const handleAcknowledge = (sectionId: number) => {
    if (!acknowledgedSections.includes(sectionId)) {
      setAcknowledgedSections([...acknowledgedSections, sectionId]);
    }
  };

  const progress = (acknowledgedSections.length / sections.length) * 100;

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="pt-32 pb-8 px-5 md:px-8 lg:px-12 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto">
          <Link 
            href="/housing-portal" 
            className="inline-flex items-center text-[#005c65] hover:text-[#004a52] mb-6 transition-colors"
          >
            <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
            Back to Housing Portal
          </Link>
          
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Recovery Housing Resident Handbook
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl">
              Self-Reliance River-View South & Empower Treatment&apos;s Level II Recovery Housing
            </p>
          </motion.div>
        </div>
      </section>

      {/* Progress Bar */}
      <div className="sticky top-0 z-40 bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-5 md:px-8 lg:px-12 py-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-gray-700">
              Progress: {acknowledgedSections.length} of {sections.length} sections acknowledged
            </span>
            <span className="text-sm font-medium text-[#005c65]">
              {Math.round(progress)}% Complete
            </span>
          </div>
          <div className="w-full bg-gray-200 rounded-full h-2">
            <motion.div 
              className="bg-[#005c65] h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${progress}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-5 md:px-8 lg:px-12 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar Navigation */}
          <aside className="lg:col-span-1">
            <nav className="sticky top-24 bg-white rounded-lg shadow-sm p-4 max-h-[calc(100vh-8rem)] overflow-y-auto">
              <h2 className="font-semibold text-gray-900 mb-4">Table of Contents</h2>
              <ul className="space-y-2">
                {sections.map((section, index) => (
                  <li key={section.id}>
                    <button
                      onClick={() => setCurrentSection(index)}
                      className={`w-full text-left px-3 py-2 rounded-md transition-all flex items-center justify-between ${
                        currentSection === index
                          ? 'bg-[#005c65] text-white'
                          : 'hover:bg-gray-100 text-gray-700'
                      }`}
                    >
                      <span className="text-sm">
                        {section.id}. {section.title}
                      </span>
                      {acknowledgedSections.includes(section.id) && (
                        <svg className="w-4 h-4 flex-shrink-0 ml-2" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                        </svg>
                      )}
                    </button>
                  </li>
                ))}
              </ul>
            </nav>
          </aside>

          {/* Main Content */}
          <main className="lg:col-span-3">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSection}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-lg shadow-sm"
              >
                <CurrentSectionComponent 
                  onAcknowledge={() => handleAcknowledge(sections[currentSection].id)}
                  isAcknowledged={acknowledgedSections.includes(sections[currentSection].id)}
                  allSectionsComplete={acknowledgedSections.length === sections.length}
                />
              </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons */}
            <div className="flex justify-between mt-8">
              <button
                onClick={() => setCurrentSection(Math.max(0, currentSection - 1))}
                disabled={currentSection === 0}
                className={`flex items-center px-6 py-3 rounded-lg font-medium transition-all ${
                  currentSection === 0
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                }`}
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                Previous Section
              </button>

              <button
                onClick={() => setCurrentSection(Math.min(sections.length - 1, currentSection + 1))}
                disabled={currentSection === sections.length - 1}
                className={`flex items-center px-6 py-3 rounded-lg font-medium transition-all ${
                  currentSection === sections.length - 1
                    ? 'bg-gray-100 text-gray-400 cursor-not-allowed'
                    : 'bg-[#005c65] text-white hover:bg-[#004a52]'
                }`}
              >
                Next Section
                <svg className="w-5 h-5 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </button>
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}