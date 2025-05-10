
import { 
  PropertyOwner, 
  Tenant, 
  Property, 
  Case, 
  Document, 
  Note, 
  Reminder,
  LeadSource,
  UrgencyLevel,
  EvictionReason,
  CommunicationPreference,
  CaseStage
} from "../types";

// Helper to get a random date within the last 6 months
const getRandomDate = (monthsBack = 6) => {
  const date = new Date();
  date.setMonth(date.getMonth() - Math.floor(Math.random() * monthsBack));
  date.setDate(Math.floor(Math.random() * 28) + 1);
  return date;
};

// Mock Owners
export const mockOwners: PropertyOwner[] = [
  {
    id: "owner1",
    name: "John Smith",
    phone: "555-123-4567",
    email: "john.smith@example.com",
    address: "123 Property Lane, Cityville, ST 12345",
    communicationPreference: "email" as CommunicationPreference,
    notes: [],
    createdAt: getRandomDate(3),
  },
  {
    id: "owner2",
    name: "Maria Rodriguez",
    phone: "555-987-6543",
    email: "maria.r@example.com",
    address: "456 Landlord Ave, Propertyburg, ST 67890",
    communicationPreference: "phone" as CommunicationPreference,
    notes: [],
    createdAt: getRandomDate(5),
  },
  {
    id: "owner3",
    name: "Robert Johnson",
    phone: "555-456-7890",
    email: "robert.j@example.com",
    communicationPreference: "text" as CommunicationPreference,
    notes: [],
    createdAt: getRandomDate(2),
  }
];

// Mock Tenants
export const mockTenants: Tenant[] = [
  {
    id: "tenant1",
    name: "Alice Williams",
    phone: "555-222-3333",
    email: "alice.w@example.com",
    leaseStartDate: new Date(2022, 3, 15),
    notes: [],
  },
  {
    id: "tenant2",
    name: "Michael Brown",
    phone: "555-444-5555",
    email: "michael.b@example.com",
    leaseStartDate: new Date(2021, 8, 1),
    notes: [],
  },
  {
    id: "tenant3",
    name: "Sarah Davis",
    phone: "555-666-7777",
    email: "sarah.d@example.com",
    leaseStartDate: new Date(2022, 10, 1),
    notes: [],
  }
];

// Mock Properties
export const mockProperties: Property[] = [
  {
    id: "property1",
    address: "123 Rental St",
    unit: "Apt 4B",
    city: "Cityville",
    state: "ST",
    zipCode: "12345",
    ownerId: "owner1",
    notes: [],
  },
  {
    id: "property2",
    address: "456 Tenant Ave",
    city: "Propertyburg",
    state: "ST",
    zipCode: "67890",
    ownerId: "owner2",
    notes: [],
  },
  {
    id: "property3",
    address: "789 Lease Blvd",
    unit: "Unit 7",
    city: "Rentalville",
    state: "ST",
    zipCode: "34567",
    ownerId: "owner3",
    notes: [],
  }
];

// Mock Notes
export const mockNotes: Note[] = [
  {
    id: "note1",
    content: "Tenant has requested repairs multiple times for leaky faucet.",
    createdAt: getRandomDate(1),
    createdBy: "admin",
  },
  {
    id: "note2",
    content: "Owner mentioned plans to sell the property next year.",
    createdAt: getRandomDate(2),
    createdBy: "admin",
  },
  {
    id: "note3",
    content: "Tenant has not responded to notice as of today.",
    createdAt: getRandomDate(0),
    createdBy: "admin",
  }
];

// Mock Documents
export const mockDocuments: Document[] = [
  {
    id: "doc1",
    name: "Lease Agreement - Alice Williams",
    type: "lease",
    url: "#",
    uploadedAt: getRandomDate(4),
    signatureStatus: "signed",
  },
  {
    id: "doc2",
    name: "3-Day Notice - Michael Brown",
    type: "notice",
    url: "#",
    uploadedAt: getRandomDate(1),
    signatureStatus: "unsigned",
  },
  {
    id: "doc3",
    name: "Court Filing - Sarah Davis",
    type: "court_filing",
    url: "#",
    uploadedAt: getRandomDate(0),
  }
];

// Mock Reminders
export const mockReminders: Reminder[] = [
  {
    id: "reminder1",
    title: "Follow up on notice delivery",
    description: "Check if tenant received the formal notice",
    dueDate: new Date(Date.now() + 86400000 * 2), // 2 days from now
    completed: false,
    caseId: "case1",
    assignedTo: "admin",
    notificationType: "email",
  },
  {
    id: "reminder2",
    title: "Court filing deadline",
    description: "Submit all paperwork to the court",
    dueDate: new Date(Date.now() + 86400000 * 5), // 5 days from now
    completed: false,
    caseId: "case2",
    notificationType: "in_app",
  },
  {
    id: "reminder3",
    title: "Prepare for hearing",
    description: "Gather all documentation and evidence",
    dueDate: new Date(Date.now() + 86400000 * 10), // 10 days from now
    completed: false,
    caseId: "case3",
    assignedTo: "admin",
    notificationType: "sms",
  }
];

// Mock Cases
export const mockCases: Case[] = [
  {
    id: "case1",
    propertyId: "property1",
    propertyOwnerId: "owner1",
    tenantId: "tenant1",
    evictionReason: "non_payment" as EvictionReason,
    urgencyLevel: "asap" as UrgencyLevel,
    stage: 3 as CaseStage, // Notice Served
    description: "Tenant is 2 months behind on rent payments.",
    leadSource: "phone_call" as LeadSource,
    documents: [mockDocuments[0]],
    reminders: [mockReminders[0]],
    notes: [mockNotes[0]],
    createdAt: getRandomDate(2),
    updatedAt: new Date(),
  },
  {
    id: "case2",
    propertyId: "property2",
    propertyOwnerId: "owner2",
    tenantId: "tenant2",
    evictionReason: "lease_violation" as EvictionReason,
    urgencyLevel: "30_days" as UrgencyLevel,
    stage: 5 as CaseStage, // Court Filing
    description: "Tenant has unauthorized pets and has damaged the property.",
    leadSource: "website_form" as LeadSource,
    documents: [mockDocuments[1]],
    reminders: [mockReminders[1]],
    notes: [mockNotes[1]],
    createdAt: getRandomDate(3),
    updatedAt: new Date(),
  },
  {
    id: "case3",
    propertyId: "property3",
    propertyOwnerId: "owner3",
    tenantId: "tenant3",
    evictionReason: "unauthorized_occupant" as EvictionReason,
    urgencyLevel: "60_days" as UrgencyLevel,
    stage: 6 as CaseStage, // Hearing Scheduled
    description: "Unauthorized occupants have moved in without being on the lease.",
    leadSource: "referral" as LeadSource,
    documents: [mockDocuments[2]],
    reminders: [mockReminders[2]],
    notes: [mockNotes[2]],
    createdAt: getRandomDate(4),
    updatedAt: new Date(),
  }
];

// Mock data for analytics
export const mockAnalyticsData = {
  totalCases: 24,
  casesByStage: {
    1: 5,
    2: 3,
    3: 4,
    4: 3,
    5: 4,
    6: 2,
    7: 1,
    8: 0,
    9: 2,
  },
  avgCaseDuration: 45, // days
  successRate: 78, // percent
  casesBySource: {
    website_form: 10,
    phone_call: 7,
    referral: 5,
    ad_campaign: 1,
    other: 1
  }
};

// Helper functions to get mock data for use in components
export const getMockOwnerById = (id: string): PropertyOwner | undefined => {
  return mockOwners.find(owner => owner.id === id);
};

export const getMockTenantById = (id: string): Tenant | undefined => {
  return mockTenants.find(tenant => tenant.id === id);
};

export const getMockPropertyById = (id: string): Property | undefined => {
  return mockProperties.find(property => property.id === id);
};

export const getMockCaseById = (id: string): Case | undefined => {
  return mockCases.find(caseItem => caseItem.id === id);
};
