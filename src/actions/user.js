import {  SET_USER_LIST } from '../constants/action-types'

import { api } from '../api'
import { BUSINESS_USER_LIST, BUSINESS_ADD_USER, BUSINESS_ENABLE_USER, BUSINESS_DEL_USER } from '../constants/method-types';
import isRequestSuccess from '../utils/isRequestSuccess';

export const setUserListData = userListData => {
  return {
    type: SET_USER_LIST,
    userListData
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
  let ret = await api.fetch(BUSINESS_ADD_USER, params)

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