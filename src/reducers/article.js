import { LOADING, LOAD_THIS_PAGE, LOAD_TAG_TO_ARTICLE } from '../constants/action-types'

const articleReducer = (state = {}, action) => {
  switch (action.type) {
    case LOADING:
      var tags = Object.keys(action.data.tagToActicle)
      return Object.assign({}, tags, action.data)

    case LOAD_THIS_PAGE:
      return state

    case LOAD_TAG_TO_ARTICLE:
      var articleNumArr = state.tagToArticle[action.tag];
      var articleArr = [];
      for (var i = 0; i < articleNumArr.length; i++) {
        articleArr.push(state.allArticles[state.allArticles.length - articleNumArr[i]]);
      }
      return Object.assign({}, state, articleNumArr, articleArr)
      
    default:
      return state
  }
}

export {
  articleReducer
}