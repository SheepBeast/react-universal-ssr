// @flow

import base from './base'
import { BUSINESS_ROOM_RELATION_LABEL } from '../method-types'
import createApiOptions from '../../utils/createApiOptions'

type format = {
  roomId: string,
  labels: {
    [number]: {
      labelId: string,
      type: 0 | 1
    }
  }
}

export default (data: format, tokenId: string): Promise => base(createApiOptions(BUSINESS_ROOM_RELATION_LABEL, data, tokenId))