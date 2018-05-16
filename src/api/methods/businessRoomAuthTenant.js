// @flow


import base from './base'
import { BUSINESS_ROOM_AUTH_TENANT } from '../method-types'
import createApiOptions from '../../utils/createApiOptions'

type format = {
  roomId: string,
  tenantId: string,
  list: {
    [number]: {
      keyType: 1 | 2 | 4 | 32 | 128 | 129,
      password?: string
    }
  }
}

export default (data: format, tokenId: string): Promise => base(createApiOptions(BUSINESS_ROOM_AUTH_TENANT, data, tokenId))