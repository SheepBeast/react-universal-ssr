import { SET_STAFF_LIST } from "../constants/action-types";

export const staffList = (state = [], action) => {
  switch (action.type) {
    case SET_STAFF_LIST:
      return action.staffListData || []
    default:
      return state
  }
}