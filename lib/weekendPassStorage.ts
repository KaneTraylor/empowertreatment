import fs from 'fs/promises';
import path from 'path';

// Store weekend passes in a local JSON file as fallback
const STORAGE_DIR = path.join(process.cwd(), 'data');
const PASSES_FILE = path.join(STORAGE_DIR, 'weekend_passes.json');

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
    await fs.access(PASSES_FILE);
  } catch {
    await fs.writeFile(PASSES_FILE, JSON.stringify({ passes: [] }, null, 2));
  }
}

export interface WeekendPassData {
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
  purpose?: string;
  purpose_of_visit?: string;
  emergency_contact_name: string;
  emergency_contact_phone: string;
  emergency_contact_relationship?: string;
  transportation_method: string;
  driver_name?: string;
  vehicle_info?: string;
  agreements?: any;
  signature?: string;
  signature_date?: string;
  status: 'pending' | 'approved' | 'denied';
  approved_by?: string;
  approved_at?: string;
  created_at: string;
}

// Save a weekend pass
export async function saveWeekendPass(passData: WeekendPassData): Promise<WeekendPassData> {
  await initStorage();
  
  // Read existing passes
  const fileContent = await fs.readFile(PASSES_FILE, 'utf-8');
  const storage = JSON.parse(fileContent);
  
  // Add new pass
  storage.passes.push(passData);
  
  // Write back to file
  await fs.writeFile(PASSES_FILE, JSON.stringify(storage, null, 2));
  
  return passData;
}

// Get all weekend passes
export async function getWeekendPasses(): Promise<WeekendPassData[]> {
  await initStorage();
  const fileContent = await fs.readFile(PASSES_FILE, 'utf-8');
  const storage = JSON.parse(fileContent);
  return storage.passes.sort((a: WeekendPassData, b: WeekendPassData) => 
    new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );
}

// Update pass status
export async function updatePassStatus(
  passId: string, 
  status: 'approved' | 'denied',
  approvedBy: string
): Promise<WeekendPassData | null> {
  await initStorage();
  const fileContent = await fs.readFile(PASSES_FILE, 'utf-8');
  const storage = JSON.parse(fileContent);
  
  const index = storage.passes.findIndex((p: WeekendPassData) => p.pass_id === passId);
  if (index === -1) return null;
  
  storage.passes[index].status = status;
  storage.passes[index].approved_by = approvedBy;
  storage.passes[index].approved_at = new Date().toISOString();
  
  await fs.writeFile(PASSES_FILE, JSON.stringify(storage, null, 2));
  return storage.passes[index];
}