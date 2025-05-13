
import { PropertyOwner } from "../../types";
import { generateId } from "../utils/crmUtils";
import { ActionType, CRMState } from "../crmTypes";

export const ownerReducer = (state: CRMState, action: ActionType): Partial<CRMState> => {
  switch (action.type) {
    case "ADD_OWNER":
      const newOwner: PropertyOwner = {
        ...action.payload,
        id: generateId(),
        createdAt: new Date(),
        notes: [],
      };
      return {
        owners: [...state.owners, newOwner],
      };
    case "UPDATE_OWNER":
      return {
        owners: state.owners.map(owner => 
          owner.id === action.payload.id ? action.payload : owner
        ),
      };
    default:
      return {};
  }
};
