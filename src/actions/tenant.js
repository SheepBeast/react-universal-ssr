import { api } from "../api";
import { BUSINESS_TENANT_LIST, BUSINESS_ADD_TENANT, BUSINESS_TENANT_RENEW_ROOM, BUSINESS_TENANT_DETAIL, BUSINESS_DEL_TENANT, BUSINESS_TENANT_CHANGE_ROOM } from "../constants/method-types";

// 租客列表
export const fetchTenantList = params => async dispatch => {
  let ret = await api.fetch(BUSINESS_TENANT_LIST, params)

  console.log('tenant list data -->', ret)

  return ret
}

// 添加租客
export const addTenant = params => async dispatch => {
  let ret = await api.fetch(BUSINESS_ADD_TENANT, params)

  console.log('add tenant ret -->', ret)

  return ret
}

// 租客详情
export const fetchTenantDetail = params => async dispatch => {
  let ret = await api.fetch(BUSINESS_TENANT_DETAIL, params)

  console.log(' tenant detial ret -->', ret)

  return ret
}

// 续租
export const updateTenancy = params => async dispatch => {
  let ret = await api.fetch(BUSINESS_TENANT_RENEW_ROOM, params)

  console.log('update tenant ret -->', ret)

  return ret
}

// 删除租客
export const delTenant = params => async dispatch => {
  let ret = await api.fetch(BUSINESS_DEL_TENANT, params)

  console.log('del tenant ret -->', ret)

  return ret
}

// 换房
export const tenantChangeRoom = params => async dispatch => {
  let ret = await api.fetch(BUSINESS_TENANT_CHANGE_ROOM, params)

  console.log('change tenant room ret -->', ret)

  return ret
}