'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Header } from '@/components/Header';
import { generateProgressReportPDF } from '@/lib/generatePDF';

interface ProgressReportForm {
  providerName: string;
  providerCredentials: string;
  patientName: string;
  patientGoals: string;
  workingOn: string;
  numberOfServices: string;
  contactEmail: string;
  contactPhone: string;
  reportDate: string;
}

export default function ProgressPage() {
  const [formData, setFormData] = useState<ProgressReportForm>({
    providerName: '',
    providerCredentials: '',
    patientName: '',
    patientGoals: '',
    workingOn: '',
    numberOfServices: '',
    contactEmail: '',
    contactPhone: '',
    reportDate: new Date().toISOString().split('T')[0]
  });
  
  const [generatedReport, setGeneratedReport] = useState<string>('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string>('');
  const [recipientEmail, setRecipientEmail] = useState<string>('');
  const [isSendingEmail, setIsSendingEmail] = useState(false);
  const [emailStatus, setEmailStatus] = useState<{ type: 'success' | 'error', message: string } | null>(null);
  const [isEditMode, setIsEditMode] = useState(false);
  const [editedReport, setEditedReport] = useState<string>('');

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
      setEditedReport(data.report);
      setIsEditMode(false);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(editedReport);
    alert('Report copied to clipboard!');
  };

  const downloadPDF = () => {
    if (!editedReport) return;

    const pdf = generateProgressReportPDF({
      ...formData,
      reportContent: editedReport,
      reportDate: formData.reportDate
    });

    // Generate filename with patient name and date
    const date = formData.reportDate || new Date().toISOString().split('T')[0];
    const filename = `progress-report-${formData.patientName.replace(/\s+/g, '-').toLowerCase()}-${date}.pdf`;
    
    pdf.save(filename);
  };

  const sendEmail = async () => {
    if (!editedReport || !recipientEmail) return;

    setIsSendingEmail(true);
    setEmailStatus(null);

    try {
      const response = await fetch('/api/send-progress-report', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          recipientEmail,
          reportContent: editedReport
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to send email');
      }

      setEmailStatus({
        type: 'success',
        message: `Progress report sent successfully to ${recipientEmail}`
      });
      setRecipientEmail('');
    } catch (err) {
      setEmailStatus({
        type: 'error',
        message: err instanceof Error ? err.message : 'Failed to send email'
      });
    } finally {
      setIsSendingEmail(false);
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Header />
      
      <div className="max-w-4xl mx-auto p-6">
        {/* Professional Header Section */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <div className="inline-flex items-center justify-center p-3 bg-primary/10 rounded-full mb-4">
            <svg className="w-8 h-8 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Clinical Progress Report Generator
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Generate comprehensive, AI-powered progress reports for substance abuse treatment documentation.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white rounded-xl shadow-xl p-8 border border-gray-100"
        >

          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Information Section */}
            <div className="space-y-6">
              <div className="border-b border-gray-200 pb-4">
                <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                  <span className="bg-primary/10 p-2 rounded-lg mr-3">
                    <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  </span>
                  Basic Information
                </h2>
              </div>

              {/* Provider Name */}
              <div>
                <label htmlFor="providerName" className="block text-sm font-semibold text-gray-700 mb-2">
                  Name of Service Provider
                </label>
                <input
                  type="text"
                  id="providerName"
                  name="providerName"
                  value={formData.providerName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                  placeholder="Dr. Jane Smith"
                />
              </div>

              {/* Provider Credentials */}
              <div>
                <label htmlFor="providerCredentials" className="block text-sm font-semibold text-gray-700 mb-2">
                  Provider Credentials
                </label>
                <input
                  type="text"
                  id="providerCredentials"
                  name="providerCredentials"
                  value={formData.providerCredentials}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                  placeholder="MD, FASAM / LCSW, LCDC / NP, PMHNP-BC"
                />
                <p className="text-xs text-gray-500 mt-1">Enter your professional credentials (e.g., MD, PhD, LCSW, etc.)</p>
              </div>

              {/* Patient Name */}
              <div>
                <label htmlFor="patientName" className="block text-sm font-semibold text-gray-700 mb-2">
                  Full Name of Patient/Client (First & Last)
                </label>
                <input
                  type="text"
                  id="patientName"
                  name="patientName"
                  value={formData.patientName}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                  placeholder="John Doe"
                />
              </div>

              {/* Report Date */}
              <div>
                <label htmlFor="reportDate" className="block text-sm font-semibold text-gray-700 mb-2">
                  Report Date
                </label>
                <input
                  type="date"
                  id="reportDate"
                  name="reportDate"
                  value={formData.reportDate}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                />
                <p className="text-xs text-gray-500 mt-1">Select the date for this progress report</p>
              </div>
            </div>

            {/* Treatment Details Section */}
            <div className="space-y-6">
              <div className="border-b border-gray-200 pb-4">
                <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                  <span className="bg-primary/10 p-2 rounded-lg mr-3">
                    <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" />
                    </svg>
                  </span>
                  Treatment Details
                </h2>
              </div>

              {/* Patient Goals */}
              <div>
                <label htmlFor="patientGoals" className="block text-sm font-semibold text-gray-700 mb-2">
                  Patient/Client Goals (Refer to Treatment Plan)
                </label>
                <textarea
                  id="patientGoals"
                  name="patientGoals"
                  value={formData.patientGoals}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors resize-none"
                  placeholder="1. Maintain sobriety for 90 days
2. Improve family relationships
3. Return to work full-time
4. Develop healthy coping mechanisms"
                />
              </div>

              {/* Working On */}
              <div>
                <label htmlFor="workingOn" className="block text-sm font-semibold text-gray-700 mb-2">
                  Services & Activities Provided
                </label>
                <textarea
                  id="workingOn"
                  name="workingOn"
                  value={formData.workingOn}
                  onChange={handleChange}
                  required
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors resize-none"
                  placeholder="Weekly individual counseling sessions focusing on relapse prevention, cognitive behavioral therapy techniques, medication management, group therapy participation..."
                />
              </div>

              {/* Number of Services */}
              <div>
                <label htmlFor="numberOfServices" className="block text-sm font-semibold text-gray-700 mb-2">
                  Specific Number of Services Provided
                </label>
                <input
                  type="text"
                  id="numberOfServices"
                  name="numberOfServices"
                  value={formData.numberOfServices}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                  placeholder="8 individual sessions, 12 group sessions, 4 medication check-ins"
                />
              </div>
            </div>

            {/* Contact Information Section */}
            <div className="space-y-6">
              <div className="border-b border-gray-200 pb-4">
                <h2 className="text-xl font-semibold text-gray-900 flex items-center">
                  <span className="bg-primary/10 p-2 rounded-lg mr-3">
                    <svg className="w-5 h-5 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </span>
                  Contact Information
                </h2>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="contactEmail" className="block text-sm font-semibold text-gray-700 mb-2">
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="contactEmail"
                    name="contactEmail"
                    value={formData.contactEmail}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                    placeholder="provider@empowertreatment.com"
                  />
                </div>

                <div>
                  <label htmlFor="contactPhone" className="block text-sm font-semibold text-gray-700 mb-2">
                    Your Phone
                  </label>
                  <input
                    type="tel"
                    id="contactPhone"
                    name="contactPhone"
                    value={formData.contactPhone}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary transition-colors"
                    placeholder="(555) 123-4567"
                  />
                </div>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-6">
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-gradient-to-r from-primary to-primary/90 text-white py-4 px-6 rounded-lg font-semibold text-lg shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none flex items-center justify-center"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Generating Report...
                  </>
                ) : (
                  <>
                    <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Generate Progress Report
                  </>
                )}
              </button>
            </div>
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
              <div className="bg-gradient-to-r from-green-50 to-green-100 border border-green-200 rounded-xl p-6 mb-6">
                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center">
                    <div className="bg-green-500 p-3 rounded-full mr-4">
                      <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <div>
                      <h2 className="text-2xl font-bold text-gray-900">Progress Report Generated</h2>
                      <p className="text-gray-600">Review the report below and download when ready</p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <button
                      onClick={downloadPDF}
                      className="bg-primary hover:bg-primary/90 text-white px-6 py-3 rounded-lg transition-all flex items-center gap-2 shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      Download PDF
                    </button>
                    <button
                      onClick={copyToClipboard}
                      className="bg-white hover:bg-gray-50 text-gray-700 px-6 py-3 rounded-lg transition-all flex items-center gap-2 border border-gray-300 shadow-sm hover:shadow-md"
                    >
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                      Copy to Clipboard
                    </button>
                  </div>
                </div>
                
                {/* Email Section */}
                <div className="mt-4 p-4 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex items-start gap-4">
                    <div className="flex-1">
                      <label htmlFor="recipientEmail" className="block text-sm font-semibold text-gray-700 mb-2">
                        Send Report via Email
                      </label>
                      <div className="flex gap-2">
                        <input
                          type="email"
                          id="recipientEmail"
                          value={recipientEmail}
                          onChange={(e) => setRecipientEmail(e.target.value)}
                          placeholder="recipient@example.com"
                          className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary"
                          disabled={isSendingEmail}
                        />
                        <button
                          onClick={sendEmail}
                          disabled={!recipientEmail || isSendingEmail}
                          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg transition-all flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                          {isSendingEmail ? (
                            <>
                              <svg className="animate-spin h-4 w-4" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                              </svg>
                              Sending...
                            </>
                          ) : (
                            <>
                              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                              </svg>
                              Email Report
                            </>
                          )}
                        </button>
                      </div>
                      <p className="text-xs text-gray-600 mt-1">Report will be sent from noreply@empowertreatment.com</p>
                    </div>
                  </div>
                  
                  {/* Email Status Messages */}
                  {emailStatus && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={`mt-3 p-3 rounded-lg ${
                        emailStatus.type === 'success' 
                          ? 'bg-green-100 text-green-700 border border-green-200' 
                          : 'bg-red-100 text-red-700 border border-red-200'
                      }`}
                    >
                      <div className="flex items-center">
                        {emailStatus.type === 'success' ? (
                          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        ) : (
                          <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                        )}
                        {emailStatus.message}
                      </div>
                    </motion.div>
                  )}
                </div>
              </div>
              
              <div className="bg-white border-2 border-gray-200 rounded-xl shadow-inner">
                <div className="bg-gray-50 px-6 py-4 border-b border-gray-200 flex justify-between items-center">
                  <h3 className="font-semibold text-gray-700 flex items-center">
                    <svg className="w-5 h-5 mr-2 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Report Preview
                  </h3>
                  <button
                    onClick={() => setIsEditMode(!isEditMode)}
                    className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    {isEditMode ? (
                      <>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                        Preview Mode
                      </>
                    ) : (
                      <>
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                        </svg>
                        Edit Report
                      </>
                    )}
                  </button>
                </div>
                <div className="p-6">
                  {isEditMode ? (
                    <div className="space-y-3">
                      <textarea
                        value={editedReport}
                        onChange={(e) => setEditedReport(e.target.value)}
                        className="w-full h-96 p-4 font-mono text-sm text-gray-800 leading-relaxed border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary resize-none"
                        placeholder="Edit your report here..."
                      />
                      <div className="flex items-center justify-between">
                        <p className="text-sm text-gray-600">
                          {editedReport !== generatedReport ? (
                            <span className="flex items-center text-amber-600">
                              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                              </svg>
                              Report has been modified
                            </span>
                          ) : (
                            <span className="text-gray-500">No changes made</span>
                          )}
                        </p>
                        <button
                          onClick={() => setEditedReport(generatedReport)}
                          className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                        >
                          Reset to Original
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="whitespace-pre-wrap font-mono text-sm text-gray-800 leading-relaxed">
                      {editedReport}
                    </div>
                  )}
                </div>
              </div>

              <div className="mt-6 p-5 bg-amber-50 border border-amber-200 rounded-lg flex items-start">
                <svg className="w-5 h-5 text-amber-600 mr-3 mt-0.5 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <div className="text-sm text-amber-800">
                  <p className="font-semibold mb-1">Important Reminder</p>
                  <p>Please review and edit this AI-generated report as needed before submitting. Ensure all information is accurate and complies with your organization&apos;s documentation standards and HIPAA requirements.</p>
                </div>
              </div>
            </motion.div>
          )}
        </motion.div>
      </div>
    </main>
  );
}