import { FirestoreError } from 'firebase/firestore';
import { useEffect, useState } from 'react';

type MutationCallback = () => Promise<void>;

export function useMutation() {
  const [data, setData] = useState<unknown>();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<FirestoreError | unknown>();
  const [mutationFn, setMutationFn] = useState<MutationCallback>();
  const mutation = (mutationCallback: MutationCallback) => {
    setLoading(true);
    setMutationFn(mutationCallback);
  };

  useEffect(() => {
    const mutationCallback = async () => {
      if (typeof mutationFn === 'function') {
        try {
          const data = await mutationFn();
          setData(data);
        } catch (error: unknown) {
          setError(error);
        } finally {
          setLoading(false);
        }
      }
    };

    mutationCallback();
  }, [mutationFn]);

  return [mutation, data, loading, error];
}
