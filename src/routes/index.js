import React from 'react'
import { Route, IndexRoute } from 'react-router'
import { connect } from 'react-redux'

import { Home, LeftArea, Statistic } from '../containers'

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

const StatisticApp = connect()(Statistic)

export default function getRoutes() {
  return (
    <div>
      <Route exact path="/" component={StatisticApp} />
      <Route path="/home" component={HomeApp} />
      <Route exact path="/Statistic" component={Statistic} />
    </div>
  )
}