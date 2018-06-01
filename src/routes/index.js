import React from 'react'
import { Route } from 'react-router'
import Loadable from 'react-loadable'

import {
  Statistic,
  HousingResource,
  RoomDetail,
  AddRenter,
  Relet,
  GatewayManagement,
  MyDevice,
  Lock
} from './wrapped'

export default function getRoutes() {
  return (
    <div>
      <Route path="/" component={Lock} exact />

      <Route path="/Statistic" component={Statistic} />

      <Route path="/HousingResource" component={HousingResource} exact />
      <Route path="/HousingResource/RoomDetail" component={RoomDetail} />
      <Route path="/HousingResource/AddRenter" component={AddRenter} />
      <Route path="/HousingResource/Relet" component={Relet} />

      <Route path="/Device/MyDevice" component={MyDevice} />
      <Route path="/Device/GatewayManagement" component={GatewayManagement} />
      <Route path="/Device/Lock" component={Lock} />
    </div>
  )
}