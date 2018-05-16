// @flow


import base from './base'
import { BUSINESS_FLOOR_DETAIL } from '../method-types'
import createApiOptions from '../../utils/createApiOptions'

type format = {
  floorId: string
}

export default (data: format, tokenId: string): Promise => base(createApiOptions(BUSINESS_FLOOR_DETAIL, data, tokenId))