import {
  SET_ROLE_LIST, SET_MENU_PERMISSION_LIST, SET_USABLE_ROLE_LIST, SET_ROLE_DETAIL
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

export const usableRoleList = (state = [], action) => {
  switch (action.type) {
    case SET_USABLE_ROLE_LIST:
      return action.usableRoleListData || []
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

export const roleDetail = (state = {}, action) => {
  switch (action.type) {
    case SET_ROLE_DETAIL:
      return action.roleDetailData || []
    default:
      return state
  }
}