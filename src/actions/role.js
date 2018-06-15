
import {
  BUSINESS_ROLE_LIST, BUSINESS_ADD_ROLE, BUSINESS_MENU_PERMISSION_LIST, BUSINESS_DEL_ROLE, BUSINESS_ROLE_DETAIL, BUSINESS_UPDATE_ROLE, BUSINESS_ENABLE_ROLE
} from '../constants/method-types'

import {
  SET_ROLE_LIST,
  SET_MENU_PERMISSION_LIST,
  SET_USABLE_ROLE_LIST,
  SET_ROLE_DETAIL
} from '../constants/action-types'

import { api } from '../api'

import isRequestSuccess from '../utils/isRequestSuccess'

export const setRoleList = roleListData => ({
  type: SET_ROLE_LIST,
  roleListData
})

export const setUsableRoleList = usableRoleListData => ({
  type: SET_USABLE_ROLE_LIST,
  usableRoleListData
})

// export const addRole = roleData => ({
//   type: ADD_ROLE,
//   roleData
// })

export const setMenuPermissionList = menuPermissionListData => ({
  type: SET_MENU_PERMISSION_LIST,
  menuPermissionListData
})

export const setRoleDetail = roleDetailData => ({
  type: SET_ROLE_DETAIL,
  roleDetailData
})

export const fetchRoleListData = params => async dispatch => {
  let ret = await api.fetch(BUSINESS_ROLE_LIST, params)

  console.log(`${params.flag} role list data -->`, ret)

  if (isRequestSuccess(ret)) {
    let list = ret.data.data.list
    let action = params.flag == 'role-list' ? setRoleList(list) : setUsableRoleList(list)

    dispatch(action)
  } else {
    console.log('role list error -->', ret)
  }

}

export const addRoleData = params => async dispatch => {
  let ret = await api.fetch(BUSINESS_ADD_ROLE, params)

  console.log('add role data -->', ret)

  if (isRequestSuccess(ret)) {
    // dispatch(addRole)
  } else {
    console.log('add role error -->', ret)
  }
}

export const deleteRoleData = params => async dispatch => {
  let ret = await api.fetch(BUSINESS_DEL_ROLE, params)

  console.log('del role data -->', ret)

  if (isRequestSuccess(ret)) {
    // dispatch(delRole)
  } else {
    console.log('del role error -->', ret)
  }
}

export const fetchMenuPermissionListData = params => async dispatch => {
  let ret = await api.fetch(BUSINESS_MENU_PERMISSION_LIST, params)

  console.log('menu permission list data -->', ret)

  if (isRequestSuccess(ret)) {
    dispatch(setMenuPermissionList(ret.data.data.actions))
    return ret.data.data.actions

  } else {
    console.log('menu permission list error -->', ret)
  }

}

export const fetchRoleDetailData = params => async dispatch => {
  let ret = await api.fetch(BUSINESS_ROLE_DETAIL, params)

  console.log('role detail data -->', ret)

  if (isRequestSuccess(ret)) {
    // dispatch(setRoleDetail(ret.data.data.actions))
    return ret.data.data

  } else {
    console.log('role detail error -->', ret)
  }

}

export const editRole = params => async dispatch => {
  let ret = await api.fetch(BUSINESS_UPDATE_ROLE, params)

  console.log('edit role ret -->', ret)

  if(isRequestSuccess(ret)){

  }else{
    console.log('edit role error -->', ret)
  }
}


export const enableRole = params => async dispatch => {
  let ret = await api.fetch(BUSINESS_ENABLE_ROLE, params)

  console.log('enable role ret -->', ret)

  if(isRequestSuccess(ret)){

  }else{
    console.log('enable role error -->', ret)
  }
}