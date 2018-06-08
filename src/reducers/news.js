import { SET_NEWS_LIST, SET_NEWS_DETAIL } from "../constants/action-types";

export const newsList = (state = [], action) => {
  switch (action.type) {
    case SET_NEWS_LIST:
      return action.newsListData || []
    default:
      return state
  }
}

export const newsDetail = (state = {}, action) => {
  switch(action.type) {
    case SET_NEWS_DETAIL:
      return action.newsDetailData || {}
    default:
      return state
  }
}