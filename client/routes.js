import React from 'react'
import { Route, IndexRoute } from 'react-router'
import { AList, Home, LeftArea } from './containers'
import { connect } from 'react-redux'

const HomeApp = connect(state => {
  return {
    articles: state.articleReducer.articles,
    articleLen: state.articleReducer.allArticles.length
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

const ArticleSelectedApp = connect(
  (state) => {
    return {
      articles: state.articleReducer.allArticles,
      articleLen: state.articleReducer.allArticles.length
    };
  }
)(ArticleSelected);

const AlbumApp = connect(
  (state) => {
    return {
      albumData: state.articleReducer.albumData,
      boxDisplay: state.photoReducer.boxDisplay,
      device: state.photoReducer.device,
      url: state.photoReducer.url,
      index: state.photoReducer.index,
      count: state.photoReducer.count,
      desc: state.photoReducer.desc
    };
  }
)(Album);

const routes = (
  <Route path="/" component={LeftAreaApp}>
    <IndexRoute component={HomeApp} />
    <Route path="/albums" component={AlbumApp} />
    <Route path="/articles/:id" component={ArticleSelectedApp}></Route>
  </Route>
)

// const routes = [
//   {
//     path: '/',
//     component: HomeApp,
//     IndexRoute: {
//       component: HomeApp
//     }
//   },
//   {
//     path: '/albums',
//     component: AlbumApp
//   },
//   {
//     path: '/articles/:id',
//     component: ArticleSelectedApp
//   }
// ]

export default routes