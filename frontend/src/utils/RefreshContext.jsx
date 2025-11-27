// RefreshContext.jsx
import { createContext, useContext, useState } from "react";

const RefreshContext = createContext();

export const RefreshContextProvider = ({ children }) => {
  const [refreshKey, setRefreshKey] = useState(0);
  const triggerRefresh = () => setRefreshKey((prev) => prev + 1);

  return (
    <RefreshContext.Provider value={{ refreshKey, triggerRefresh }}>
      {children}
    </RefreshContext.Provider>
  );
};

export const useRefreshContext = () => useContext(RefreshContext);
