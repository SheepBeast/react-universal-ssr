import React from 'react'
import { Route, IndexRoute } from 'react-router'
import { connect } from 'react-redux'

import { Home, HouseingResource, RoomDetail, Statistic } from '../containers'

const HomeApp = connect(state => {
  return {
    articles: state.articleReducer.articles,
    articleLen: 0
  }
})(Home)

const HouseingResourceApp = connect()(HouseingResource);

const RoomDetailApp = connect()(RoomDetail);

const StatisticApp = connect()(Statistic)

export default function getRoutes() {
  return (
    <div>
      <Route exact path="/" component={StatisticApp} />
      <Route path="/Statistic" component={StatisticApp} />
      <Route path="/HousingResource" component={HouseingResourceApp} />
      <Route path="/RoomDetail" component={RoomDetailApp} />
    </div>
  )
}