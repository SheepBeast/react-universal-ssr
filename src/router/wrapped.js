import React from 'react'

import {
  LoadableStatistics,
  LoadableHousingResource,
  LoadableRoomDetail,
  LoadableAddRenter,
  LoadableRelet,

  LoadableMyDevice,
  LoadableGateway,

  LoadableLock,
  LoadableLockDetail,

  LoadableStaff,
  LoadableAddStaff,
  LoadableEditStaff,
  LoadableRole,
  LoadableAddRole,
  LoadableLogin

} from './loadable'

class Statistics extends React.Component {
  render() {
    return <LoadableStatistics />
  }
}

class HousingResource extends React.Component {
  render() {
    return <LoadableHousingResource />
  }
}

class RoomDetail extends React.Component {
  render() {
    return <LoadableRoomDetail />
  }
}

class AddRenter extends React.Component {
  render() {
    return <LoadableAddRenter />
  }
}

class Relet extends React.Component {
  render() {
    return <LoadableRelet />
  }
}

class MyDevice extends React.Component {
  render() {
    return <LoadableMyDevice />
  }
}

class Gateway extends React.Component {
  render() {
    return <LoadableGateway />
  }
}

class Lock extends React.Component {
  render() {
    return <LoadableLock />
  }
}

class LockDetail extends React.Component {
  render() {
    return <LoadableLockDetail />
  }
}

class Staff extends React.Component {
  render() {
    return <LoadableStaff />
  }
}

class AddStaff extends React.Component {
  render() {
    return <LoadableAddStaff />
  }
}

class EditStaff extends React.Component {
  render() {
    return <LoadableEditStaff />
  }
}

class Role extends React.Component {
  render() {
    return <LoadableRole />
  }
}

class AddRole extends React.Component {
  render() {
    return <LoadableAddRole />
  }
}

class Login extends React.Component {
  render(){
    return <LoadableLogin />
  }
}

module.exports = {
  Statistics,
  HousingResource,
  RoomDetail,
  AddRenter,
  Relet,
  MyDevice,
  Gateway,
  Lock,
  LockDetail,
  Staff,
  AddStaff,
  EditStaff,
  Role,
  AddRole,
  Login
}