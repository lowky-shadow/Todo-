// src/hooks/useDebounce.ts
import { useCallback, useRef, useEffect } from 'react';

/**
 * Custom hook that debounces a callback function
 * @param callback - The function to debounce
 * @param delay - Delay in milliseconds
 * @returns Debounced version of the callback
 */

function useDebounce<T>(callback: (value: T) => void, delay: number) {
  // Store the callback in a ref so we always call the latest version
  const callbackRef = useRef(callback);
  // Store the timeout ID so we can cancel it
  const timeoutRef = useRef<NodeJS.Timeout>(null);

  // Update the callback ref whenever the callback changes
  useEffect(() => {
    callbackRef.current = callback;
  }, [callback]);

  // Return the debounced function
  return useCallback((value: T) => {
    // Cancel any existing timeout
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    // Set a new timeout
    timeoutRef.current = setTimeout(() => {
      callbackRef.current(value);
    }, delay);
  }, [delay]);
}

export default useDebounce;