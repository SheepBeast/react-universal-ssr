// @flow

import base from './base'
import { BUSINESS_TENANT_RENEW_ROOM } from '../method-types'
import createApiOptions from '../../utils/createApiOptions'

type format = {
  roomId: string,
  beginDate: string,
  endDate: string
}

export default (data: format, tokenId: string): Promise => base(createApiOptions(BUSINESS_TENANT_RENEW_ROOM, data, tokenId))