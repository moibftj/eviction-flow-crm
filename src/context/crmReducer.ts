
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
import { CRMState, ActionType } from "./crmTypes";

// Generate a simple UUID
export const generateId = (): string => {
  return Math.random().toString(36).substring(2) + Date.now().toString(36);
};

// Reducer
export const crmReducer = (state: CRMState, action: ActionType): CRMState => {
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

      // Extract caseId from payload (if provided)
      const { caseId, ...documentData } = action.payload;

      // Only update case documents if caseId is provided
      const updatedCases = caseId 
        ? state.cases.map(caseItem => {
            if (caseItem.id === caseId) {
              return {
                ...caseItem,
                documents: [...caseItem.documents, newDocument],
                updatedAt: new Date()
              };
            }
            return caseItem;
          })
        : state.cases;

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
