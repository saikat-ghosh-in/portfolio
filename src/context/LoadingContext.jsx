import { createContext, useContext, useState, useCallback } from "react";

const LoadingContext = createContext();

export function useLoading() {
  return useContext(LoadingContext);
}

export function LoadingProvider({ children }) {
  // Start dismissed immediately — no loading screen
  const [dismissed, setDismissed] = useState(true);

  const setBlobReady = useCallback(() => {}, []);
  const setPhotoReady = useCallback(() => {}, []);
  const dismiss = useCallback(() => setDismissed(true), []);

  return (
    <LoadingContext.Provider value={{ blobReady: true, photoReady: true, isReady: true, dismissed, setBlobReady, setPhotoReady, dismiss }}>
      {children}
    </LoadingContext.Provider>
  );
}
