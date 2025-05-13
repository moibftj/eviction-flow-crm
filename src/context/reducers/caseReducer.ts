
import { Case } from "../../types";
import { generateId } from "../utils/crmUtils";
import { ActionType, CRMState } from "../crmTypes";

export const caseReducer = (state: CRMState, action: ActionType): Partial<CRMState> => {
  switch (action.type) {
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
        cases: [...state.cases, newCase],
      };
    case "UPDATE_CASE":
      return {
        cases: state.cases.map(caseItem => 
          caseItem.id === action.payload.id ? 
          { ...action.payload, updatedAt: new Date() } : 
          caseItem
        ),
      };
    case "UPDATE_CASE_STAGE":
      return {
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
    default:
      return {};
  }
};
