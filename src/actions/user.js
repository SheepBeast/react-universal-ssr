import {  SET_USER_LIST, SET_USER_DETAIL } from '../constants/action-types'

import { api } from '../api'
import { BUSINESS_USER_LIST, BUSINESS_ADD_USER, BUSINESS_ENABLE_USER, BUSINESS_DEL_USER, BUSINESS_MODIFY_USER, BUSINESS_USER_DETAIL } from '../constants/method-types';
import isRequestSuccess from '../utils/isRequestSuccess';

export const setUserListData = userListData => {
  return {
    type: SET_USER_LIST,
    userListData
  }
}

export const setUserDetail = userDetailData => {
  return {
    type: SET_USER_DETAIL,
    userDetailData
  }
}

export const fetchUserListData = params => async dispatch => {
  let ret = await api.fetch(BUSINESS_USER_LIST, params)

  console.log('user list ret -->', ret)

  if (isRequestSuccess(ret)) {
    dispatch(setUserListData(ret.data.data.list))
  } else {
    console.log('fetch user list data error -->', ret)
  }
}

export const addUserData = params => async dispatch => {
  let ret = await api.fetch(BUSINESS_ADD_USER, params, {url: '/local/user-add'})

  console.log('api -->', api)
  console.log('add user ret -->', ret)

  if (isRequestSuccess(ret)) {

  } else {
    console.log('add user data error -->', ret)
  }
}

export const enableUser = params => async dispatch => {
  let ret = await api.fetch(BUSINESS_ENABLE_USER, params)

  console.log('enable User ret -->', ret)

  if(isRequestSuccess(ret)){

  }else{
    console.log('enable User error -->', ret)
  }
}

export const deleteUserData = params => async dispatch => {
  let ret = await api.fetch(BUSINESS_DEL_USER, params)

  console.log('del User data -->', ret)

  if (isRequestSuccess(ret)) {
    // dispatch(delUser)
  } else {
    console.log('del User error -->', ret)
  }
}

export const editUserData = params  =>  async dispatch => {
  let ret = await api.fetch(BUSINESS_MODIFY_USER, params)

  console.log('edit User data -->', ret)

  if (isRequestSuccess(ret)) {
    // dispatch(editUser)
  } else {
    console.log('edit User error -->', ret)
  }
}

export const fetchUserDetailData = params => async dispatch => {
  let ret = await api.fetch(BUSINESS_USER_DETAIL, params)

  console.log('fetch user detail -->', ret)

  if (isRequestSuccess(ret)) {
    dispatch(setUserDetail(ret.data.data))
    return ret.data.data
  } else {
    console.log('edit User error -->', ret)
  }

  // return ret.data.data
}