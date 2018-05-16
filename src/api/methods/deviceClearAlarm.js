// @flow

import base from './base'
import { DEVICE_CLEAR_ALARM } from '../method-types'
import createApiOptions from '../../utils/createApiOptions'

type format = {
  deviceType: 0 | 1 | 2 | 3 | 4 | 5,
  deviceId: string
}

export default (data: format, tokenId: string): Promise => base(createApiOptions(DEVICE_CLEAR_ALARM, data, tokenId))