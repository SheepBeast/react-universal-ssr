import React from 'react'
import { Route, IndexRoute } from 'react-router'
import { connect } from 'react-redux'

import { Home, HouseingResource, RoomDetail, RoomDetailInfo ,Relet, Statistic, MyDevice, Lock } from '../containers'

const HomeApp = connect(state => {
  return {
    articles: state.articleReducer.articles,
    articleLen: 0
  }
})(Home)

const HouseingResourceApp = connect()(HouseingResource);

const RoomDetailApp = connect()(RoomDetail);

const StatisticApp = connect()(Statistic)

const ReletApp = connect()(Relet)

const RoomDetailInfoApp = connect()(RoomDetailInfo)

const MyDeviceApp = connect()(MyDevice)

const LockApp = connect()(Lock)

export default function getRoutes() {
  return (
    <div>
      <Route exact path="/" component={StatisticApp} />
      <Route path="/Statistic" component={StatisticApp} />
      <Route exact path="/HousingResource" component={HouseingResourceApp} />
      <Route exact path="/RoomDetail" component={RoomDetailApp} />
      <Route exact path="/Relet" component={ReletApp} />
      <Route exact path="/RoomDetailInfo" component={RoomDetailInfoApp} />
      <Route exact path="/MyDevice" component={MyDeviceApp} />
      <Route exact path="/Lock" component={LockApp} />
    </div>
  )
}