
import { BUSINESS_RENT_STATICSTICS, BUSINESS_DEVICE_STATICSTICS } from '../constants/method-types'

import { api } from '../api'

// 租客统计
export const fetchRentStatistics = params => async dispatch => {
  let ret = await api.fetch(BUSINESS_RENT_STATICSTICS, params)

  console.log('rent statistic -->', ret)

  return ret
}

// 设备统计
export const fetchDeviceStatistics = params => async dispatch => {
  let ret = await api.fetch(BUSINESS_DEVICE_STATICSTICS, params)

  console.log('device statistic -->', ret)

  return ret
}