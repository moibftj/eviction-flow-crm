
export type LeadSource = 
  | "website_form"
  | "phone_call"
  | "referral"
  | "ad_campaign"
  | "other";

export type UrgencyLevel = 
  | "asap" 
  | "urgent"
  | "normal"
  | "30_days" 
  | "60_days" 
  | "90_days" 
  | "not_urgent";

export type EvictionReason = 
  | "non_payment" 
  | "lease_violation" 
  | "illegal_activity" 
  | "property_damage" 
  | "unauthorized_occupant" 
  | "other";

export type CommunicationPreference = 
  | "email" 
  | "phone" 
  | "text" 
  | "mail";

export type CaseStage = 
  | 1  // New Lead / Intake Submitted
  | 2  // Under Review / Awaiting Documents
  | 3  // Notice Served
  | 4  // Waiting Period / Tenant Response
  | 5  // Court Filing
  | 6  // Hearing Scheduled
  | 7  // Judgment
  | 8  // Enforcement / Lockout
  | 9; // Case Closed

export interface Document {
  id: string;
  name: string;
  type: "lease" | "notice" | "court_filing" | "correspondence" | "other";
  url: string;
  uploadedAt: Date;
  signatureStatus?: "unsigned" | "pending" | "signed";
  notes?: string;
  caseId?: string;
  deleted?: boolean;
}

export interface Note {
  id: string;
  content: string;
  createdAt: Date;
  createdBy: string;
}

export interface Reminder {
  id: string;
  title: string;
  description?: string;
  dueDate: Date;
  completed: boolean;
  caseId: string;
  assignedTo?: string;
  notificationType: "email" | "sms" | "in_app";
}

export interface PropertyOwner {
  id: string;
  name: string;
  phone: string;
  email: string;
  address?: string;
  communicationPreference: CommunicationPreference;
  notes: Note[];
  createdAt: Date;
}

export interface Tenant {
  id: string;
  name: string;
  phone?: string;
  email?: string;
  leaseStartDate?: Date;
  notes: Note[];
}

export interface Property {
  id: string;
  address: string;
  unit?: string;
  city: string;
  state: string;
  zipCode: string;
  ownerId: string;
  notes: Note[];
}

export interface Case {
  id: string;
  propertyId: string;
  propertyOwnerId: string;
  tenantId: string;
  evictionReason: EvictionReason;
  urgencyLevel: UrgencyLevel;
  stage: CaseStage;
  description?: string;
  leadSource: LeadSource;
  documents: Document[];
  reminders: Reminder[];
  notes: Note[];
  createdAt: Date;
  updatedAt: Date;
  // Additional fields for enhanced form
  additionalTenants?: string;
  rentOwed?: string;
  pastEvictions?: boolean;
  legalNoticeServed?: boolean;
  legalNoticeDateServed?: string;
  preferredDate?: string;
  preferredTime?: string;
  signature?: string;
}

// Analytics types
export interface CaseAnalytics {
  totalCases: number;
  casesByStage: Record<CaseStage, number>;
  avgCaseDuration: number; // in days
  successRate: number; // percentage
  casesBySource: Record<LeadSource, number>;
}
