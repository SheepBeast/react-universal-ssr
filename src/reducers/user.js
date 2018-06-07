import { SET_USER_LIST } from "../constants/action-types";

export const userList = (state = [], action) => {
  switch (action.type) {
    case SET_USER_LIST:
      return action.userListData || []
    default:
      return state
  }
}