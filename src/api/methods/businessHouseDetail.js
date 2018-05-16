// @flow


import base from './base'
import { BUSINESS_HOUSE_DETAIL } from '../method-types'
import createApiOptions from '../../utils/createApiOptions'

type format = {
  houseId: string
}

export default (data: format, tokenId: string): Promise => base(createApiOptions(BUSINESS_HOUSE_DETAIL, data, tokenId))