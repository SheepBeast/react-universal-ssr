import { SET_USER_INFO, SET_TOKEN_ID, SET_COMMON_PAGE, TRANSFORM_SIDEBAR_ROLES_REFER, TRANSFORM_PAGE_ROLES_REFER } from '../constants/action-types'

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
  switch (action.type) {
    case SET_COMMON_PAGE:
      return action.page || 'Login'
    default:
      return state
  }
}

export const sideBarRolesRefer = (state = {}, action) => {
  switch (action.type) {
    case TRANSFORM_SIDEBAR_ROLES_REFER:
      var roles = action.roles || [], refer = {}

      for (var i = 0, l = roles.length; i < l; i++) {
        var { actionId, actionName, actionStr } = roles[i]
        refer[actionStr] = { actionId, actionName }
      }

      console.log('sidebar refers -->', refer)

      return refer

    default:
      return state
  }
}

export const pageRolesRefer = (state = {}, action) => {
  switch (action.type) {
    case TRANSFORM_PAGE_ROLES_REFER:
      var roles = action.roles || [], refer = {}

      for (var i = 0, l = roles.length; i < l; i++) {
        var { lowerActions } = roles[i]

        if (lowerActions) {
          for (var j = 0, m = lowerActions.length; j < m; j++) {
            var { actionId, actionName, actionStr } = lowerActions[j]

            refer[actionStr] = { actionId, actionName }
          }
        }
      }

      console.log('page refers -->', refer)

      return refer

    default:
      return state
  }
}