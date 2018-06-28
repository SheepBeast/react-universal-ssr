import { SET_USER_INFO, SET_TOKEN_ID, SET_COMMON_PAGE } from '../constants/action-types'

export const userInfo = (state = {}, action) => {
  console.log('user info -->', action.userInfo)
  switch (action.type) {
    case SET_USER_INFO:
      return action.userInfo || {}
    default:
      return state
  }
}

export const tokenID = (state = '', action) => {
  switch (action.type) {
    case SET_TOKEN_ID:
      return action.tokenID || ""
    default:
      return state
  }
}

export const page = (state = 'Login', action) => {
  console.log('reducer page -->', action)
  switch (action.type) {
    case SET_COMMON_PAGE:
      return action.page || 'Login'
    default:
      return state
  }
}