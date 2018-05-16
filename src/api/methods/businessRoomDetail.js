// @flow

import base from './base'
import { BUSINESS_ROOM_DETAIL } from '../method-types'
import createApiOptions from '../../utils/createApiOptions'

type format = {
  roomId: string
}

export default (data: format, tokenId: string): Promise => base(createApiOptions(BUSINESS_ROOM_DETAIL, data, tokenId))