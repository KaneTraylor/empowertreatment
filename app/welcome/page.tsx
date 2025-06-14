import { Header } from '@/components/Header';
import { Button } from '@/components/ui/Button';
import Link from 'next/link';

export default function Welcome() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50 flex items-center justify-center py-0 md:py-12">
        <div className="w-full max-w-3xl mx-auto px-0 md:px-6">
          <div className="bg-white md:rounded-lg md:shadow-lg p-6 md:p-10 lg:p-12">
            <h1 className="text-3xl font-bold text-gray-900 mb-4">
              Welcome to Empower Treatment
            </h1>
            
            <p className="text-gray-600 mb-6">
              Let&apos;s set you up with a free welcome call. First, we have a few questions that should take less than 5 minutes to answer.
            </p>
            
            <p className="text-gray-700 font-medium mb-4">
              We&apos;ll ask for your:
            </p>
            
            <div className="space-y-3 mb-8">
              <div className="flex items-start gap-3">
                <svg className="w-6 h-6 text-primary mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                  <circle cx="12" cy="10" r="3" />
                </svg>
                <span className="text-gray-700">State of residence</span>
              </div>
              
              <div className="flex items-start gap-3">
                <svg className="w-6 h-6 text-primary mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <rect x="5" y="2" width="14" height="20" rx="2" ry="2" />
                  <line x1="12" y1="18" x2="12.01" y2="18" />
                </svg>
                <span className="text-gray-700">Phone number</span>
              </div>
              
              <div className="flex items-start gap-3">
                <svg className="w-6 h-6 text-primary mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <polyline points="17 1 21 5 17 9" />
                  <path d="M3 11V9a4 4 0 0 1 4-4h14" />
                  <polyline points="7 23 3 19 7 15" />
                  <path d="M21 13v2a4 4 0 0 1-4 4H3" />
                </svg>
                <span className="text-gray-700">Relationship with opioids</span>
              </div>
              
              <div className="flex items-start gap-3">
                <svg className="w-6 h-6 text-primary mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M16 4h2a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h2" />
                  <rect x="8" y="2" width="8" height="4" rx="1" ry="1" />
                </svg>
                <span className="text-gray-700">Health insurance (if you have it)</span>
              </div>
            </div>
            
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <h3 className="font-semibold text-blue-900 mb-2 flex items-center">
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
                Check Your Insurance Coverage
              </h3>
              <p className="text-sm text-blue-800 mb-3">
                Want to know what your insurance covers before scheduling? We&apos;re in-network with all major insurance providers.
              </p>
              <Link href="/insurance-verification">
                <Button variant="outline" size="sm" className="w-full sm:w-auto">
                  Verify Insurance Coverage
                </Button>
              </Link>
            </div>
            
            <div className="flex flex-col sm:flex-row sm:justify-end gap-3">
              <Link href="/form" className="w-full sm:w-auto">
                <Button size="lg" className="w-full">
                  Get started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}