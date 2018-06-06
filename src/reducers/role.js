import {
  SET_ROLE_LIST, SET_MENU_PERMISSION_LIST
} from '../constants/action-types'

import assign from '../utils/assign'

export const roleList = (state = [], action) => {
  switch (action.type) {
    case SET_ROLE_LIST:
      return action.roleListData || []
    default:
      return state
  }
}

export const menuPermissionList = (state = [], action) => {
  switch (action.type) {
    case SET_MENU_PERMISSION_LIST:
      return action.menuPermissionListData || []
    default:
      return state
  }
}