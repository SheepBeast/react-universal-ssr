import React from 'react'
import { Route, IndexRoute } from 'react-router'
import { Home, LeftArea } from './containers'
import { connect } from 'react-redux'

const HomeApp = connect(state => {
  return {
    articles: state.articleReducer.articles,
    articleLen: 0
  }
})(Home)

const LeftAreaApp = connect(
  (state) => {
    return {
      articles: state.articleReducer.allArticles,
      tags: state.articleReducer.tags,
      tagToArticleArr: state.articleReducer.tagToArticleArr,
      musicData: state.articleReducer.musicData,
      moveAreaLeft: state.aboutReducer.moveAreaLeft,
      menuBackDisplay: state.aboutReducer.menuBackDisplay,
      focusKey: state.aboutReducer.focusKey,
      device: state.aboutReducer.device
    };
  }
)(LeftArea);

const routes = (
  <div>
    <Route exact path="/" component={LeftAreaApp} />
    <Route path="/home" component={HomeApp} />
  </div>
)

export default routes