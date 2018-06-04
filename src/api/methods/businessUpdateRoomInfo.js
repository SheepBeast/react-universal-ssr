// @flow

import base from './base'
import { BUSINESS_UPDATE_ROOM_INFO } from '../../constants/method-types'
import createApiOptions from '../../utils/createApiOptions'

type format = {
  roomId: string,
  roomName: string
}

export default (data: format, tokenId: string, requestOptions: object): Promise => base(createApiOptions(BUSINESS_UPDATE_ROOM_INFO, data, tokenId))