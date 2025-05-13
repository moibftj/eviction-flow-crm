
import React, { createContext, useContext, useReducer, ReactNode } from "react";
import { CRMContextType, CRMState } from "./crmTypes";
import { crmReducer } from "./crmReducer";
import { initialState } from "./crmInitialState";

// Create context
const CRMContext = createContext<CRMContextType | undefined>(undefined);

// Provider component
export const CRMProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(crmReducer, initialState);

  const addOwner = (owner: Parameters<CRMContextType["addOwner"]>[0]) => {
    dispatch({ type: "ADD_OWNER", payload: owner });
  };

  const updateOwner = (owner: Parameters<CRMContextType["updateOwner"]>[0]) => {
    dispatch({ type: "UPDATE_OWNER", payload: owner });
  };

  const addTenant = (tenant: Parameters<CRMContextType["addTenant"]>[0]) => {
    dispatch({ type: "ADD_TENANT", payload: tenant });
  };

  const updateTenant = (tenant: Parameters<CRMContextType["updateTenant"]>[0]) => {
    dispatch({ type: "UPDATE_TENANT", payload: tenant });
  };

  const addProperty = (property: Parameters<CRMContextType["addProperty"]>[0]) => {
    dispatch({ type: "ADD_PROPERTY", payload: property });
  };

  const updateProperty = (property: Parameters<CRMContextType["updateProperty"]>[0]) => {
    dispatch({ type: "UPDATE_PROPERTY", payload: property });
  };

  const addCase = (caseData: Parameters<CRMContextType["addCase"]>[0]) => {
    dispatch({ type: "ADD_CASE", payload: caseData });
  };

  const updateCase = (caseData: Parameters<CRMContextType["updateCase"]>[0]) => {
    dispatch({ type: "UPDATE_CASE", payload: caseData });
  };

  const updateCaseStage = (caseId: string, stage: Parameters<CRMContextType["updateCaseStage"]>[1]) => {
    dispatch({ type: "UPDATE_CASE_STAGE", payload: { caseId, stage } });
  };

  const addDocument = (document: Parameters<CRMContextType["addDocument"]>[0]) => {
    dispatch({ type: "ADD_DOCUMENT", payload: document });
  };

  const updateDocument = (document: Parameters<CRMContextType["updateDocument"]>[0]) => {
    dispatch({ type: "UPDATE_DOCUMENT", payload: document });
  };

  const deleteDocument = (documentId: string) => {
    dispatch({ type: "DELETE_DOCUMENT", payload: documentId });
  };

  const addNote = (note: Parameters<CRMContextType["addNote"]>[0]) => {
    dispatch({ type: "ADD_NOTE", payload: note });
  };

  const addReminder = (reminder: Parameters<CRMContextType["addReminder"]>[0]) => {
    dispatch({ type: "ADD_REMINDER", payload: reminder });
  };

  const updateReminder = (reminder: Parameters<CRMContextType["updateReminder"]>[0]) => {
    dispatch({ type: "UPDATE_REMINDER", payload: reminder });
  };

  const completeReminder = (reminderId: string) => {
    dispatch({ type: "COMPLETE_REMINDER", payload: reminderId });
  };

  const value: CRMContextType = {
    ...state,
    addOwner,
    updateOwner,
    addTenant,
    updateTenant,
    addProperty,
    updateProperty,
    addCase,
    updateCase,
    updateCaseStage,
    addDocument,
    updateDocument,
    deleteDocument,
    addNote,
    addReminder,
    updateReminder,
    completeReminder,
  };

  return (
    <CRMContext.Provider value={value}>
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
