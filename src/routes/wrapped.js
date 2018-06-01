import React from 'react'

import {
  LoadableStatistic,
  LoadableHousingResource,
  LoadableRoomDetail,
  LoadableAddRenter,
  LoadableRelet,

  LoadableMyDevice,
  LoadableGatewayManagement,

  LoadableLock

} from './loadable'

class Statistic extends React.Component {
  render() {
    return <LoadableStatistic />
  }
}

class HousingResource extends React.Component {
  render(){
    return <LoadableHousingResource />
  }
}

class RoomDetail extends React.Component {
  render(){
    return <LoadableRoomDetail />
  }
}

class AddRenter extends React.Component {
  render(){
    return <LoadableAddRenter />
  }
}

class Relet extends React.Component {
  render(){
    return <LoadableRelet />
  }
}

class MyDevice extends React.Component {
  render(){
    return <LoadableMyDevice />
  }
}

class GatewayManagement extends React.Component {
  render(){
    return <LoadableGatewayManagement />
  }
}

class Lock extends React.Component {
  render(){
    return <LoadableLock />
  }
}

module.exports = {
  Statistic,
  HousingResource,
  RoomDetail,
  AddRenter,
  Relet,
  MyDevice,
  GatewayManagement,
  Lock
}