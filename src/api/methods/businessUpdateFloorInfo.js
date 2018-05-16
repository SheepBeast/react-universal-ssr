// @flow

import base from './base'
import { BUSINESS_UPDATE_FLOOR_INFO } from '../method-types'
import createApiOptions from '../../utils/createApiOptions'

type format = {
  floorId: string,
  floorName: string
}

export default (data: format, tokenId: string): Promise => base(createApiOptions(BUSINESS_UPDATE_FLOOR_INFO, data, tokenId))