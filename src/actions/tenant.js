import { SET_TENANT_LIST } from "../constants/action-types";
import { api } from "../api";
import { BUSINESS_TENANT_LIST } from "../constants/method-types";
import isRequestSuccess from "../utils/isRequestSuccess";

export const setTenantList = tenantListData => ({
  type: SET_TENANT_LIST,
  tenantListData
})

export const fetchTenantListData = params => async dispatch => {
  let ret = await api.fetch(BUSINESS_TENANT_LIST, params)

  console.log('tenant list data -->', ret)

  if (isRequestSuccess(ret)) {
    dispatch(setTenantList(ret.data.data.list))
  } else {
    console.log('fetch tenant list data error -->', ret)
  }
}