'use client';

import { Header } from '@/components/Header';
import { MultiStepForm } from '@/components/form/MultiStepForm';

export default function FormPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50 flex items-center justify-center py-0 md:py-12">
        <div className="w-full">
          <MultiStepForm />
        </div>
      </main>
    </>
  );
}