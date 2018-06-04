// @flow

import base from './base'
import { BUSINESS_TENANT_CHECK_OUT_ROOM } from '../../constants/method-types'
import createApiOptions from '../../utils/createApiOptions'

type format = {
  roomId: string
}

export default (data: format, tokenId: string, requestOptions: object): Promise => base(createApiOptions(BUSINESS_TENANT_CHECK_OUT_ROOM, data, tokenId))