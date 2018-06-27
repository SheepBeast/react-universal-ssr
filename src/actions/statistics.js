
import { BUSINESS_RENT_STATICSTICS, BUSINESS_DEVICE_STATICSTICS, BUSINESS_DYNAMIC_INFO_LIST, BUSINESS_TENANT_STATICSTICS } from '../constants/method-types'

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

// 租客统计
export const fetchTenantStatistics = params => async dispatch => {
  let ret = await api.fetch(BUSINESS_TENANT_STATICSTICS, params)

  console.log('tenant statistic -->', ret)

  return ret
}

// 动态消息
export const fetchDynamicInfoList = params => async dispatch => {
  let ret = await api.fetch(BUSINESS_DYNAMIC_INFO_LIST, params)

  console.log('dynamic info list ret -->', ret)

  return ret
}