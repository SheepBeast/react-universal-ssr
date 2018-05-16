// @flow


import base from './base'
import { BUSINESS_ADD_FLOOR } from '../method-types'
import createApiOptions from '../../utils/createApiOptions'

type format = {
  buildingId: string,
  floorName?: string,
  batch?: 1 | 0,
  floorNum?: number,
  floorNamePrefix?: string,
  roomNum?: number,
  roomNamePrefix?: string
}

export default (data: format, tokenId: string): Promise => base(createApiOptions(BUSINESS_ADD_FLOOR, data, tokenId))