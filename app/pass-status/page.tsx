'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense } from 'react';
import Link from 'next/link';

function PassStatusContent() {
  const searchParams = useSearchParams();
  const passId = searchParams.get('id');
  const status = searchParams.get('status');
  const approver = searchParams.get('approver');

  const isApproved = status === 'approved';

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="max-w-md w-full bg-white rounded-2xl shadow-lg p-8 text-center">
        <div className={`w-20 h-20 ${isApproved ? 'bg-green-100' : 'bg-red-100'} rounded-full flex items-center justify-center mx-auto mb-6`}>
          {isApproved ? (
            <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          ) : (
            <svg className="w-10 h-10 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          )}
        </div>

        <h1 className="text-2xl font-bold text-gray-900 mb-2">
          Pass {isApproved ? 'Approved' : 'Denied'}
        </h1>
        
        <p className="text-gray-600 mb-6">
          Weekend pass <span className="font-mono text-sm">{passId}</span> has been {status}.
        </p>

        {approver && (
          <p className="text-sm text-gray-500 mb-6">
            Processed by: {approver}
          </p>
        )}

        <div className={`p-4 ${isApproved ? 'bg-green-50' : 'bg-red-50'} rounded-lg mb-6`}>
          <p className={`text-sm ${isApproved ? 'text-green-800' : 'text-red-800'}`}>
            {isApproved 
              ? 'The resident has been notified via SMS of the approval.'
              : 'The resident has been notified via SMS of the denial.'}
          </p>
        </div>

        <Link 
          href="/"
          className="inline-flex items-center justify-center bg-[#005c65] text-white rounded-full px-6 py-3 font-medium hover:bg-[#004a52] transition-colors"
        >
          Return to Home
        </Link>
      </div>
    </div>
  );
}

export default function PassStatusPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#005c65]"></div>
      </div>
    }>
      <PassStatusContent />
    </Suspense>
  );
}