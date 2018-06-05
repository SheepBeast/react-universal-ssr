import {SET_STAFF_LIST} from '../constants/action-types'

import {api} from '../api'
import { BUSINESS_USER_LIST } from '../constants/method-types';
import isRequestSuccess from '../utils/isRequestSuccess';

export const setStaffList = staffListData => {
  return {
    type: SET_STAFF_LIST,
    staffListData
  }
}

export const fetchStaffListData = params => async dispatch => {
  let ret = await api.fetch(BUSINESS_USER_LIST, params)

  console.log('user list ret -->', ret)

  if(isRequestSuccess(ret)){
    dispatch(setStaffList(ret.data.data))
  }
}