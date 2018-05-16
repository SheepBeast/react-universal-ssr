// @flow


import base from './base'
import { BUSINESS_ADD_BUILDING } from '../method-types'
import createApiOptions from '../../utils/createApiOptions'

type format = {
  houseId: string,
  buildingName: string,
  provinceId?: number,
  cityId?: number,
  areaId?: number,
  area: string,
  batch?: 1 | 0,
  floorNum?: number,
  floorNamePrefix?: string,
  floorNameSuffix?: string,
  roomNum: number,
  roomNamePrefix: string,
  roomNameSuffix: string,
  picUrl: string,
  picRemark: string,
  contact: string
}

export default (data: format, tokenId: string): Promise => base(createApiOptions(BUSINESS_ADD_BUILDING, data, tokenId))