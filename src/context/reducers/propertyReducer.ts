
import { Property } from "../../types";
import { generateId } from "../utils/crmUtils";
import { ActionType, CRMState } from "../crmTypes";

export const propertyReducer = (state: CRMState, action: ActionType): Partial<CRMState> => {
  switch (action.type) {
    case "ADD_PROPERTY":
      const newProperty: Property = {
        ...action.payload,
        id: generateId(),
        notes: [],
      };
      return {
        properties: [...state.properties, newProperty],
      };
    case "UPDATE_PROPERTY":
      return {
        properties: state.properties.map(property => 
          property.id === action.payload.id ? action.payload : property
        ),
      };
    default:
      return {};
  }
};
