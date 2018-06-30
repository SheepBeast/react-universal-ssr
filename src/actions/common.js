import { api } from "../api";
import { APP_SMS_INFO, BUSSINESS_REGISTER, BUSINESS_WEB_LOGIN, BUSINESS_FORGET_PASSWORD, BUSINESS_PROVINCE_CITIES_AREAS_LIST, BUSINESS_LOGOUT } from "../constants/method-types";
import { SET_USER_INFO, SET_TOKEN_ID, ON_LOGIN_ERROR, SET_COMMON_PAGE, TRANSFORM_SIDEBAR_ROLES_REFER, TRANSFORM_PAGE_ROLES_REFER } from '../constants/action-types'
import isRequestSuccess from "../utils/isRequestSuccess";

export const fetchCaptcha = params => async dispatch => {
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

export const setCommonPage = page => ({
  type: SET_COMMON_PAGE,
  page
})

export const transformSidebarRolesToRefer = roles => ({
  type: TRANSFORM_SIDEBAR_ROLES_REFER,
  roles
})

export const transformPageRolesToRefer = roles => ({
  type: TRANSFORM_PAGE_ROLES_REFER,
  roles
})

// 登陆
export const login = params => async dispatch => {
  let ret = await api.fetch(BUSINESS_WEB_LOGIN, params, { url: '/local/login' })

  console.log('login ret -->', ret)

  var { businessUserInfo, tokenId } = isRequestSuccess(ret) && ret.data.data || {}
  var { actions = [] } = businessUserInfo

  api.tokenId = tokenId

  dispatch(setUserInfo(businessUserInfo))
  dispatch(setTokenID(tokenId))
  dispatch(transformSidebarRolesToRefer(actions))
  dispatch(transformPageRolesToRefer(actions))

  return ret
}

// 退出登陆
export const logout = params => async dispatch => {
  let ret = await api.fetch(BUSINESS_LOGOUT, params)

  console.log('log out ret -->', ret)

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
