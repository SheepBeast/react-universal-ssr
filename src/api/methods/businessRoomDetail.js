// @flow

import base from './base'
import { BUSINESS_ROOM_DETAIL } from '../../constants/method-types'
import createApiOptions from '../../utils/createApiOptions'

type format = {
  roomId: string
}

export default (data: format, tokenId: string, requestOptions: object): Promise => base(createApiOptions(BUSINESS_ROOM_DETAIL, data, tokenId))