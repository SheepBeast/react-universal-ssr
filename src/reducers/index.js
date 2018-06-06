import { combineReducers } from 'redux'


import * as authReducers from './auth'
import * as statisticsReducers from './statistics'

import * as roleReducers from './role'

import * as staffReducers from './staff'

// import { deviceList, lockList, lockStatistics, gatewayList, lockDetail, lockKeyList } from './device'
import * as deviceReducers from './device'

export default combineReducers({
  ...authReducers,
  ...statisticsReducers,
  ...roleReducers,
  ...staffReducers,
  ...deviceReducers
})