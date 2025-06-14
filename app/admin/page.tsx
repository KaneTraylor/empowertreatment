'use client';

import { useState, useEffect } from 'react';
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

export default function AdminPage() {
  const router = useRouter();
  const [submissions, setSubmissions] = useState<Submission[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [user, setUser] = useState<User | null>(null);
  const [authenticating, setAuthenticating] = useState(true);

  useEffect(() => {
    checkAuth();
  }, []);

  const checkAuth = async () => {
    try {
      const response = await fetch('/api/auth/verify');
      const data = await response.json();
      
      if (data.authenticated) {
        setUser(data.user);
        setAuthenticating(false);
        fetchSubmissions();
      } else {
        router.push('/login');
      }
    } catch (err) {
      router.push('/login');
    }
  };

  const fetchSubmissions = async () => {
    try {
      const response = await fetch('/api/export');
      const result = await response.json();
      
      if (result.success) {
        setSubmissions(result.data);
      } else {
        setError('Failed to load submissions');
      }
    } catch (err) {
      setError('Error loading submissions');
      console.error(err);
    } finally {
      setLoading(false);
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
            
            <div className="flex justify-between items-center">
              <h2 className="text-xl font-semibold text-gray-800">Form Submissions</h2>
              <button
                onClick={exportCSV}
                className="bg-[#005c65] text-white px-4 py-2 rounded-lg hover:bg-[#004a52] transition-colors"
              >
                Export to CSV
              </button>
            </div>
          
          {error && (
            <div className="mt-4 p-4 bg-red-50 text-red-700 rounded-lg">
              {error}
            </div>
          )}
          
          <div className="mt-4 text-gray-600">
            Total submissions: {submissions.length}
          </div>
        </div>

        {submissions.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-12 text-center text-gray-500">
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
                      {submission.data.fname} {submission.data.lname}
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
      </div>
    </div>
  );
}