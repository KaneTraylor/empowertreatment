import fs from 'fs/promises';
import path from 'path';

// Store submissions in a local JSON file
const STORAGE_DIR = path.join(process.cwd(), 'data');
const SUBMISSIONS_FILE = path.join(STORAGE_DIR, 'form_submissions.json');

// Ensure storage directory exists
async function ensureStorageDir() {
  try {
    await fs.access(STORAGE_DIR);
  } catch {
    await fs.mkdir(STORAGE_DIR, { recursive: true });
  }
}

// Initialize storage file if it doesn't exist
async function initStorage() {
  await ensureStorageDir();
  try {
    await fs.access(SUBMISSIONS_FILE);
  } catch {
    await fs.writeFile(SUBMISSIONS_FILE, JSON.stringify({ submissions: [] }, null, 2));
  }
}

export interface FileSubmission {
  id: string;
  created_at: string;
  data: any;
  status: 'pending' | 'contacted' | 'scheduled' | 'completed';
}

// Save a submission
export async function saveSubmission(formData: any): Promise<FileSubmission> {
  await initStorage();
  
  const submission: FileSubmission = {
    id: `SUB-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    created_at: new Date().toISOString(),
    data: formData,
    status: 'pending'
  };

  // Read existing submissions
  const fileContent = await fs.readFile(SUBMISSIONS_FILE, 'utf-8');
  const storage = JSON.parse(fileContent);
  
  // Add new submission
  storage.submissions.push(submission);
  
  // Write back to file
  await fs.writeFile(SUBMISSIONS_FILE, JSON.stringify(storage, null, 2));
  
  return submission;
}

// Get all submissions
export async function getSubmissions(): Promise<FileSubmission[]> {
  try {
    await initStorage();
    const fileContent = await fs.readFile(SUBMISSIONS_FILE, 'utf-8');
    const storage = JSON.parse(fileContent);
    
    // Handle case where submissions might be undefined
    if (!storage.submissions || !Array.isArray(storage.submissions)) {
      console.warn('No submissions array found in storage file');
      return [];
    }
    
    return storage.submissions.sort((a: FileSubmission, b: FileSubmission) => 
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );
  } catch (error) {
    console.error('Error reading submissions:', error);
    // Return empty array on error to prevent crashes
    return [];
  }
}

// Update submission status
export async function updateSubmissionStatus(
  id: string, 
  status: FileSubmission['status'],
  notes?: string
): Promise<FileSubmission | null> {
  await initStorage();
  const fileContent = await fs.readFile(SUBMISSIONS_FILE, 'utf-8');
  const storage = JSON.parse(fileContent);
  
  const index = storage.submissions.findIndex((s: FileSubmission) => s.id === id);
  if (index === -1) return null;
  
  storage.submissions[index].status = status;
  if (notes) {
    storage.submissions[index].data.notes = notes;
  }
  
  await fs.writeFile(SUBMISSIONS_FILE, JSON.stringify(storage, null, 2));
  return storage.submissions[index];
}

// Export to CSV
export async function exportToCSV(): Promise<string> {
  const submissions = await getSubmissions();
  
  if (submissions.length === 0) return '';
  
  // Define CSV headers based on form structure
  const headers = [
    'ID', 'Date', 'Status', 'First Name', 'Last Name', 'Email', 'Phone',
    'State', 'Healthcare Referral', 'Provider Name', 'Opioid Use',
    'Suboxone History', 'Insurance', 'Insurance Provider', 
    'Treatment Timeline', 'Appointment Scheduled', 'Appointment Date'
  ];
  
  const rows = submissions.map(sub => {
    const d = sub.data;
    return [
      sub.id,
      new Date(sub.created_at).toLocaleString(),
      sub.status,
      d.fname || '',
      d.lname || '',
      d.email || '',
      d.mobileNumber || '',
      d.stateselect || '',
      d.offer || '',
      d.providerName || '',
      d.opioiduse || '',
      d.relationshipwithSuboxone || '',
      d.youinsured || '',
      d.insuranceselect || '',
      d.interestedintreatment || '',
      d.appointmentDateTime ? 'Yes' : 'No',
      d.appointmentDateTime || ''
    ].map(cell => `"${String(cell).replace(/"/g, '""')}"`).join(',');
  });
  
  return [headers.join(','), ...rows].join('\n');
}