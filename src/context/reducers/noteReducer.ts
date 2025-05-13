
import { Note } from "../../types";
import { generateId } from "../utils/crmUtils";
import { ActionType, CRMState } from "../crmTypes";

export const noteReducer = (state: CRMState, action: ActionType): Partial<CRMState> => {
  switch (action.type) {
    case "ADD_NOTE":
      const newNote: Note = {
        ...action.payload,
        id: generateId(),
        createdAt: new Date(),
      };
      return {
        notes: [...state.notes, newNote],
      };
    default:
      return {};
  }
};
