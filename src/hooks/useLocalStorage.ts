import { useEffect, useState } from 'react';

function useLocalStorage() {
  const [isLocalStorageError, setIsLocalStorageError] = useState(false);
  const withoutLocalStorage = typeof window === 'undefined'

  const handleError = () => {
    if (!isLocalStorageError) {
      setIsLocalStorageError(true);
    }
  };

  const setLocalStorage = (k: string, v: string) => {
    if(withoutLocalStorage) return
    try {
      localStorage.setItem(k, v);
    } catch (error) {
      handleError();
    }
  };

  const getLocalStorage = (k: string) => {
    if(withoutLocalStorage) return
    try {
      const data = localStorage.getItem(k);
      return data;
    } catch (error) {
      handleError();
    }
  };

  const removeLocalStorage = (k: string) => {
    if(withoutLocalStorage) return
    try {
      localStorage.removeItem(k);
    } catch (error) {
      handleError();
    }
  };

  return {
    setLocalStorage,
    getLocalStorage,
    isLocalStorageError,
    removeLocalStorage
  };
}

export default useLocalStorage;
