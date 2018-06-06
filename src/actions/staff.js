import { SET_STAFF_LIST } from '../constants/action-types'

import { api } from '../api'
import { BUSINESS_USER_LIST, BUSINESS_ADD_USER } from '../constants/method-types';
import isRequestSuccess from '../utils/isRequestSuccess';

export const setStaffListData = staffListData => {
  return {
    type: SET_STAFF_LIST,
    staffListData
  }
}

export const fetchStaffListData = params => async dispatch => {
  let ret = await api.fetch(BUSINESS_USER_LIST, params)

  console.log('user list ret -->', ret)

  if (isRequestSuccess(ret)) {
    dispatch(setStaffListData(ret.data.data.list))
  } else {
    console.log('fetch staff list data error -->', ret)
  }
}

export const addStaffData = params => async dispatch => {
  let ret = await api.fetch(BUSINESS_ADD_USER, params)

  console.log('add user ret -->', ret)

  if (isRequestSuccess(ret)) {

  } else {
    console.log('add staff data error -->', ret)
  }
}