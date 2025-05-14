
import { 
  PropertyOwner, 
  Tenant, 
  Property, 
  Case, 
  Document, 
  Note, 
  Reminder, 
  CaseStage 
} from "../../types";

// Action creator functions
export const addOwnerAction = (owner: Omit<PropertyOwner, "id" | "createdAt" | "notes">) => ({
  type: "ADD_OWNER" as const,
  payload: owner,
});

export const updateOwnerAction = (owner: PropertyOwner) => ({
  type: "UPDATE_OWNER" as const,
  payload: owner,
});

export const addTenantAction = (tenant: Omit<Tenant, "id" | "notes">) => ({
  type: "ADD_TENANT" as const,
  payload: tenant,
});

export const updateTenantAction = (tenant: Tenant) => ({
  type: "UPDATE_TENANT" as const,
  payload: tenant,
});

export const addPropertyAction = (property: Omit<Property, "id" | "notes">) => ({
  type: "ADD_PROPERTY" as const,
  payload: property,
});

export const updatePropertyAction = (property: Property) => ({
  type: "UPDATE_PROPERTY" as const,
  payload: property,
});

export const addCaseAction = (caseData: Omit<Case, "id" | "documents" | "reminders" | "notes" | "createdAt" | "updatedAt">) => ({
  type: "ADD_CASE" as const,
  payload: caseData,
});

export const updateCaseAction = (caseData: Case) => ({
  type: "UPDATE_CASE" as const,
  payload: caseData,
});

export const updateCaseStageAction = (caseId: string, stage: CaseStage) => ({
  type: "UPDATE_CASE_STAGE" as const,
  payload: { caseId, stage },
});

export const addDocumentAction = (document: Omit<Document, "id" | "uploadedAt"> & { caseId?: string }) => ({
  type: "ADD_DOCUMENT" as const,
  payload: document,
});

export const updateDocumentAction = (document: Document) => ({
  type: "UPDATE_DOCUMENT" as const,
  payload: document,
});

export const deleteDocumentAction = (documentId: string) => ({
  type: "DELETE_DOCUMENT" as const,
  payload: documentId,
});

export const addNoteAction = (note: Omit<Note, "id" | "createdAt">) => ({
  type: "ADD_NOTE" as const,
  payload: note,
});

export const addReminderAction = (reminder: Omit<Reminder, "id">) => ({
  type: "ADD_REMINDER" as const,
  payload: reminder,
});

export const updateReminderAction = (reminder: Reminder) => ({
  type: "UPDATE_REMINDER" as const,
  payload: reminder,
});

export const completeReminderAction = (reminderId: string) => ({
  type: "COMPLETE_REMINDER" as const,
  payload: reminderId,
});
