import { api } from '../api'
import { BUSINESS_USER_LIST, BUSINESS_ADD_USER, BUSINESS_ENABLE_USER, BUSINESS_DEL_USER, BUSINESS_MODIFY_USER, BUSINESS_USER_DETAIL } from '../constants/method-types';
import isRequestSuccess from '../utils/isRequestSuccess';

// 用户列表
export const fetchUserList = params => async dispatch => {
  let ret = await api.fetch(BUSINESS_USER_LIST, params)

  console.log('user list ret -->', ret)

  return ret
}

// 添加用户
export const addUser = params => async dispatch => {
  let ret = await api.fetch(BUSINESS_ADD_USER, params, { url: '/local/user-add' })

  console.log('add user ret -->', ret)

  return ret
}

// 启用/禁用用户
export const enableUser = params => async dispatch => {
  let ret = await api.fetch(BUSINESS_ENABLE_USER, params)

  console.log('enable User ret -->', ret)

  return ret
}

// 删除用户
export const deleteUser = params => async dispatch => {
  let ret = await api.fetch(BUSINESS_DEL_USER, params)

  console.log('del User data -->', ret)

  return ret
}

// 编辑用户
export const editUser = params => async dispatch => {
  let ret = await api.fetch(BUSINESS_MODIFY_USER, params)

  console.log('edit User data -->', ret)

  return ret
}

// 用户详情
export const fetchUserDetail = params => async dispatch => {
  let ret = await api.fetch(BUSINESS_USER_DETAIL, params)

  console.log('fetch user detail -->', ret)

  return ret
}