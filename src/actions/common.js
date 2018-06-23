import { api } from "../api";
import { APP_SMS_INFO, BUSSINESS_REGISTER, BUSINESS_WEB_LOGIN, BUSINESS_FORGET_PASSWORD, BUSINESS_PROVINCE_CITIES_AREAS_LIST } from "../constants/method-types";
import { SET_USER_INFO, SET_TOKEN_ID, ON_LOGIN_ERROR } from '../constants/action-types'
import isRequestSuccess from "../utils/isRequestSuccess";

export const fetchCaptchaData = params => async dispatch => {
  let ret = await api.fetch(APP_SMS_INFO, params)

  console.log('fetch vcode -->', ret)

  return ret
}


// 设置用户信息
export const setUserInfo = userInfo => {
  return {
    type: SET_USER_INFO,
    userInfo
  }
}


// 设置tokenID
export const setTokenID = tokenID => ({
  type: SET_TOKEN_ID,
  tokenID
})

export const onLoginError = error => {
  return {
    type: ON_LOGIN_ERROR,
    error
  }
}


// 登陆
export const login = params => async dispatch => {
  let ret = await api.fetch(BUSINESS_WEB_LOGIN, params, { url: '/local/login' })

  console.log('login ret -->', ret)

  return ret

}

// 注册
export const register = params => async dispatch => {
  let ret = await api.fetch(BUSSINESS_REGISTER, params, { url: '/local/register' })

  console.log('register ret -->', ret)

  return ret
}

// 忘记密码
export const forgetPassword = params => async dispatch => {
  let ret = await api.fetch(BUSINESS_FORGET_PASSWORD, params, { url: '/local/forget-password' })

  console.log('forget password ret -->', ret)

  return ret
}

// 地区列表
export const fetchDistrictList = params => async dispatch => {
  let ret = await api.fetch(BUSINESS_PROVINCE_CITIES_AREAS_LIST, params)

  console.log('fetch district ret -->', ret)

  return ret
}