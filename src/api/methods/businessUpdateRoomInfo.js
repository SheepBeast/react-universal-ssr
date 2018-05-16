// @flow

import base from './base'
import { BUSINESS_UPDATE_ROOM_INFO } from '../method-types'
import createApiOptions from '../../utils/createApiOptions'

type format = {
  roomId: string,
  roomName: string
}

export default (data: format, tokenId: string): Promise => base(createApiOptions(BUSINESS_UPDATE_ROOM_INFO, data, tokenId))