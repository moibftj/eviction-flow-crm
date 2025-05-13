
import { Document } from "../../types";
import { generateId } from "../utils/crmUtils";
import { ActionType, CRMState } from "../crmTypes";

export const documentReducer = (state: CRMState, action: ActionType): Partial<CRMState> => {
  switch (action.type) {
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
        cases: updatedCases,
        documents: [...state.documents, newDocument],
      };
    case "UPDATE_DOCUMENT":
      return {
        documents: state.documents.map(doc => 
          doc.id === action.payload.id ? action.payload : doc
        ),
        cases: state.cases.map(caseItem => ({
          ...caseItem,
          documents: caseItem.documents.map(doc => 
            doc.id === action.payload.id ? action.payload : doc
          )
        })),
      };
    case "DELETE_DOCUMENT":
      return {
        // Mark document as deleted instead of removing it
        documents: state.documents.map(doc => 
          doc.id === action.payload ? { ...doc, deleted: true } : doc
        ),
        // Also update documents in cases
        cases: state.cases.map(caseItem => ({
          ...caseItem,
          documents: caseItem.documents.map(doc => 
            doc.id === action.payload ? { ...doc, deleted: true } : doc
          )
        })),
      };
    default:
      return {};
  }
};
