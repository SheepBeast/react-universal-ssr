// @flow


import base from './base'
import { BUSINESS_DEVICE_LIST } from '../method-types'
import createApiOptions from '../../utils/createApiOptions'

type format = {
  state?: 0 | 1,
  deviceType?: 0 | 1 | 2 | 3 | 4 | 5,
  mac?: string,
  roomName?: string,
  startNum?: number,
  getNum?: number
}

export default (data: format, tokenId: string): Promise => base(createApiOptions(BUSINESS_DEVICE_LIST, data, tokenId))