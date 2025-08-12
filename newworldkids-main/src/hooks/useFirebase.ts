import { useState, useEffect } from 'react';
import {
  collection,
  query,
  where,
  orderBy,
  limit,
  getDocs,
  addDoc,
  updateDoc,
  deleteDoc,
  doc,
  DocumentData,
} from 'firebase/firestore';
import { db } from '../integrations/firebase';

interface UseFirebaseOptions<T> {
  collection: string;
  where?: [string, any, any][];
  orderBy?: [string, 'asc' | 'desc'][];
  limit?: number;
}

interface UseFirebaseResult<T> {
  data: T[];
  loading: boolean;
  error: Error | null;
  add: (data: Partial<T>) => Promise<string>;
  update: (id: string, data: Partial<T>) => Promise<void>;
  remove: (id: string) => Promise<void>;
  refresh: () => Promise<void>;
}

export function useFirebase<T extends DocumentData>({
  collection: collectionName,
  where: whereConditions = [],
  orderBy: orderByConditions = [],
  limit: limitCount,
}: UseFirebaseOptions<T>): UseFirebaseResult<T> {
  const [data, setData] = useState<T[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      let q = query(collection(db, collectionName));

      // Apply where conditions
      whereConditions.forEach(([field, operator, value]) => {
        q = query(q, where(field, operator, value));
      });

      // Apply orderBy conditions
      orderByConditions.forEach(([field, direction]) => {
        q = query(q, orderBy(field, direction));
      });

      // Apply limit
      if (limitCount) {
        q = query(q, limit(limitCount));
      }

      const querySnapshot = await getDocs(q);
      const documents = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as T[];

      setData(documents);
      setError(null);
    } catch (err) {
      setError(err as Error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, [JSON.stringify({ whereConditions, orderByConditions, limitCount })]);

  const add = async (data: Partial<T>): Promise<string> => {
    try {
      const docRef = await addDoc(collection(db, collectionName), data);
      await fetchData();
      return docRef.id;
    } catch (err) {
      setError(err as Error);
      throw err;
    }
  };

  const update = async (id: string, data: Partial<T>): Promise<void> => {
    try {
      await updateDoc(doc(db, collectionName, id), data);
      await fetchData();
    } catch (err) {
      setError(err as Error);
      throw err;
    }
  };

  const remove = async (id: string): Promise<void> => {
    try {
      await deleteDoc(doc(db, collectionName, id));
      await fetchData();
    } catch (err) {
      setError(err as Error);
      throw err;
    }
  };

  return {
    data,
    loading,
    error,
    add,
    update,
    remove,
    refresh: fetchData,
  };
}
