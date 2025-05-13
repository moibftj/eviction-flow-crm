
import { CRMState, ActionType } from "./crmTypes";
import { ownerReducer } from "./reducers/ownerReducer";
import { tenantReducer } from "./reducers/tenantReducer";
import { propertyReducer } from "./reducers/propertyReducer";
import { caseReducer } from "./reducers/caseReducer";
import { documentReducer } from "./reducers/documentReducer";
import { noteReducer } from "./reducers/noteReducer";
import { reminderReducer } from "./reducers/reminderReducer";

// Re-export generateId from utils
export { generateId } from "./utils/crmUtils";

// Main reducer that combines all entity-specific reducers
export const crmReducer = (state: CRMState, action: ActionType): CRMState => {
  // Get partial state updates from each reducer
  const ownerUpdates = ownerReducer(state, action);
  const tenantUpdates = tenantReducer(state, action);
  const propertyUpdates = propertyReducer(state, action);
  const caseUpdates = caseReducer(state, action);
  const documentUpdates = documentReducer(state, action);
  const noteUpdates = noteReducer(state, action);
  const reminderUpdates = reminderReducer(state, action);

  // Combine all updates into a new state
  return {
    ...state,
    ...ownerUpdates,
    ...tenantUpdates,
    ...propertyUpdates,
    ...caseUpdates,
    ...documentUpdates,
    ...noteUpdates,
    ...reminderUpdates,
  };
};
