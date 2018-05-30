import React from 'react'
import { Route, IndexRoute } from 'react-router'
import { connect } from 'react-redux'

// const Home = connect(state => {
//   return {
//     articles: state.articleReducer.articles,
//     articleLen: 0
//   }
// })(Home)

import {
  Statistic,
  HousingResource
} from './wrapped'

export default function getRoutes() {
  return (
    <div>
      <Route exact path="/" component={Statistic} />
      <Route path="/Statistic" component={Statistic} />
      <Route path="/HousingResource" component={HousingResource} />
    </div>
  )
}