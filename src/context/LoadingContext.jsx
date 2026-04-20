import { createContext, useContext, useState, useCallback } from "react";

const LoadingContext = createContext();

export function useLoading() {
  return useContext(LoadingContext);
}

export function LoadingProvider({ children }) {
  const [blobReady, setBlobReadyState] = useState(false);
  const [photoReady, setPhotoReadyState] = useState(false);
  const [dismissed, setDismissed] = useState(false);

  const isReady = blobReady && photoReady;

  const setBlobReady = useCallback(() => setBlobReadyState(true), []);
  const setPhotoReady = useCallback(() => setPhotoReadyState(true), []);
  const dismiss = useCallback(() => setDismissed(true), []);

  return (
    <LoadingContext.Provider value={{ blobReady, photoReady, isReady, dismissed, setBlobReady, setPhotoReady, dismiss }}>
      {children}
    </LoadingContext.Provider>
  );
}
