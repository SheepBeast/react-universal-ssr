
import {
  BUSINESS_ROLE_LIST, BUSINESS_ADD_ROLE, BUSINESS_MENU_PERMISSION_LIST
} from '../constants/method-types'

import {
  SET_ROLE_LIST,
  SET_MENU_PERMISSION_LIST
} from '../constants/action-types'

import { api } from '../api'

import isRequestSuccess from '../utils/isRequestSuccess'

export const setRoleList = roleListData => ({
  type: SET_ROLE_LIST,
  roleListData
})

// export const addRole = roleData => ({
//   type: ADD_ROLE,
//   roleData
// })

export const setMenuPermissionList = menuPermissionListData => ({
  type: SET_MENU_PERMISSION_LIST,
  menuPermissionListData
})

export const fetchRoleListData = params => async dispatch => {
  let ret = await api.fetch(BUSINESS_ROLE_LIST, params)

  console.log('role list data -->', ret)

  if (isRequestSuccess(ret)) {
    dispatch(setRoleList(ret.data.data))
  }
  // else
}

export const addRoleData = params => async dispatch => {
  let ret = await api.fetch(BUSINESS_ADD_ROLE, params)

  console.log('add role data -->', ret)

  if (isRequestSuccess(ret)) {
    // dispatch(addRole)
  }
}

export const fetchMenuPermissionListData = params => async dispatch => {
  let ret = await api.fetch(BUSINESS_MENU_PERMISSION_LIST, params)

  console.log('menu permission list data -->', ret)

  if (isRequestSuccess(ret)) {
    dispatch(setMenuPermissionList(ret.data.data))
  }
}