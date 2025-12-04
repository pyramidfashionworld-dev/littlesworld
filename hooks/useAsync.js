// /hooks/useAsync.js
import { useState, useCallback, useRef, useEffect } from "react";

export function useAsync() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const mountedRef = useRef(true);

  useEffect(() => {
    return () => { mountedRef.current = false; };
  }, []);

  const run = useCallback(async (asyncFn) => {
    setLoading(true);
    setError(null);
    try {
      const result = await asyncFn();
      if (mountedRef.current) setLoading(false);
      return result;
    } catch (err) {
      if (mountedRef.current) {
        setError(err);
        setLoading(false);
      }
      throw err;
    }
  }, []);

  return { loading, error, run, setError };
}
