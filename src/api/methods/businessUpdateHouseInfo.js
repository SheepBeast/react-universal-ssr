// @flow

import base from './base'
import { BUSINESS_UPDATE_HOUSE_INFO } from '../method-types'
import createApiOptions from '../../utils/createApiOptions'

type format = {
  houseId: string,
  houseName?: string,
  houseType?: 1 | 2 | 3 | 4 | 5 | 6,
  logoUrl?: string,
  adUrl?: string,
  publicityUrl?: string,
  remark?: string
}

export default (data: format, tokenId: string): Promise => base(createApiOptions(BUSINESS_UPDATE_HOUSE_INFO, data, tokenId))