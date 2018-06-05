import { combineReducers } from 'redux'


import { userInfo, tokenID, onLoginError } from './auth'
import { rentStatisticsData, deviceStatisticsData } from './statistics'

import { roleList, menuPermissionList } from './role'

import { staffList } from './staff'

export default combineReducers({
  userInfo,
  tokenID,
  onLoginError,

  rentStatisticsData,
  deviceStatisticsData,

  roleList,
  menuPermissionList,

  staffList
})