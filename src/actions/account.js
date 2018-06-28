import { api } from "../api";
import { BUSINESS_UPDATE_USER_INFO, BUSINESS_UPDATE_BIND_PHONE } from "../constants/method-types";

export const updateUserInfo = params => async dispatch => {
  let ret = await api.fetch(BUSINESS_UPDATE_USER_INFO, params)

  console.log('update user info ret -->', ret)

  return ret
}

export const validateMobile = params => async dispatch => {
  let ret = await api.fetch(BUSINESS_UPDATE_BIND_PHONE, params)

  console.log('update bind phone ret -->', ret)

  return ret
}