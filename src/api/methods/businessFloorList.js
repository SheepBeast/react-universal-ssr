// @flow


import base from './base'
import { BUSINESS_FLOOR_LIST } from '../method-types'
import createApiOptions from '../../utils/createApiOptions'

type format = {
  buildingId: string
}

export default (data: format, tokenId: string): Promise => base(createApiOptions(BUSINESS_FLOOR_LIST, data, tokenId))