'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Header } from '@/components/Header';

interface ProgressReportForm {
  providerName: string;
  patientName: string;
  patientGoals: string;
  workingOn: string;
  numberOfServices: string;
  contactEmail: string;
  contactPhone: string;
}

export default function ProgressPage() {
  const [formData, setFormData] = useState<ProgressReportForm>({
    providerName: '',
    patientName: '',
    patientGoals: '',
    workingOn: '',
    numberOfServices: '',
    contactEmail: '',
    contactPhone: ''
  });
  
  const [generatedReport, setGeneratedReport] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');
    setGeneratedReport('');

    try {
      const response = await fetch('/api/generate-progress-report', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to generate report');
      }

      setGeneratedReport(data.report);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(generatedReport);
    alert('Report copied to clipboard!');
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <Header />
      
      <div className="max-w-4xl mx-auto p-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-white rounded-lg shadow-lg p-8"
        >
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Progress Report Generator
          </h1>
          <p className="text-gray-600 mb-8">
            Fill in the information below to generate a professional progress report using AI.
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Provider Name */}
            <div>
              <label htmlFor="providerName" className="block text-sm font-medium text-gray-700 mb-1">
                Name of Service Provider
              </label>
              <input
                type="text"
                id="providerName"
                name="providerName"
                value={formData.providerName}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Dr. Jane Smith"
              />
            </div>

            {/* Patient Name */}
            <div>
              <label htmlFor="patientName" className="block text-sm font-medium text-gray-700 mb-1">
                Full Name of Patient/Client (First & Last)
              </label>
              <input
                type="text"
                id="patientName"
                name="patientName"
                value={formData.patientName}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="John Doe"
              />
            </div>

            {/* Patient Goals */}
            <div>
              <label htmlFor="patientGoals" className="block text-sm font-medium text-gray-700 mb-1">
                Patient/Client Goals? (Refer to Treatment Plan)
              </label>
              <textarea
                id="patientGoals"
                name="patientGoals"
                value={formData.patientGoals}
                onChange={handleChange}
                required
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="1. Maintain sobriety for 90 days
2. Improve family relationships
3. Return to work full-time
4. Develop healthy coping mechanisms"
              />
            </div>

            {/* Working On */}
            <div>
              <label htmlFor="workingOn" className="block text-sm font-medium text-gray-700 mb-1">
                What all have you and the patient/client been working on together?
              </label>
              <textarea
                id="workingOn"
                name="workingOn"
                value={formData.workingOn}
                onChange={handleChange}
                required
                rows={4}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="Weekly individual counseling sessions focusing on relapse prevention, cognitive behavioral therapy techniques, medication management, group therapy participation..."
              />
            </div>

            {/* Number of Services */}
            <div>
              <label htmlFor="numberOfServices" className="block text-sm font-medium text-gray-700 mb-1">
                Specific Number of Services Provided
              </label>
              <input
                type="text"
                id="numberOfServices"
                name="numberOfServices"
                value={formData.numberOfServices}
                onChange={handleChange}
                required
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                placeholder="8 individual sessions, 12 group sessions, 4 medication check-ins"
              />
            </div>

            {/* Contact Information */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label htmlFor="contactEmail" className="block text-sm font-medium text-gray-700 mb-1">
                  Your Email
                </label>
                <input
                  type="email"
                  id="contactEmail"
                  name="contactEmail"
                  value={formData.contactEmail}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="provider@empowertreatment.com"
                />
              </div>

              <div>
                <label htmlFor="contactPhone" className="block text-sm font-medium text-gray-700 mb-1">
                  Your Phone
                </label>
                <input
                  type="tel"
                  id="contactPhone"
                  name="contactPhone"
                  value={formData.contactPhone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  placeholder="(555) 123-4567"
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-primary text-white py-3 px-6 rounded-lg font-semibold hover:bg-primary/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Generating Report...' : 'Generate Progress Report'}
            </button>
          </form>

          {/* Error Message */}
          {error && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700"
            >
              {error}
            </motion.div>
          )}

          {/* Generated Report */}
          {generatedReport && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mt-8"
            >
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-2xl font-bold text-gray-900">Generated Progress Report</h2>
                <button
                  onClick={copyToClipboard}
                  className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-lg transition-colors"
                >
                  Copy to Clipboard
                </button>
              </div>
              
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 whitespace-pre-wrap font-mono text-sm">
                {generatedReport}
              </div>

              <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                <p className="text-sm text-blue-700">
                  <strong>Note:</strong> Please review and edit this AI-generated report as needed before submitting. 
                  Ensure all information is accurate and complies with your organization&apos;s documentation standards.
                </p>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </main>
  );
}