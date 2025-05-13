
import { Tenant } from "../../types";
import { generateId } from "../utils/crmUtils";
import { ActionType, CRMState } from "../crmTypes";

export const tenantReducer = (state: CRMState, action: ActionType): Partial<CRMState> => {
  switch (action.type) {
    case "ADD_TENANT":
      const newTenant: Tenant = {
        ...action.payload,
        id: generateId(),
        notes: [],
      };
      return {
        tenants: [...state.tenants, newTenant],
      };
    case "UPDATE_TENANT":
      return {
        tenants: state.tenants.map(tenant => 
          tenant.id === action.payload.id ? action.payload : tenant
        ),
      };
    default:
      return {};
  }
};
