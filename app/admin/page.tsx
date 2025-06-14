'use client';

import { useState, useEffect, useCallback } from 'react';
import { motion } from 'framer-motion';
import { useRouter } from 'next/navigation';
import { Header } from '@/components/Header';

interface Submission {
  id: string;
  created_at: string;
  data: any;
  status: string;
}

interface User {
  email: string;
  role: string;
}

interface WeekendPass {
  pass_id: string;
  resident_name: string;
  room_number: string;
  phone: string;
  departure_date: string;
  departure_time: string;
  return_date: string;
  return_time: string;
  destination: string;
  destination_address: string;
  purpose_of_visit?: string;
  purpose?: string;
  emergency_contact_name: string;
  emergency_contact_phone: string;
  transportation_method: string;
  driver_name?: string;
  vehicle_info?: string;
  status: 'pending' | 'approved' | 'denied';
  approved_by?: string;
  approved_at?: string;
  created_at: string;
}

interface HandbookAcknowledgment {
  id: string;
  resident_name: string;
  signature_date: string;
  created_at: string;
}

export default function AdminPage() {
  const router = useRouter();
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [weekendPasses, setWeekendPasses] = useState<WeekendPass[]>([]);
  const [handbookAcknowledgments, setHandbookAcknowledgments] = useState<HandbookAcknowledgment[]>([]);
  const [activeTab, setActiveTab] = useState<'submissions' | 'weekend-passes' | 'handbook-acknowledgments'>('submissions');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [user, setUser] = useState<User | null>(null);
  const [authenticating, setAuthenticating] = useState(true);

  const checkAuth = useCallback(async () => {
    try {
      const response = await fetch('/api/auth/verify');
      const data = await response.json();
      
      if (data.authenticated) {
        setUser(data.user);
        setAuthenticating(false);
        fetchSubmissions();
        fetchWeekendPasses();
        fetchHandbookAcknowledgments();
      } else {
        router.push('/login');
      }
    } catch (err) {
      router.push('/login');
    }
  }, [router]);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const fetchSubmissions = async () => {
    try {
      const response = await fetch('/api/export');
      console.log('Export API response status:', response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Export API error:', errorText);
        setError(`Failed to load submissions: ${response.statusText}`);
        return;
      }
      
      const result = await response.json();
      console.log('Export API result:', result);
      
      if (result.success) {
        setSubmissions(result.data || []);
      } else {
        setError(result.error || 'Failed to load submissions');
      }
    } catch (err) {
      setError('Error loading submissions');
      console.error('Fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  const fetchWeekendPasses = async () => {
    try {
      const response = await fetch('/api/weekend-passes');
      console.log('Weekend passes API response status:', response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Weekend passes API error:', errorText);
        return;
      }
      
      const result = await response.json();
      console.log('Weekend passes result:', result);
      
      if (result.passes) {
        setWeekendPasses(result.passes);
      }
    } catch (err) {
      console.error('Error loading weekend passes:', err);
    }
  };

  const fetchHandbookAcknowledgments = async () => {
    try {
      const response = await fetch('/api/handbook-acknowledgments');
      console.log('Handbook acknowledgments API response status:', response.status);
      
      if (!response.ok) {
        const errorText = await response.text();
        console.error('Handbook acknowledgments API error:', errorText);
        return;
      }
      
      const result = await response.json();
      console.log('Handbook acknowledgments result:', result);
      
      if (result.acknowledgments) {
        setHandbookAcknowledgments(result.acknowledgments);
      }
    } catch (err) {
      console.error('Error loading handbook acknowledgments:', err);
    }
  };

  const handlePassAction = async (passId: string, action: 'approve' | 'deny') => {
    try {
      const response = await fetch('/api/weekend-passes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ passId, action })
      });
      
      if (response.ok) {
        // Update local state
        setWeekendPasses(passes => 
          passes.map(pass => 
            pass.pass_id === passId 
              ? { ...pass, status: action === 'approve' ? 'approved' : 'denied', approved_by: user?.email, approved_at: new Date().toISOString() }
              : pass
          )
        );
      }
    } catch (err) {
      console.error('Error updating pass:', err);
    }
  };

  const exportCSV = () => {
    window.location.href = '/api/export?format=csv';
  };

  const handleLogout = async () => {
    try {
      await fetch('/api/auth/logout', { method: 'POST' });
      router.push('/login');
    } catch (err) {
      console.error('Logout error:', err);
    }
  };

  if (authenticating || loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#005c65]"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      <div className="p-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <div className="flex justify-between items-center mb-4">
              <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
              <div className="flex items-center gap-4">
                <span className="text-sm text-gray-600">
                  Welcome, {user?.email}
                </span>
                <button
                  onClick={handleLogout}
                  className="text-sm text-red-600 hover:text-red-700 font-medium"
                >
                  Logout
                </button>
              </div>
            </div>
            
            {/* Tab Navigation */}
            <div className="border-b border-gray-200 mt-6">
              <nav className="flex space-x-8">
                <button
                  onClick={() => setActiveTab('submissions')}
                  className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === 'submissions'
                      ? 'border-[#005c65] text-[#005c65]'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Form Submissions
                </button>
                <button
                  onClick={() => setActiveTab('weekend-passes')}
                  className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === 'weekend-passes'
                      ? 'border-[#005c65] text-[#005c65]'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Weekend Passes
                </button>
                <button
                  onClick={() => setActiveTab('handbook-acknowledgments')}
                  className={`py-2 px-1 border-b-2 font-medium text-sm transition-colors ${
                    activeTab === 'handbook-acknowledgments'
                      ? 'border-[#005c65] text-[#005c65]'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  Handbook Acknowledgments
                </button>
              </nav>
            </div>
          </div>
          
          {error && (
            <div className="mt-4 p-4 bg-red-50 text-red-700 rounded-lg">
              {error}
            </div>
          )}

        {/* Form Submissions Tab */}
        {activeTab === 'submissions' && (
          <div className="bg-white rounded-lg shadow-lg p-6 mb-6">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-800">Form Submissions</h2>
              <button
                onClick={exportCSV}
                className="bg-[#005c65] text-white px-4 py-2 rounded-lg hover:bg-[#004a52] transition-colors"
              >
                Export to CSV
              </button>
            </div>
            
            <div className="text-gray-600 mb-6">
              Total submissions: {submissions.length}
            </div>
            
            {submissions.length === 0 ? (
              <div className="p-12 text-center text-gray-500">
                No submissions yet. Submit a test form to see data here.
              </div>
            ) : (
              <div className="space-y-4">
                {submissions.map((submission, index) => (
              <motion.div
                key={submission.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="bg-white rounded-lg shadow p-6"
              >
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">
                      {submission.data.firstName || submission.data.fname || 'Unknown'} {submission.data.lastName || submission.data.lname || 'Name'}
                    </h3>
                    <p className="text-sm text-gray-600">
                      Submitted: {new Date(submission.created_at).toLocaleString()}
                    </p>
                  </div>
                  <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                    submission.status === 'pending' ? 'bg-yellow-100 text-yellow-800' :
                    submission.status === 'contacted' ? 'bg-blue-100 text-blue-800' :
                    submission.status === 'scheduled' ? 'bg-green-100 text-green-800' :
                    'bg-gray-100 text-gray-800'
                  }`}>
                    {submission.status}
                  </span>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                  <div>
                    <span className="font-medium">Email:</span> {submission.data.email || 'Not provided'}
                  </div>
                  <div>
                    <span className="font-medium">Phone:</span> {submission.data.mobileNumber || 'Not provided'}
                  </div>
                  <div>
                    <span className="font-medium">State:</span> {submission.data.stateselect}
                  </div>
                  <div>
                    <span className="font-medium">Treatment Timeline:</span> {
                      submission.data.interestedintreatment === 'asap' ? 'ASAP' : 'Next few weeks'
                    }
                  </div>
                </div>
                
                {submission.data.appointmentDateTime && (
                  <div className="mt-4 p-3 bg-green-50 rounded-lg">
                    <span className="font-medium text-green-800">Appointment:</span>{' '}
                    {submission.data.appointmentDateTime}
                  </div>
                )}
                
                <details className="mt-4">
                  <summary className="cursor-pointer text-primary hover:underline">
                    View full details
                  </summary>
                  <pre className="mt-2 p-4 bg-gray-50 rounded-lg text-xs overflow-x-auto">
                    {JSON.stringify(submission.data, null, 2)}
                  </pre>
                </details>
                  </motion.div>
                ))}
              </div>
            )}
          </div>
        )}
        
        {/* Weekend Passes Tab */}
        {activeTab === 'weekend-passes' && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Weekend Pass Requests</h2>
            
            {weekendPasses.length === 0 ? (
              <div className="p-12 text-center text-gray-500">
                No weekend pass requests yet.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Resident
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Dates
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Destination
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Submitted
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {weekendPasses.map((pass) => (
                      <tr key={pass.pass_id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div>
                            <div className="text-sm font-medium text-gray-900">
                              {pass.resident_name}
                            </div>
                            <div className="text-sm text-gray-500">
                              Room {pass.room_number}
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {new Date(pass.departure_date).toLocaleDateString()} - {new Date(pass.return_date).toLocaleDateString()}
                          </div>
                          <div className="text-sm text-gray-500">
                            {pass.departure_time} - {pass.return_time}
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div className="text-sm text-gray-900">
                            {pass.destination}
                          </div>
                          <div className="text-sm text-gray-500 truncate max-w-xs">
                            {pass.destination_address}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span className={`px-3 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                            pass.status === 'pending' 
                              ? 'bg-yellow-100 text-yellow-800' 
                              : pass.status === 'approved'
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                          }`}>
                            {pass.status}
                          </span>
                          {pass.approved_by && (
                            <div className="text-xs text-gray-500 mt-1">
                              by {pass.approved_by}
                            </div>
                          )}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(pass.created_at).toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          {pass.status === 'pending' ? (
                            <div className="flex space-x-2">
                              <button
                                onClick={() => handlePassAction(pass.pass_id, 'approve')}
                                className="text-green-600 hover:text-green-900"
                              >
                                Approve
                              </button>
                              <button
                                onClick={() => handlePassAction(pass.pass_id, 'deny')}
                                className="text-red-600 hover:text-red-900"
                              >
                                Deny
                              </button>
                            </div>
                          ) : (
                            <button
                              onClick={() => {
                                // Show details modal or expand row
                                const details = `
Pass ID: ${pass.pass_id}
Resident: ${pass.resident_name} (Room ${pass.room_number})
Phone: ${pass.phone}

Departure: ${pass.departure_date} at ${pass.departure_time}
Return: ${pass.return_date} at ${pass.return_time}

Destination: ${pass.destination}
Address: ${pass.destination_address}
Purpose: ${pass.purpose_of_visit || pass.purpose || 'Not specified'}

Emergency Contact: ${pass.emergency_contact_name}
Phone: ${pass.emergency_contact_phone}

Transportation: ${pass.transportation_method}
${pass.driver_name ? `Driver: ${pass.driver_name}` : ''}
${pass.vehicle_info ? `Vehicle: ${pass.vehicle_info}` : ''}

Status: ${pass.status}
${pass.approved_by ? `Approved by: ${pass.approved_by}` : ''}
${pass.approved_at ? `Approved at: ${new Date(pass.approved_at).toLocaleString()}` : ''}`;
                                alert(details);
                              }}
                              className="text-[#005c65] hover:text-[#004a52]"
                            >
                              View Details
                            </button>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
        
        {/* Handbook Acknowledgments Tab */}
        {activeTab === 'handbook-acknowledgments' && (
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-6">Housing Handbook Acknowledgments</h2>
            
            {handbookAcknowledgments.length === 0 ? (
              <div className="p-12 text-center text-gray-500">
                No handbook acknowledgments yet.
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Resident Name
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Signature Date
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Submitted At
                      </th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Actions
                      </th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {handbookAcknowledgments.map((acknowledgment) => (
                      <tr key={acknowledgment.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm font-medium text-gray-900">
                            {acknowledgment.resident_name}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <div className="text-sm text-gray-900">
                            {new Date(acknowledgment.signature_date).toLocaleDateString('en-US', {
                              weekday: 'long',
                              year: 'numeric',
                              month: 'long',
                              day: 'numeric'
                            })}
                          </div>
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {new Date(acknowledgment.created_at).toLocaleString()}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                          <button
                            onClick={() => {
                              const details = `
Housing Handbook Acknowledgment

Resident: ${acknowledgment.resident_name}
Signature Date: ${new Date(acknowledgment.signature_date).toLocaleDateString()}
Submitted: ${new Date(acknowledgment.created_at).toLocaleString()}

This resident has acknowledged that they have read and understood all sections of the Recovery Housing Resident Handbook, including:
- Program values, mission, and vision
- Resident rights and grievance policies
- Rules and responsibilities
- Emergency protocols
- Code of ethics
- Good neighbor policy
- All other handbook sections

They have provided their digital signature confirming they agree to abide by all articles of the resident handbook.`;
                              alert(details);
                            }}
                            className="text-[#005c65] hover:text-[#004a52]"
                          >
                            View Details
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        )}
        </div>
      </div>
    </div>
  );
}