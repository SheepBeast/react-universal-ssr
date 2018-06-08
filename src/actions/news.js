import { SET_NEWS_LIST, SET_NEWS_DETAIL } from "../constants/action-types";
import { api } from "../api";
import { BUSINESS_NEWS_LIST, BUSINESS_ADD_NEWS, BUSINESS_AUDIT_NEWS, BUSINESS_NEWS_DETAIL } from "../constants/method-types";
import isRequestSuccess from "../utils/isRequestSuccess";

export const setNewsList = newsListData => ({
  type: SET_NEWS_LIST,
  newsListData
})

export const setNewsDetail = newsDetailData => ({
  type: SET_NEWS_DETAIL,
  newsDetailData
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

export const fetchNewsDetailData = params => async dispatch => {
  let ret = await api.fetch(BUSINESS_NEWS_DETAIL, params)

  console.log('news detail data -->', ret)

  if(isRequestSuccess(ret)) {
    dispatch(setNewsDetail(ret.data.data))
  }else {
    console.log('fetch news detail data error -->', ret)
  }
}