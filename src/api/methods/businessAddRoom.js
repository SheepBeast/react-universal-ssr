// @flow


import base from './base'
import { BUSINESS_ADD_ROOM } from '../../constants/method-types'
import createApiOptions from '../../utils/createApiOptions'

type format = {
  floorId: string,
  roomName?: string,
  batch?: 1 | 0,
  roomNum?: number,
  roomNamePrefix?: string
}

export default (data: format, tokenId: string, requestOptions: object): Promise => base(createApiOptions(BUSINESS_ADD_ROOM, data, tokenId))