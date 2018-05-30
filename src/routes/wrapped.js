import React, { Component } from 'react'

import {
  LoadableStatistic,
  LoadableHousingResource
} from './loadable'

class Statistic extends Component {
  render() {
    return <LoadableStatistic {...this.props} />
  }
}

class HousingResource extends Component {
  render() {
    return <LoadableHousingResource {...this.props} />
  }
}

module.exports = {
  Statistic,
  HousingResource
}