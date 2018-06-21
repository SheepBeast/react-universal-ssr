
import { BUSINESS_ROLE_LIST, BUSINESS_ADD_ROLE, BUSINESS_MENU_PERMISSION_LIST, BUSINESS_DEL_ROLE, BUSINESS_ROLE_DETAIL, BUSINESS_UPDATE_ROLE, BUSINESS_ENABLE_ROLE } from '../constants/method-types'

import { api } from '../api'

// 角色列表
export const fetchRoleList = params => async dispatch => {
  let ret = await api.fetch(BUSINESS_ROLE_LIST, params)

  console.log(`fetch role list data -->`, ret)

  return ret
}

// 添加角色
export const addRole = params => async dispatch => {
  let ret = await api.fetch(BUSINESS_ADD_ROLE, params)

  console.log('add role data -->', ret)

 return ret
}

// 删除角色
export const deleteRole = params => async dispatch => {
  let ret = await api.fetch(BUSINESS_DEL_ROLE, params)

  console.log('del role data -->', ret)

  return ret
}

// 权限菜单
export const fetchMenuPermissionList = params => async dispatch => {
  let ret = await api.fetch(BUSINESS_MENU_PERMISSION_LIST, params)

  console.log('menu permission list data -->', ret)

  return ret
}

// 角色详情
export const fetchRoleDetail = params => async dispatch => {
  let ret = await api.fetch(BUSINESS_ROLE_DETAIL, params)

  console.log('role detail data -->', ret)

  return ret

}

// 编辑角色
export const editRole = params => async dispatch => {
  let ret = await api.fetch(BUSINESS_UPDATE_ROLE, params)

  console.log('edit role ret -->', ret)

  return ret
}

// 启用/禁用角色
export const enableRole = params => async dispatch => {
  let ret = await api.fetch(BUSINESS_ENABLE_ROLE, params)

  console.log('enable role ret -->', ret)

  return ret
}