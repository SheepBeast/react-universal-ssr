import { api } from "../api";
import { BUSINESS_DEVICE_LIST, BUSINESS_LOCK_LIST, BUSINESS_LOCK_STATISTICS, BUSINESS_GATEWAY_LIST, BUSINESS_LOCK_DETAIL, BUSINESS_LOCK_KEY_LIST, BUSINESS_LOCK_APP_KEY_LIST, BUSINESS_UPDATE_lOCK_FUNCTION, BUSINESS_HOUSE_LIST, BUSINESS_LOCK_LOG_LIST, BUSINESS_DELETE_DEVICE, BUSINESS_GATEWAY_DELETE, BUSINESS_UNBIND_DEVICE, BUSINESS_RELEASE_ALARM, BUSINESS_DELETE_DIFF_TYPE_DEVICE } from "../constants/method-types";

// 设备列表
export const fetchDeviceList = params => async dispatch => {
  let ret = await api.fetch(BUSINESS_DEVICE_LIST, params)

  console.log('device list data -->', ret)

  return ret
}

// 门锁列表
export const fetchLockList = params => async dispatch => {
  let ret = await api.fetch(BUSINESS_LOCK_LIST, params)

  console.log('lock list data -->', ret)

  return ret
}

// 门锁详情
export const fetchLockDetail = params => async dispatch => {
  let ret = await api.fetch(BUSINESS_LOCK_DETAIL, params)

  console.log('lock detail data -->', ret)

  return ret
}

// 门锁在线离线统计
export const fetchLockStatistics = params => async dispatch => {
  let ret = await api.fetch(BUSINESS_LOCK_STATISTICS, params)

  console.log('lock statistics data -->', ret)

  return ret
}

// 网关列表
export const fetchGatewayList = params => async dispatch => {
  let ret = await api.fetch(BUSINESS_GATEWAY_LIST, params)

  console.log('gateway list data -->', ret)

  return ret
}

// 门锁钥匙列表
export const fetchLockKeyList = params => async dispatch => {
  let ret = await api.fetch(BUSINESS_LOCK_KEY_LIST, params)

  console.log('lock key list data -->', ret)

  return ret
}

// APP用户授权列表
export const fetchLockAppKeyList = params => async dispatch => {
  let ret = await api.fetch(BUSINESS_LOCK_APP_KEY_LIST, params)

  console.log('lock app key list data --> ', ret)

  return ret
}

// 高级功能设置
export const updateLockFunctionConfig = params => async dispatch => {
  let ret = await api.fetch(BUSINESS_UPDATE_lOCK_FUNCTION, params)

  console.log('update lock fucntion  ret -->', ret)

  return ret
}

// 门锁日志列表
export const fetchLockLogList = params => async dispatch => {
  let ret = await api.fetch(BUSINESS_LOCK_LOG_LIST, params)

  console.log('lock lock list log data --> ', ret)

  return ret
}

// 删除设备
export const deleteDevice = params => async dispatch => {
  let ret = await api.fetch(BUSINESS_DELETE_DEVICE, params)

  console.log('delete device  ret -->', ret)

  return ret
}

// 批量删除设备
export const batchDeleteDevice = params => async dispatch => {
  let ret = await api.fetch(BUSINESS_DELETE_DIFF_TYPE_DEVICE, params)

  console.log('batch delete device ret -->', ret)

  return ret
}

// 删除网关
export const deleteGateway = params => async dispatch => {
  let ret = await api.fetch(BUSINESS_GATEWAY_DELETE, params)

  console.log('delete gateway  ret -->', ret)

  return ret
}

// 关联设备 在actions/property.js roomAddDevice

// 解绑设备
export const unbindDevice = params => async dispatch => {
  let ret = await api.fetch(BUSINESS_UNBIND_DEVICE, params)

  console.log('unbind device ret -->', ret)

  return ret
}

// 解除报警
export const releaseAlarm = params => async dispatch => {
  let ret = await api.fetch(BUSINESS_RELEASE_ALARM, params)

  console.log('unbind device ret -->', ret)

  return ret
}
