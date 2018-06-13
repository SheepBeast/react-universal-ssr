import { api } from "../api";
import { APP_SMS_INFO, BUSSINESS_REGISTER, BUSINESS_WEB_LOGIN, BUSINESS_FORGET_PASSWORD } from "../constants/method-types";
import { SET_USER_INFO, SET_TOKEN_ID, ON_LOGIN_ERROR } from '../constants/action-types'
import isRequestSuccess from "../utils/isRequestSuccess";

export const fetchCaptchaData = params => async dispatch => {
  let ret = await api.fetch(APP_SMS_INFO, params)

  console.log('fetch vcode -->', ret)

  if (isRequestSuccess(ret)) {

  } else {
    console.log('fetch vcode error -->', ret)
  }

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

  if (isRequestSuccess(ret)) {

    const { businessUserInfo, tokenId } = ret.data.data


    dispatch(setUserInfo(businessUserInfo))
    dispatch(setTokenID(tokenId))

    api.tokenId = tokenId

  } else {

    const { reason } = ret.data

    console.log('reason -->', reason)

    dispatch(onLoginError(reason))
  }

  return ret

}

export const register = params => async dispatch => {
  let ret = await api.fetch(BUSSINESS_REGISTER, params, { url: '/local/register' })

  console.log('register ret -->', ret)

  if (isRequestSuccess(ret)) {

  } else {
    console.log('register error -->', ret)
  }

  return ret
}


export const forgetPassword = params => async dispatch => {
  let ret = await api.fetch(BUSINESS_FORGET_PASSWORD, params, {url : '/local/forget-password'})

  console.log('forget password ret -->', ret)

  if(isRequestSuccess(ret)){

  }
  else {
    console.log('forget password error -->', ret)

  }

  return ret
}