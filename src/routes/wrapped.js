import React from 'react'

import {
  LoadableStatistic,
  LoadableHousingResource,
  LoadableRoomDetail,
  LoadableAddRenter
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

module.exports = {
  Statistic,
  HousingResource,
  RoomDetail,
  AddRenter
}