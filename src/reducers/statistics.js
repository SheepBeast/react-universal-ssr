import {
  SET_RENT_STATICSTICS,
  SET_DEVICE_STATICSTICS
} from '../constants/action-types'
import assign from '../utils/assign';

export const rentStatistics = (state = {}, action) => {
  switch (action.type) {
    case SET_RENT_STATICSTICS:
      return action.rentStatisticsData || {}
    default:
      return state
  }

}

export const deviceStatistics = (state = {}, action) => {
  switch (action.type) {
    case SET_DEVICE_STATICSTICS:
      return action.deviceStatisticsData || {}
    default:
      return state
  }
}