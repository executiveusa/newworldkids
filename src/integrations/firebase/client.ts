
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, get, set, update } from 'firebase/database';
import { supabase } from '@/integrations/supabase/client';

// Firebase configuration - in a real project, use environment variables
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_AUTH_DOMAIN",
  databaseURL: "YOUR_DATABASE_URL",
  projectId: "YOUR_PROJECT_ID",
  storageBucket: "YOUR_STORAGE_BUCKET",
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",
  appId: "YOUR_APP_ID"
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);
const firebaseDB = getDatabase(firebaseApp);

// Utility for logging
function log(message: string) {
  console.log(`[SYNC LOG]: ${new Date().toISOString()} - ${message}`);
}

// Retry mechanism
async function withRetry(fn: Function, retries = 3) {
  for (let i = 0; i < retries; i++) {
    try {
      return await fn();
    } catch (err) {
      log(`Retry ${i + 1} failed. ${err}`);
      if (i === retries - 1) throw err;
    }
  }
  throw new Error('Max retry attempts reached');
}

// Sync data from Supabase to Firebase
export async function syncToFirebase(table: string) {
  try {
    log(`Starting sync from Supabase to Firebase for table: ${table}`);
    
    const { data, error } = await supabase.from(table).select('*');
    
    if (error) throw error;
    if (!data || data.length === 0) {
      log('No data found in Supabase to sync');
      return { success: true, message: 'No data to sync', count: 0 };
    }
    
    // Convert array to object with ID as keys for Firebase
    const dataObject = data.reduce((acc, item) => {
      acc[item.id] = { ...item, updated_at: new Date().toISOString() };
      return acc;
    }, {});
    
    await withRetry(() => set(ref(firebaseDB, table), dataObject));
    
    log(`Successfully synced ${data.length} records to Firebase`);
    return { 
      success: true, 
      message: `Successfully synced ${data.length} records to Firebase`, 
      count: data.length 
    };
  } catch (error) {
    log(`Error syncing to Firebase: ${error}`);
    return { 
      success: false, 
      message: `Error syncing to Firebase: ${error}`, 
      count: 0 
    };
  }
}

// Get data from Firebase
export async function getFirebaseData(path: string) {
  try {
    const snapshot = await get(ref(firebaseDB, path));
    return { data: snapshot.val(), error: null };
  } catch (error) {
    log(`Error fetching from Firebase: ${error}`);
    return { data: null, error };
  }
}

// Update specific record in Firebase
export async function updateFirebaseRecord(path: string, data: any) {
  try {
    await withRetry(() => update(ref(firebaseDB, path), data));
    return { success: true, error: null };
  } catch (error) {
    log(`Error updating Firebase: ${error}`);
    return { success: false, error };
  }
}

export { firebaseDB };
