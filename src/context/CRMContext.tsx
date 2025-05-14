
import React, { createContext, useContext, ReactNode } from "react";
import { CRMContextType } from "./crmTypes";
import { useCRMActions } from "./hooks/useCRMActions";

// Create context
const CRMContext = createContext<CRMContextType | undefined>(undefined);

// Provider component
export const CRMProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const crmActions = useCRMActions();
  
  return (
    <CRMContext.Provider value={crmActions}>
      {children}
    </CRMContext.Provider>
  );
};

// Custom hook to use the CRM context
export const useCRM = () => {
  const context = useContext(CRMContext);
  if (context === undefined) {
    throw new Error("useCRM must be used within a CRMProvider");
  }
  return context;
};
