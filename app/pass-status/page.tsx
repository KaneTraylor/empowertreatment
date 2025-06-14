'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import { Suspense } from 'react';
import { Header } from '@/components/Header';

function PassStatusContent() {
  const searchParams = useSearchParams();
  const passId = searchParams.get('id');
  const status = searchParams.get('status');
  const approver = searchParams.get('approver');

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-2xl mx-auto px-4 py-16">
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center">
          {status === 'approved' ? (
            <>
              <div className="w-24 h-24 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-12 h-12 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-3">Pass Approved!</h1>
              <p className="text-lg text-gray-600 mb-2">
                Weekend pass <span className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">{passId}</span> has been approved.
              </p>
              {approver && (
                <p className="text-gray-500">Approved by: {approver}</p>
              )}
              <div className="mt-8 p-4 bg-green-50 rounded-lg">
                <p className="text-green-800 font-medium">The resident has been notified via SMS.</p>
              </div>
            </>
          ) : status === 'denied' ? (
            <>
              <div className="w-24 h-24 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-12 h-12 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-3">Pass Denied</h1>
              <p className="text-lg text-gray-600 mb-2">
                Weekend pass <span className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">{passId}</span> has been denied.
              </p>
              {approver && (
                <p className="text-gray-500">Denied by: {approver}</p>
              )}
              <div className="mt-8 p-4 bg-red-50 rounded-lg">
                <p className="text-red-800 font-medium">The resident has been notified via SMS.</p>
              </div>
            </>
          ) : (
            <>
              <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <svg className="w-12 h-12 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-3">Pass Not Found</h1>
              <p className="text-lg text-gray-600">
                We couldn&apos;t find information about this pass request.
              </p>
            </>
          )}
          
          <div className="mt-8">
            <Link
              href="/"
              className="inline-flex items-center justify-center bg-[#005c65] text-white rounded-full px-8 py-3 hover:bg-[#004a52] transition-colors"
            >
              Return to Home
            </Link>
          </div>
        </div>
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