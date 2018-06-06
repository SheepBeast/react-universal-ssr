import { api } from "../api";
import { BUSINESS_DEVICE_LIST, BUSINESS_LOCK_LIST, BUSINESS_LOCK_STATISTICS, BUSINESS_GATEWAY_LIST, BUSINESS_LOCK_DETAIL, BUSINESS_LOCK_KEY_LIST } from "../constants/method-types";
import isRequestSuccess from "../utils/isRequestSuccess";
import { SET_DEVICE_LIST, SET_LOCK_LIST, SET_LOCK_STATISTICS, SET_GATEWAY_LIST, SET_LOCK_DETAIL, SET_LOCK_KEY_LIST } from "../constants/action-types";

export const setDeviceList = deviceListData => ({
  type: SET_DEVICE_LIST,
  deviceListData
})

export const setLockList = lockListData => ({
  type: SET_LOCK_LIST,
  lockListData
})

export const setLockDetail = lockDetailData => ({
  type: SET_LOCK_DETAIL,
  lockDetailData
})


export const setLockStatistics = lockStatisticsData => ({
  type: SET_LOCK_STATISTICS,
  lockStatisticsData
})

export const setGatewayList = gatewayListData => ({
  type: SET_GATEWAY_LIST,
  gatewayListData
})

export const setLockKeyList = lockKeyListData => ({
  type: SET_LOCK_KEY_LIST,
  lockKeyListData
})



export const fetchDeviceListData = params => async dispatch => {
  let ret = await api.fetch(BUSINESS_DEVICE_LIST, params)

  console.log('device list data -->', ret)

  if (isRequestSuccess(ret)) {
    dispatch(setDeviceList(ret.data.data.list))
  } else {
    console.log('fetch device list data error -->', ret)
  }
}

export const fetchLockListData = params => async dispatch => {
  let ret = await api.fetch(BUSINESS_LOCK_LIST, params)

  console.log('lock list data -->', ret)

  if (isRequestSuccess(ret)) {
    dispatch(setLockList(ret.data.data.list))
  } else {
    console.log('fetch lock list data error -->', ret)
  }
}

export const fetchLockDetailData = params => async dispatch => {
  let ret = await api.fetch(BUSINESS_LOCK_DETAIL, params)

  console.log('lock detail data -->', ret)

  if (isRequestSuccess(ret)) {
    dispatch(setLockDetail(ret.data.data.lockInfo))
  } else {
    console.log('fetch lock detail data error -->', ret)
  }
}



export const fetchLockStatisticsData = params => async dispatch => {
  let ret = await api.fetch(BUSINESS_LOCK_STATISTICS, params)

  console.log('lock statistics data -->', ret)

  if (isRequestSuccess(ret)) {
    dispatch(setLockStatistics(ret.data.data))

  } else {
    console.log('lock statistics error -->', ret)
  }
}

export const fetchGatewayListData = params => async dispatch => {
  let ret = await api.fetch(BUSINESS_GATEWAY_LIST, params)

  console.log('gateway list data -->', ret)

  if (isRequestSuccess(ret)) {
    dispatch(setGatewayList(ret.data.data.list))
  } else {
    console.log('fetch lock list data error -->', ret)
  }
}

export const fetchLockKeyListData = params => async dispatch => {
  let ret = await api.fetch(BUSINESS_LOCK_KEY_LIST, params)

  console.log('lock key list data -->', ret)

  if (isRequestSuccess(ret)) {
    dispatch(setLockKeyList(ret.data.data.list))
  } else {
    console.log('fetch lock key list data error -->', ret)
  }
}