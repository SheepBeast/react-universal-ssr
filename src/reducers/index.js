import { combineReducers } from 'redux'


import * as authReducers from './auth'

import * as statisticsReducers from './statistics'

import * as roleReducers from './role'

import * as userReducers from './user'

import * as deviceReducers from './device'

import * as propertyReducers from './property'

import * as newsReducers from './news'

import * as commonReducers from './common'

// import * as tenantReducers from './tenant'

export default combineReducers({
  ...authReducers,
  ...statisticsReducers,
  ...roleReducers,
  ...userReducers,
  ...deviceReducers,
  ...propertyReducers,
  ...newsReducers,
  ...commonReducers
  // ...tenantReducers
})