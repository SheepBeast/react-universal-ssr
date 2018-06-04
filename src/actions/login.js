import { BUSINESS_WEB_LOGIN } from '../constants/method-types'

import {
  SET_USER_INFO,
  SET_TOKEN_ID,
  ON_LOGIN_ERROR,
} from '../constants/action-types'


import { api } from '../api';
import isRequestSuccess from '../utils/isRequestSuccess';

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
}