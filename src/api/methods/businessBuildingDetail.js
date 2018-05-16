// @flow


import base from './base'
import { BUSINESS_BUILDING_DETAIL } from '../method-types'
import createApiOptions from '../../utils/createApiOptions'

type format = {
  buildingId: string
}

export default (data: format, tokenId: string): Promise => base(createApiOptions(BUSINESS_BUILDING_DETAIL, data, tokenId))