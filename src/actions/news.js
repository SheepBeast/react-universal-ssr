import { api } from "../api";
import { BUSINESS_NEWS_LIST, BUSINESS_ADD_NEWS, BUSINESS_AUDIT_NEWS, BUSINESS_NEWS_DETAIL, BUSINESS_DEL_NEWS, BUSINESS_SEND_NEWS, BUSINESS_SUBMIT_NEWS, BUSINESS_UPDATE_NEWS } from "../constants/method-types";

// 消息列表
export const fetchNewsList = params => async dispatch => {
  let ret = await api.fetch(BUSINESS_NEWS_LIST, params)

  console.log('News list data -->', ret)

  return ret
}

// 添加消息
export const addNews = params => async dispatch => {
  let ret = await api.fetch(BUSINESS_ADD_NEWS, params)

  console.log('add news data -->', ret)

  return ret
}

// 审核消息
export const auditNews = params => async dispatch => {
  let ret = await api.fetch(BUSINESS_AUDIT_NEWS, params)

  console.log('audit news data -->', ret)

  return ret
}

// 消息详情
export const fetchNewsDetail = params => async dispatch => {
  let ret = await api.fetch(BUSINESS_NEWS_DETAIL, params)

  console.log('news detail data -->', ret)

  return ret
}

// 删除消息
export const deleteNews = params => async dispatch => {
  let ret = await api.fetch(BUSINESS_DEL_NEWS, params)

  console.log('del news  -->', ret)

  return ret
}

// 发送消息
export const sendNews = params => async dispatch => {
  let ret = await api.fetch(BUSINESS_SEND_NEWS, params)

  console.log('send news  -->', ret)

  return ret
}

// 提审消息
export const submitNews = params => async dispatch => {
  let ret = await api.fetch(BUSINESS_SUBMIT_NEWS, params)

  console.log('submit news  -->', ret)

  return ret
}

// 提审消息
export const editNews = params => async dispatch => {
  let ret = await api.fetch(BUSINESS_UPDATE_NEWS, params)

  console.log('edit news  -->', ret)

  return ret
}