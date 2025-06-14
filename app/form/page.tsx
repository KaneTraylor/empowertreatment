'use client';

import { Header } from '@/components/Header';
import { MultiStepForm } from '@/components/form/MultiStepForm';

export default function FormPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50 flex items-center justify-center py-0 md:py-12">
        <div className="w-full">
          {/* Insurance Verification Notice */}
          <div className="max-w-2xl mx-auto px-4 mb-6 mt-20 md:mt-0">
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start gap-3">
              <svg className="w-5 h-5 text-blue-600 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <div>
                <p className="text-sm text-blue-800">
                  <strong>Want to check your insurance coverage first?</strong> Verify your benefits before completing the form to understand your coverage and potential costs.
                </p>
                <a 
                  href="/insurance-verification" 
                  className="text-sm text-blue-600 hover:text-blue-700 underline mt-1 inline-block"
                >
                  Verify insurance coverage →
                </a>
              </div>
            </div>
          </div>
          <MultiStepForm />
        </div>
      </main>
    </>
  );
}