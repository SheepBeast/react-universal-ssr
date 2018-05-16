// @flow

import base from './base'
import { BUSINESS_TENANT_CHANGE_ROOM } from '../method-types'
import createApiOptions from '../../utils/createApiOptions'

type format = {
  roomId: string,
  priorRoomId: string,
  tenantId: string
}

export default (data: format, tokenId: string): Promise => base(createApiOptions(BUSINESS_TENANT_CHANGE_ROOM, data, tokenId))