import { type DocumentData, FirestoreError, Query, onSnapshot, query } from 'firebase/firestore';
import { useEffect, useState } from 'react';

export function useCollection(collectionQuery: Query<DocumentData>) {
  const [data, setData] = useState<unknown>();
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<FirestoreError>();

  const q = query(collectionQuery);
  useEffect(() => {
    const unsubscribe = onSnapshot(
      q,
      (querySnapshot) => {
        const values: unknown[] = [];
        querySnapshot.forEach((doc) => {
          values.push(doc.data());
        });
        setData(values);
        setLoading(false);
      },
      (error: FirestoreError) => {
        setError(error);
      },
    );

    return unsubscribe;
  }, [q]);

  return [data, loading as boolean, error];
}
