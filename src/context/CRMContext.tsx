import React, { createContext, useContext, useReducer, ReactNode } from "react";
import { 
  PropertyOwner, 
  Tenant, 
  Property, 
  Case, 
  Document, 
  Note, 
  Reminder, 
  CaseStage 
} from "../types";

// Mock data for initial state
import { 
  mockOwners,
  mockTenants,
  mockProperties,
  mockCases,
  mockDocuments,
  mockNotes,
  mockReminders
} from "../data/mockData";

// Context type
type CRMContextType = {
  owners: PropertyOwner[];
  tenants: Tenant[];
  properties: Property[];
  cases: Case[];
  documents: Document[];
  notes: Note[];
  reminders: Reminder[];
  // Actions
  addOwner: (owner: Omit<PropertyOwner, "id" | "createdAt" | "notes">) => void;
  updateOwner: (owner: PropertyOwner) => void;
  addTenant: (tenant: Omit<Tenant, "id" | "notes">) => void;
  updateTenant: (tenant: Tenant) => void;
  addProperty: (property: Omit<Property, "id" | "notes">) => void;
  updateProperty: (property: Property) => void;
  addCase: (caseData: Omit<Case, "id" | "documents" | "reminders" | "notes" | "createdAt" | "updatedAt">) => void;
  updateCase: (caseData: Case) => void;
  updateCaseStage: (caseId: string, stage: CaseStage) => void;
  addDocument: (document: Omit<Document, "id" | "uploadedAt">) => void;
  updateDocument: (document: Document) => void;
  addNote: (note: Omit<Note, "id" | "createdAt">) => void;
  addReminder: (reminder: Omit<Reminder, "id">) => void;
  updateReminder: (reminder: Reminder) => void;
  completeReminder: (reminderId: string) => void;
};

// Initial state
const initialState = {
  owners: mockOwners,
  tenants: mockTenants,
  properties: mockProperties,
  cases: mockCases,
  documents: mockDocuments,
  notes: mockNotes,
  reminders: mockReminders,
};

// Action types
type ActionType = 
  | { type: "ADD_OWNER"; payload: Omit<PropertyOwner, "id" | "createdAt" | "notes"> }
  | { type: "UPDATE_OWNER"; payload: PropertyOwner }
  | { type: "ADD_TENANT"; payload: Omit<Tenant, "id" | "notes"> }
  | { type: "UPDATE_TENANT"; payload: Tenant }
  | { type: "ADD_PROPERTY"; payload: Omit<Property, "id" | "notes"> }
  | { type: "UPDATE_PROPERTY"; payload: Property }
  | { type: "ADD_CASE"; payload: Omit<Case, "id" | "documents" | "reminders" | "notes" | "createdAt" | "updatedAt"> }
  | { type: "UPDATE_CASE"; payload: Case }
  | { type: "UPDATE_CASE_STAGE"; payload: { caseId: string; stage: CaseStage } }
  | { type: "ADD_DOCUMENT"; payload: Omit<Document, "id" | "uploadedAt"> }
  | { type: "UPDATE_DOCUMENT"; payload: Document }
  | { type: "ADD_NOTE"; payload: Omit<Note, "id" | "createdAt"> }
  | { type: "ADD_REMINDER"; payload: Omit<Reminder, "id"> }
  | { type: "UPDATE_REMINDER"; payload: Reminder }
  | { type: "COMPLETE_REMINDER"; payload: string };

// Generate a simple UUID
const generateId = (): string => {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
};

// Reducer
const crmReducer = (state = initialState, action: ActionType) => {
  switch (action.type) {
    case "ADD_OWNER":
      const newOwner: PropertyOwner = {
        ...action.payload,
        id: generateId(),
        createdAt: new Date(),
        notes: [],
      };
      return {
        ...state,
        owners: [...state.owners, newOwner],
      };
    case "UPDATE_OWNER":
      return {
        ...state,
        owners: state.owners.map(owner => 
          owner.id === action.payload.id ? action.payload : owner
        ),
      };
    case "ADD_TENANT":
      const newTenant: Tenant = {
        ...action.payload,
        id: generateId(),
        notes: [],
      };
      return {
        ...state,
        tenants: [...state.tenants, newTenant],
      };
    case "UPDATE_TENANT":
      return {
        ...state,
        tenants: state.tenants.map(tenant => 
          tenant.id === action.payload.id ? action.payload : tenant
        ),
      };
    case "ADD_PROPERTY":
      const newProperty: Property = {
        ...action.payload,
        id: generateId(),
        notes: [],
      };
      return {
        ...state,
        properties: [...state.properties, newProperty],
      };
    case "UPDATE_PROPERTY":
      return {
        ...state,
        properties: state.properties.map(property => 
          property.id === action.payload.id ? action.payload : property
        ),
      };
    case "ADD_CASE":
      const newCase: Case = {
        ...action.payload,
        id: generateId(),
        documents: [],
        reminders: [],
        notes: [],
        createdAt: new Date(),
        updatedAt: new Date(),
      };
      return {
        ...state,
        cases: [...state.cases, newCase],
      };
    case "UPDATE_CASE":
      return {
        ...state,
        cases: state.cases.map(caseItem => 
          caseItem.id === action.payload.id ? 
          { ...action.payload, updatedAt: new Date() } : 
          caseItem
        ),
      };
    case "UPDATE_CASE_STAGE":
      return {
        ...state,
        cases: state.cases.map(caseItem => 
          caseItem.id === action.payload.caseId ? 
          { 
            ...caseItem, 
            stage: action.payload.stage,
            updatedAt: new Date()
          } : 
          caseItem
        ),
      };
    case "ADD_DOCUMENT":
      const newDocument: Document = {
        ...action.payload,
        id: generateId(),
        uploadedAt: new Date(),
      };

      // Find the case to update with the new document
      const updatedCases = state.cases.map(caseItem => {
        if (caseItem.id === id) {
          return {
            ...caseItem,
            documents: [...caseItem.documents, newDocument],
            updatedAt: new Date()
          };
        }
        return caseItem;
      });

      return {
        ...state,
        cases: updatedCases,
        documents: [...state.documents, newDocument],
      };
    case "UPDATE_DOCUMENT":
      return {
        ...state,
        documents: state.documents.map(doc => 
          doc.id === action.payload.id ? action.payload : doc
        ),
      };
    case "ADD_NOTE":
      const newNote: Note = {
        ...action.payload,
        id: generateId(),
        createdAt: new Date(),
      };
      return {
        ...state,
        notes: [...state.notes, newNote],
      };
    case "ADD_REMINDER":
      const newReminder: Reminder = {
        ...action.payload,
        id: generateId(),
      };
      return {
        ...state,
        reminders: [...state.reminders, newReminder],
      };
    case "UPDATE_REMINDER":
      return {
        ...state,
        reminders: state.reminders.map(reminder => 
          reminder.id === action.payload.id ? action.payload : reminder
        ),
      };
    case "COMPLETE_REMINDER":
      return {
        ...state,
        reminders: state.reminders.map(reminder => 
          reminder.id === action.payload ? 
          { ...reminder, completed: true } : 
          reminder
        ),
      };
    default:
      return state;
  }
};

// Create context
const CRMContext = createContext<CRMContextType | undefined>(undefined);

// Provider component
export const CRMProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [state, dispatch] = useReducer(crmReducer, initialState);

  const addOwner = (owner: Omit<PropertyOwner, "id" | "createdAt" | "notes">) => {
    dispatch({ type: "ADD_OWNER", payload: owner });
  };

  const updateOwner = (owner: PropertyOwner) => {
    dispatch({ type: "UPDATE_OWNER", payload: owner });
  };

  const addTenant = (tenant: Omit<Tenant, "id" | "notes">) => {
    dispatch({ type: "ADD_TENANT", payload: tenant });
  };

  const updateTenant = (tenant: Tenant) => {
    dispatch({ type: "UPDATE_TENANT", payload: tenant });
  };

  const addProperty = (property: Omit<Property, "id" | "notes">) => {
    dispatch({ type: "ADD_PROPERTY", payload: property });
  };

  const updateProperty = (property: Property) => {
    dispatch({ type: "UPDATE_PROPERTY", payload: property });
  };

  const addCase = (caseData: Omit<Case, "id" | "documents" | "reminders" | "notes" | "createdAt" | "updatedAt">) => {
    dispatch({ type: "ADD_CASE", payload: caseData });
  };

  const updateCase = (caseData: Case) => {
    dispatch({ type: "UPDATE_CASE", payload: caseData });
  };

  const updateCaseStage = (caseId: string, stage: CaseStage) => {
    dispatch({ type: "UPDATE_CASE_STAGE", payload: { caseId, stage } });
  };

  const addDocument = (document: Omit<Document, "id" | "uploadedAt">) => {
    dispatch({ type: "ADD_DOCUMENT", payload: document });
  };

  const updateDocument = (document: Document) => {
    dispatch({ type: "UPDATE_DOCUMENT", payload: document });
  };

  const addNote = (note: Omit<Note, "id" | "createdAt">) => {
    dispatch({ type: "ADD_NOTE", payload: note });
  };

  const addReminder = (reminder: Omit<Reminder, "id">) => {
    dispatch({ type: "ADD_REMINDER", payload: reminder });
  };

  const updateReminder = (reminder: Reminder) => {
    dispatch({ type: "UPDATE_REMINDER", payload: reminder });
  };

  const completeReminder = (reminderId: string) => {
    dispatch({ type: "COMPLETE_REMINDER", payload: reminderId });
  };

  const value = {
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
