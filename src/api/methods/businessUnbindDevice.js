// @flow

import base from './base'
import { BUSINESS_UNBIND_DEVICE } from '../method-types'
import createApiOptions from '../../utils/createApiOptions'

type format = {
  deviceId: string
}

export default (data: format, tokenId: string): Promise => base(createApiOptions(BUSINESS_UNBIND_DEVICE, data, tokenId))