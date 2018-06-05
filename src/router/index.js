import React from 'react'
import { Route } from 'react-router-dom'
import Loadable from 'react-loadable'

import {
  Statistics,
  // HousingResource,
  // RoomDetail,
  // AddRenter,
  // Relet,
  // GatewayManagement,
  // MyDevice,
  // Lock,
  // LockDetail,
  Staff,
  // AddStaff,
  // EditStaff,
  // Role,
  // AddRole
} from './wrapped'

export default function getRoutes() {
    return (
        <div>
          <Route path="/" component={Staff} exact />

          <Route path="/statistics" component={Statistics} />

          {/* <Route path="/HousingResource" component={HousingResource} exact />
    <Route path="/HousingResource/RoomDetail" component={RoomDetail} />
    <Route path="/HousingResource/AddRenter" component={AddRenter} />
    <Route path="/HousingResource/Relet" component={Relet} />

    <Route path="/Device/MyDevice" component={MyDevice} />
    <Route path="/Device/GatewayManagement" component={GatewayManagement} />
    <Route path="/Device/Lock" component={Lock} />
    <Route path="/Device/LockDetail" component={LockDetail} />

    <Route path="/User/Staff" component={Staff} />
    <Route path="/User/AddStaff" component={AddStaff} />
    <Route path="/User/EditStaff" component={EditStaff} />
    <Route path="/User/Role" component={Role} />
    <Route path="/User/AddRole" component={AddRole} /> */}
        </div>

    )
}