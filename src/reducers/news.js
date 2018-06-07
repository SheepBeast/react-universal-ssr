import { SET_NEWS_LIST } from "../constants/action-types";

export const newsList = (state = [], action) => {
  switch (action.type) {
    case SET_NEWS_LIST:
      return action.newsListData || []
    default:
      return state
  }
}