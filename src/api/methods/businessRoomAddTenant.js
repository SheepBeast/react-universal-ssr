// @flow


import base from './base'
import { BUSINESS_ROOM_ADD_TENANT } from '../method-types'
import createApiOptions from '../../utils/createApiOptions'

type format = {
  roomId: string,
  tenantId: string,
  beginDate?: string,
  endDate?: string,
  remark?: string
}

export default (data: format, tokenId: string): Promise => base(createApiOptions(BUSINESS_ROOM_ADD_TENANT, data, tokenId))