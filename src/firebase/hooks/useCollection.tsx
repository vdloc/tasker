import { onSnapshot, query } from 'firebase/firestore';
import { useEffect, useState } from 'react';

export function useCollection(collectionQuery: any) {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  const q = query(collectionQuery);
  useEffect(() => {
    const unsubscribe = onSnapshot(
      q,
      (querySnapshot) => {
        const values: any = [];
        querySnapshot.forEach((doc) => {
          values.push(doc.data());
        });
        setData(values);
        setLoading(false);
      },
      (error: any) => {
        setError(error);
      },
    );

    return unsubscribe;
  }, []);

  return [data as any, loading, error];
}
