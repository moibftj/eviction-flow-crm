
import { CRMState } from "./crmTypes";
import { 
  mockOwners,
  mockTenants,
  mockProperties,
  mockCases,
  mockDocuments,
  mockNotes,
  mockReminders
} from "../data/mockData";

// Initial state
export const initialState: CRMState = {
  owners: mockOwners,
  tenants: mockTenants,
  properties: mockProperties,
  cases: mockCases,
  documents: mockDocuments,
  notes: mockNotes,
  reminders: mockReminders,
};
