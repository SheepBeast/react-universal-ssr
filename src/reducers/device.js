import { SET_DEVICE_LIST, SET_LOCK_LIST, SET_LOCK_STATISTICS, SET_GATEWAY_LIST, SET_LOCK_DETAIL, SET_LOCK_KEY_LIST } from "../constants/action-types";

export const deviceList = (state = [], action) => {
  switch (action.type) {
    case SET_DEVICE_LIST:
      return action.deviceListData || []
    default:
      return state
  }
}

export const lockList = (state = [], action) => {
  switch (action.type) {
    case SET_LOCK_LIST:
      return action.lockListData || []
    default:
      return state
  }
}

export const lockDetail = (state = {}, action) => {
  switch (action.type) {
    case SET_LOCK_DETAIL:
      return action.lockDetailData || {}
    default:
      return state
  }
}

export const lockStatistics = (state = {}, action) => {
  switch (action.type) {
    case SET_LOCK_STATISTICS:
      return action.lockStatisticsData || {}
    default:
      return state
  }
}

export const gatewayList = (state = [], action) => {
  switch (action.type) {
    case SET_GATEWAY_LIST:
      return action.gatewayListData || []
    default:
      return state
  }
}

export const lockKeyList = (state = [], action) => {
  switch (action.type) {
    case SET_LOCK_KEY_LIST:
      return action.lockKeyListData || []
    default:
      return state
  }
}