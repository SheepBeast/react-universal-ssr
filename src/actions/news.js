import { SET_NEWS_LIST } from "../constants/action-types";
import { api } from "../api";
import { BUSINESS_NEWS_LIST, BUSINESS_ADD_NEWS, BUSINESS_AUDIT_NEWS } from "../constants/method-types";
import isRequestSuccess from "../utils/isRequestSuccess";

export const setNewsList = newsListData => ({
  type: SET_NEWS_LIST,
  newsListData
})

export const fetchNewsListData = params => async dispatch => {
  let ret = await api.fetch(BUSINESS_NEWS_LIST, params)

  console.log('News list data -->', ret)

  if (isRequestSuccess(ret)) {
    dispatch(setNewsList(ret.data.data.list))

  } else {
    console.log('fetch News list error -->', ret)
  }
}

export const addNewsData = params => async dispatch => {
  let ret = await api.fetch(BUSINESS_ADD_NEWS, params)

  console.log('add news data -->', ret)

  if (isRequestSuccess(ret)) {

  } else {
    console.log('fetch News list error -->', ret)
  }
}

export const auditNewsData = params => async dispatch => {
  let ret = await api.fetch(BUSINESS_AUDIT_NEWS, params)

  console.log('audit news data -->', ret)

  if (isRequestSuccess(ret)) {

  } else {
    console.log('audit news data error -->', ret)
  }
}