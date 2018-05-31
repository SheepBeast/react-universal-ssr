import React from 'react'
import { Route } from 'react-router'
import Loadable from 'react-loadable'

import {
  Statistic,
  HousingResource,
  RoomDetail,
  AddRenter
} from './wrapped'


export default function getRoutes() {
  return (
    <div>
      <Route path="/" component={AddRenter} exact />

      <Route path="/Statistic" component={Statistic} />

      <Route path="/HousingResource" component={HousingResource} exact />
      <Route path="/HousingResource/RoomDetail" component={RoomDetail} />
      <Route path="/HousingResource/AddRenter" component={AddRenter} />
    </div>
  )
}