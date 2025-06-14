'use client';

import { Header } from '@/components/Header';
import { MultiStepForm } from '@/components/form/MultiStepForm';
import Image from 'next/image';
import Link from 'next/link';

export default function FormPage() {
  return (
    <>
      {/* Hide header on mobile for better form experience */}
      <div className="hidden md:block">
        <Header />
      </div>
      
      {/* Mobile-only header */}
      <div className="md:hidden bg-white border-b border-gray-200 px-4 py-3 sticky top-0 z-40">
        <div className="flex items-center justify-between">
          <Link href="/" className="flex items-center">
            <Image
              src="/logo.png"
              alt="Empower Treatment"
              width={120}
              height={40}
              className="h-8 w-auto"
              priority
            />
          </Link>
          <a 
            href="tel:740-200-0277" 
            className="text-sm text-[#005c65] font-medium"
          >
            Need help? Call
          </a>
        </div>
      </div>
      
      <main className="min-h-screen bg-gray-50 flex items-center justify-center py-4 md:py-12 md:pt-20">
        <div className="w-full">
          <MultiStepForm />
        </div>
      </main>
    </>
  );
}