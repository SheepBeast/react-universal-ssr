import { SET_TENANT_LIST } from "../constants/action-types";

export const tenantList = (state = [], action) => {
  switch (action.type) {
    case SET_TENANT_LIST:
      return action.tenantListData || []
    default:
      return state
  }
}