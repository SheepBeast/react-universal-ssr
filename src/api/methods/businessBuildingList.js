// @flow


import base from './base'
import { BUSINESS_BUILDING_LIST } from '../method-types'
import createApiOptions from '../../utils/createApiOptions'

type format = {
  houseId: string
}

export default (data: format, tokenId: string): Promise => base(createApiOptions(BUSINESS_BUILDING_LIST, data, tokenId))