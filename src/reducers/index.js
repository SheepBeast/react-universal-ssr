import { combineReducers } from 'redux'


import { userInfo, tokenID, onLoginError } from './auth'
import { rentStatisticsData, deviceStatisticsData } from './statistics'

export default combineReducers({
  userInfo,
  tokenID,
  onLoginError,

  rentStatisticsData,
  deviceStatisticsData
})