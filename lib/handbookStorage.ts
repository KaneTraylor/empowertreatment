import fs from 'fs/promises';
import path from 'path';

// Store acknowledgments in a local JSON file
const STORAGE_DIR = path.join(process.cwd(), 'data');
const ACKNOWLEDGMENTS_FILE = path.join(STORAGE_DIR, 'handbook_acknowledgments.json');

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
    await fs.access(ACKNOWLEDGMENTS_FILE);
  } catch {
    await fs.writeFile(ACKNOWLEDGMENTS_FILE, JSON.stringify({ acknowledgments: [] }, null, 2));
  }
}

export interface HandbookAcknowledgment {
  id: string;
  resident_name: string;
  signature_date: string;
  created_at: string;
}

// Save an acknowledgment
export async function saveHandbookAcknowledgment(data: {
  residentName: string;
  signatureDate: string;
}): Promise<HandbookAcknowledgment> {
  await initStorage();
  
  const acknowledgment: HandbookAcknowledgment = {
    id: `ACK-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    resident_name: data.residentName,
    signature_date: data.signatureDate,
    created_at: new Date().toISOString()
  };

  // Read existing acknowledgments
  const fileContent = await fs.readFile(ACKNOWLEDGMENTS_FILE, 'utf-8');
  const storage = JSON.parse(fileContent);
  
  // Add new acknowledgment
  storage.acknowledgments.push(acknowledgment);
  
  // Write back to file
  await fs.writeFile(ACKNOWLEDGMENTS_FILE, JSON.stringify(storage, null, 2));
  
  return acknowledgment;
}

// Get all acknowledgments
export async function getHandbookAcknowledgments(): Promise<HandbookAcknowledgment[]> {
  try {
    await initStorage();
    const fileContent = await fs.readFile(ACKNOWLEDGMENTS_FILE, 'utf-8');
    const storage = JSON.parse(fileContent);
    
    if (!storage.acknowledgments || !Array.isArray(storage.acknowledgments)) {
      return [];
    }
    
    return storage.acknowledgments.sort((a: HandbookAcknowledgment, b: HandbookAcknowledgment) => 
      new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
    );
  } catch (error) {
    console.error('Error reading acknowledgments:', error);
    return [];
  }
}