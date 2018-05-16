// @flow


import base from './base'
import { BUSINESS_ROOM_ADD_DEVICE } from '../method-types'
import createApiOptions from '../../utils/createApiOptions'

type format = {
  buildingId?: string,
  floorId?: string,
  roomId?: string,
  deviceType: 0 | 1 | 2 | 3 | 4 | 5
}

export default (data: format, tokenId: string): Promise => base(createApiOptions(BUSINESS_ROOM_ADD_DEVICE, data, tokenId))