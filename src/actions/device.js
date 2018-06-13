import { api } from "../api";
import { BUSINESS_DEVICE_LIST, BUSINESS_LOCK_LIST, BUSINESS_LOCK_STATISTICS, BUSINESS_GATEWAY_LIST, BUSINESS_LOCK_DETAIL, BUSINESS_LOCK_KEY_LIST, BUSINESS_LOCK_APP_KEY_LIST, BUSINESS_UPDATE_lOCK_FUNCTION, BUSINESS_HOUSE_LIST, BUSINESS_LOCK_LOG_LIST, BUSINESS_DELETE_DEVICE, BUSINESS_GATEWAY_DELETE } from "../constants/method-types";
import isRequestSuccess from "../utils/isRequestSuccess";
import { SET_DEVICE_LIST, SET_LOCK_LIST, SET_LOCK_STATISTICS, SET_GATEWAY_LIST, SET_LOCK_DETAIL, SET_LOCK_KEY_LIST, SET_LOCK_APP_KEY_LIST, SET_HOUSE_LIST, SET_LOCK_LOG_LIST } from "../constants/action-types";

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

export const setLockAppKeyList = lockAppKeyListData => ({
  type: SET_LOCK_APP_KEY_LIST,
  lockAppKeyListData
})

export const setLockLogList = lockLogListData => ({
  type: SET_LOCK_LOG_LIST,
  lockLogListData
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

export const fetchLockAppKeyListData = params => async dispatch => {
  let ret = await api.fetch(BUSINESS_LOCK_APP_KEY_LIST, params)

  console.log('lock app key list data --> ', ret)

  if (isRequestSuccess(ret)) {
    dispatch(setLockAppKeyList(ret.data.data.list))
  } else {
    console.log('fetch lock app key list error -->', ret)
  }
}

export const updateLockFunctionConfig = params => async dispatch => {
  let ret = await api.fetch(BUSINESS_UPDATE_lOCK_FUNCTION, params)

  console.log('update lock fucntion  ret -->', ret)

  if (isRequestSuccess(ret)) {

  } else {
    console.log('update lock function  error -->', ret)
  }
}

export const fetchLockLogListData = params => async dispatch => {
  let ret = await api.fetch(BUSINESS_LOCK_LOG_LIST, params)

  console.log('lock lock list log data --> ', ret)

  if (isRequestSuccess(ret)) {
    dispatch(setLockLogList(ret.data.data.doorLockLog))
  } else {
    console.log('fetch lock lock list log error -->', ret)
  }
}

export const deleteDevice = params => async dispatch => {
  let ret = await api.fetch(BUSINESS_DELETE_DEVICE, params)

  console.log('delete device  ret -->', ret)

  if (isRequestSuccess(ret)) {

  } else {
    console.log('delete device   error -->', ret)
  }
}

export const deleteGateway = params => async dispatch => {
  let ret = await api.fetch(BUSINESS_GATEWAY_DELETE, params)

  console.log('delete gateway  ret -->', ret)

  if (isRequestSuccess(ret)) {

  } else {
    console.log('delete gateway   error -->', ret)
  }
}