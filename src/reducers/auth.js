import {
  SET_USER_INFO,
  SET_TOKEN_ID,
  ON_LOGIN_ERROR
} from '../constants/action-types'

import assign from '../utils/assign'

export const userInfo = (state = {}, action) => {
  switch (action.type) {
    case SET_USER_INFO:
      return action.userInfo
    default:
      return state
  }
}

export const tokenID = (state = '', action) => {
  switch (action.type) {
    case SET_TOKEN_ID:
      return action.tokenID
    default:
      return state
  }
}

export const onLoginError = (state = '', action) => {
  switch (action.type) {
    case ON_LOGIN_ERROR:
      return action.error
    default:
      return state
  }
}