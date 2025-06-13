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