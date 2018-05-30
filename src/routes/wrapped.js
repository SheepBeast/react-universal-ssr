import React from 'react'

import {
  LoadableStatistic,
  LoadableHousingResource
} from './loadable'

class Statistic extends React.Component {
  render() {
    return <LoadableStatistic />
  }
}

class HousingResource extends React.Component {
  render() {
    return <LoadableHousingResource />
  }
}

module.exports = {
  Statistic,
  HousingResource
}