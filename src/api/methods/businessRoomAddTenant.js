// @flow


import base from './base'
import { BUSINESS_ROOM_ADD_TENANT } from '../../constants/method-types'
import createApiOptions from '../../utils/createApiOptions'

type format = {
  roomId: string,
  tenantId: string,
  beginDate?: string,
  endDate?: string,
  remark?: string
}

export default (data: format, tokenId: string, requestOptions: object): Promise => base(createApiOptions(BUSINESS_ROOM_ADD_TENANT, data, tokenId))