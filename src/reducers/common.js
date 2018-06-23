import { SET_USER_INFO, SET_TOKEN_ID} from '../constants/action-types'

export const userInfo = (state = {}, action) => {
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