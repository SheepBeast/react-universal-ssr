import React from 'react'
import { Route, IndexRoute } from 'react-router'
import { connect } from 'react-redux'

import {
  HouseingResource,
  RoomDetail,
  RoomDetailInfo, Relet,
  Statistic,
  MyDevice,
  Lock,
  LockDetail,
  Role,
  Auth,
  Staff,
  AddMessage,
  CheckMessage,
  AddRenter
} from '../containers'

// const HomeApp = connect(state => {
//   return {
//     articles: state.articleReducer.articles,
//     articleLen: 0
//   }
// })(Home)

const HouseingResourceApp = connect()(HouseingResource);

const AddRenterApp = connect()(AddRenter);

const RoomDetailApp = connect()(RoomDetail);

const StatisticApp = connect()(Statistic)

const ReletApp = connect()(Relet)

const RoomDetailInfoApp = connect()(RoomDetailInfo)

const MyDeviceApp = connect()(MyDevice)

const LockApp = connect()(Lock)

const LockDetailApp = connect()(LockDetail)

const RoleApp = connect()(Role)

const AuthApp = connect()(Auth)

const StaffApp = connect()(Staff)

const AddMessageApp = connect()(AddMessage)

const CheckMessageApp = connect()(CheckMessage)

export default function getRoutes() {
  return (
    <div>
      <Route exact path="/" component={StatisticApp} />
      <Route path="/Statistic" component={StatisticApp} />
      <Route path="/HousingResource" component={HouseingResourceApp} />
      <Route path="/RoomDetail" component={RoomDetailApp} />
      <Route path="/Relet" component={ReletApp} />
      <Route path="/RoomDetailInfo" component={RoomDetailInfoApp} />
      <Route path="/MyDevice" component={MyDeviceApp} />
      <Route path="/Lock" component={LockApp} />
      <Route path="/LockDetail" component={LockDetailApp} />
      <Route path="/Role" component={RoleApp} />
      <Route path="/Auth" component={AuthApp} />
      <Route path="/Staff" component={StaffApp} />
      <Route path="/AddMessage" component={AddMessageApp} />
      <Route path="/CheckMessage" component={CheckMessageApp} />
      <Route path="/AddRenter" component={AddRenterApp}></Route>
    </div>
  )
}