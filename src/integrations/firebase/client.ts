
import { initializeApp } from 'firebase/app';
import { getDatabase, ref, get, set, onValue } from 'firebase/database';
import { supabase } from '../supabase/client';

// Firebase configuration
// TODO: Replace with actual Firebase config
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "placeholder-api-key",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "placeholder-domain.firebaseapp.com",
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL || "https://placeholder-db.firebaseio.com",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "placeholder-project",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "placeholder-bucket.appspot.com",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "123456789",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "1:123456789:web:abcdef123456789"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

/**
 * Sync data from Supabase to Firebase for a specific table
 */
export async function syncToFirebase(tableName: string) {
  try {
    console.log(`Starting sync to Firebase for table: ${tableName}`);
    
    // Instead of using type assertion, use the more generic query method
    // that avoids TypeScript errors with dynamic table names
    const { data: items, error } = await supabase
      .from(tableName)
      .select('*') as { data: any[] | null; error: any };
    
    if (error) {
      console.error(`Error fetching from Supabase: ${error.message}`);
      return { success: false, message: error.message, count: 0 };
    }
    
    if (!items || items.length === 0) {
      console.log(`No data found in table ${tableName}`);
      return { success: true, message: `No data found in table ${tableName}`, count: 0 };
    }
    
    // Prepare data for Firebase - create an object with IDs as keys
    const firebaseData: Record<string, any> = {};
    
    items.forEach((item: any) => {
      if (item && typeof item === 'object' && 'id' in item) {
        firebaseData[item.id as string] = item;
      }
    });
    
    // Save to Firebase
    const tableRef = ref(database, tableName);
    await set(tableRef, firebaseData);
    
    console.log(`Successfully synced ${items.length} items to Firebase for table: ${tableName}`);
    return { success: true, message: `Synced ${items.length} items`, count: items.length };
  } catch (error) {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.error(`Error syncing to Firebase: ${errorMessage}`);
    return { success: false, message: errorMessage, count: 0 };
  }
}

/**
 * Listen for real-time updates from Firebase for a specific table
 */
export function listenToFirebase(tableName: string, callback: (data: any) => void) {
  const tableRef = ref(database, tableName);
  
  onValue(tableRef, (snapshot) => {
    const data = snapshot.val();
    callback(data);
  });
}

/**
 * Get current data from Firebase for a specific table
 */
export async function getFirebaseData(tableName: string) {
  try {
    const tableRef = ref(database, tableName);
    const snapshot = await get(tableRef);
    return snapshot.val();
  } catch (error) {
    console.error(`Error getting Firebase data: ${error}`);
    throw error;
  }
}
