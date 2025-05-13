
import { Reminder } from "../../types";
import { generateId } from "../utils/crmUtils";
import { ActionType, CRMState } from "../crmTypes";

export const reminderReducer = (state: CRMState, action: ActionType): Partial<CRMState> => {
  switch (action.type) {
    case "ADD_REMINDER":
      const newReminder: Reminder = {
        ...action.payload,
        id: generateId(),
      };
      return {
        reminders: [...state.reminders, newReminder],
      };
    case "UPDATE_REMINDER":
      return {
        reminders: state.reminders.map(reminder => 
          reminder.id === action.payload.id ? action.payload : reminder
        ),
      };
    case "COMPLETE_REMINDER":
      return {
        reminders: state.reminders.map(reminder => 
          reminder.id === action.payload ? 
          { ...reminder, completed: true } : 
          reminder
        ),
      };
    default:
      return {};
  }
};
