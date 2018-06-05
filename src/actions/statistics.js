
import {
  BUSINESS_RENT_STATICSTICS,
  BUSINESS_DEVICE_STATICSTICS

} from '../constants/method-types'

import {
  SET_RENT_STATICSTICS,
  SET_DEVICE_STATICSTICS
} from '../constants/action-types'

import { api } from '../api'

import isRequestSuccess from '../utils/isRequestSuccess'

export const setRentStatistics = rentStatisticsData => ({
  type: SET_RENT_STATICSTICS,
  rentStatisticsData
})

export const setDeviceStatistics = deviceStatisticsData => ({
  type: SET_DEVICE_STATICSTICS,
  deviceStatisticsData
})

export const fetchRentStatisticsData = params => async dispatch => {
  let ret = await api.fetch(BUSINESS_RENT_STATICSTICS, params)

  console.log('rent statistic -->', ret)

  if (isRequestSuccess(ret)) {
    dispatch(setRentStatistics(ret.data.data))
  }
  // else
}

export const fetchDeviceStatisticsData = params => async dispatch => {
  let ret = await api.fetch(BUSINESS_DEVICE_STATICSTICS, params)

  console.log('device statistic -->', ret)

  if (isRequestSuccess(ret)) {
    dispatch(setDeviceStatistics(ret.data.data))
  }
  // else
}