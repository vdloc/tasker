import { useEffect, useState } from 'react';

export function useMutation() {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [mutationFn, setMutationFn] = useState();
  const mutation = (mutationCallback: () => Promise<any>) => {
    setLoading(true);
    setMutationFn(mutationCallback as any);
  };

  useEffect(() => {
    const mutationCallback = async () => {
      try {
        const data = await (mutationFn as any)();
        setData(data);
      } catch (error: any) {
        setError(error);
      } finally {
        console.log('finally');

        setLoading(false);
      }
    };
    typeof mutationFn === 'function' && mutationCallback();
  }, [mutationFn]);

  return [mutation, data, loading, error];
}
