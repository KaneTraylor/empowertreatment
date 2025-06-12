'use client';

import { Header } from '@/components/Header';
import { MultiStepForm } from '@/components/form/MultiStepForm';

export default function FormPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-gray-50 py-8">
        <MultiStepForm />
      </main>
    </>
  );
}