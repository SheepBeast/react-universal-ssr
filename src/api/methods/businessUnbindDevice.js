// @flow

import base from './base'
import { BUSINESS_UNBIND_DEVICE } from '../../constants/method-types'
import createApiOptions from '../../utils/createApiOptions'

type format = {
  deviceId: string
}

export default (data: format, tokenId: string, requestOptions: object): Promise => base(createApiOptions(BUSINESS_UNBIND_DEVICE, data, tokenId))