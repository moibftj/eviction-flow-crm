
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

// Context type
export type CRMContextType = {
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
  addDocument: (document: Omit<Document, "id" | "uploadedAt"> & { caseId?: string }) => void;
  updateDocument: (document: Document) => void;
  deleteDocument: (documentId: string) => void;
  addNote: (note: Omit<Note, "id" | "createdAt">) => void;
  addReminder: (reminder: Omit<Reminder, "id">) => void;
  updateReminder: (reminder: Reminder) => void;
  completeReminder: (reminderId: string) => void;
};

// State type
export interface CRMState {
  owners: PropertyOwner[];
  tenants: Tenant[];
  properties: Property[];
  cases: Case[];
  documents: Document[];
  notes: Note[];
  reminders: Reminder[];
}

// Action types
export type ActionType = 
  | { type: "ADD_OWNER"; payload: Omit<PropertyOwner, "id" | "createdAt" | "notes"> }
  | { type: "UPDATE_OWNER"; payload: PropertyOwner }
  | { type: "ADD_TENANT"; payload: Omit<Tenant, "id" | "notes"> }
  | { type: "UPDATE_TENANT"; payload: Tenant }
  | { type: "ADD_PROPERTY"; payload: Omit<Property, "id" | "notes"> }
  | { type: "UPDATE_PROPERTY"; payload: Property }
  | { type: "ADD_CASE"; payload: Omit<Case, "id" | "documents" | "reminders" | "notes" | "createdAt" | "updatedAt"> }
  | { type: "UPDATE_CASE"; payload: Case }
  | { type: "UPDATE_CASE_STAGE"; payload: { caseId: string; stage: CaseStage } }
  | { type: "ADD_DOCUMENT"; payload: Omit<Document, "id" | "uploadedAt"> & { caseId?: string } }
  | { type: "UPDATE_DOCUMENT"; payload: Document }
  | { type: "DELETE_DOCUMENT"; payload: string }
  | { type: "ADD_NOTE"; payload: Omit<Note, "id" | "createdAt"> }
  | { type: "ADD_REMINDER"; payload: Omit<Reminder, "id"> }
  | { type: "UPDATE_REMINDER"; payload: Reminder }
  | { type: "COMPLETE_REMINDER"; payload: string };
